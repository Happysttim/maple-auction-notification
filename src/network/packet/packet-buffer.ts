import { Converter } from '../../utils/byte-utils';
import { NXCrypt } from '../../crypt/toy-crypt';
import * as iconv from 'iconv-lite';

export class ReadBuffer {

    public buffer!: Uint8Array;
    public packetId!: number;
    public readPos!: number;

    private toShort(b1: number, b2: number): number {
        return (b1 | (b2 << 8)) & 0xffff;
    }

    private toDword(b1: number, b2: number, b3: number, b4: number): number {
        return (b1 | (b2 << 8) | (b3 << 16) | (b4 << 24)) & 0xffffffff;
    }

    constructor(bArr: Uint8Array) {
        this.buffer = bArr;
        this.packetId = this.toShort(bArr[0], bArr[1]);
        this.readPos = 2;
    }

    public decodeByte(): number {
        this.readPos += 1;
        return this.buffer[this.readPos - 1];
    }

    public decodeShort(): number {
        this.readPos += 2;
        return Converter.toInt16(this.buffer, this.readPos - 2);
    }

    public decodeInt(): number {
        this.readPos += 4;
        return Converter.toInt32(this.buffer, this.readPos - 4);
    }    

    public decodeLong(): number {
        this.readPos += 8;
        return Converter.toInt64(this.buffer, this.readPos - 8);
    }

    public decodeBool(): boolean {
        return this.decodeByte() == 1;
    }

    public decodeBuffer(bArr: Uint8Array, i2: number) {
        this.readPos += i2;
    }

    public decodeString(): string {
        let int16 = Converter.toInt16(this.buffer, this.readPos);
        const i2 = this.readPos + 1;

        int16 += int16 < 0 ? 65536 : 0;
        this.readPos += int16 + 2;
        if(int16 > 0) {
            const bArr = new Uint8Array(int16);
            bArr.set(this.buffer.subarray(i2 + 1, int16 + (i2 + 1)));

            return new TextDecoder('euc-kr').decode(bArr);
        }

        return '';
    }

    public readSubID(): number {
        if(this.buffer.length < 2) {
            return 0;
        }
        this.readPos = 2;
        return this.buffer[1];
    }
}

export class WriteBuffer {

    public buffer!: Array<number>;
    public packetId!: number;
    public length: number = 0;
    
    constructor(packetId: number) {
        this.packetId = packetId;
        this.buffer = new Array<number>();

        this.encodeShort(packetId);
    }

    public clear() {
        this.buffer = new Array<number>();
        this.length = 0;

        this.encodeShort(this.packetId);
    }

    public encodeByte(value: number) {
        this.buffer[this.length++] = value;
    }

    public encodeShort(value: number) {
        this.encodeByteArray(Converter.getBytes2(value));
    }

    public encodeInt(value: number) {
        this.encodeByteArray(Converter.getBytes4(value));
    }

    public encodeLong(value: number) {
        this.encodeByteArray(Converter.getBytes8(value));
    }

    public encodeByteArray(bArr: Uint8Array) {
        bArr.forEach(v => {
            this.encodeByte(v);
        });
    }

    public encodeIntArray(iArr: Uint32Array) {
        iArr.forEach(v => {
            this.encodeInt(v);
        });
    }

    public encodeString(str: string) {
        const data = iconv.encode(str, 'euc-kr');
        this.encodeShort(data.length);
        this.encodeByteArray(data);
    }

    public final(): Uint8Array {
        const buffer = NXCrypt.AppCrypto.AESEncrypt(new Uint8Array(this.buffer));
        const byteLength = Converter.getBytes4(buffer.length);

        const result = new Uint8Array(buffer.length + 4);

        result[0] = byteLength[0];
        result[1] = byteLength[1];
        result[2] = byteLength[2];
        result[3] = byteLength[3];

        buffer.forEach((v, i) => {
            result[i + 4] = v;
        });

        return result;
    }
}

export default { ReadBuffer, WriteBuffer };