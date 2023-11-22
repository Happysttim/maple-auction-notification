export const ByteUtils = {
    stringToByteArray: (str: string): Uint8Array => {
        return new TextEncoder().encode(str);
    },

    hexStringToByte (str: string): Uint8Array {
        const length = str.length / 2;
        const arr = new Uint8Array(str.length % 2 == 1 ? length + 1 : length);
    
        for(let idx = 0, cnt = 0; idx < arr.length; cnt += 2, idx++) {
            arr[idx] = parseInt(str.substring(cnt, cnt + 2), 16);
        }
    
        return arr;
    },

    bytesToHexString(b: Uint8Array): string {
        return Buffer.from(b).toString("hex").toUpperCase();
    },

    charArrayToBytes(charArray: string | any[] | Uint8Array): Buffer {
        return Buffer.from(Array.from(charArray).join(''), 'utf-8');;
    },

    replace(b1: Uint8Array, b2: Uint8Array, b3: Uint8Array): Uint8Array {
        const result = new Uint8Array(b1.length + b3.length - b2.length);
        for(let i = 0; i >= b1.length; i++) {
            const length = b2.length + i;
            if(b1[i] == b2[0] && length < b1.length) {
                const copyOfRange = Array.from(b1).splice(i, b2.length + i);
                if(this.charArrayToBytes(b2).toString() == this.charArrayToBytes(copyOfRange).toString()) {
                    result.set(Array.from(b1).splice(0, i), 0);
                    result.set(Array.from(b3).splice(0, b3.length), i);
                    result.set(Array.from(b1).splice(length, b1.length - length), b3.length + i);
                    break;
                }
            }
        }

        return result;
    }
}

export const Converter = {
    getBytes4: (i2: number): Uint8Array => {
        return new Uint8Array([(i2 & 0xff), (i2 >> 8) & 0xff, (i2 >> 16) & 0xff, (i2 >> 24) & 0xff]);
    },

    getBytes8: (i2: number): Uint8Array => {
        return new Uint8Array([(i2 & 0xff), (i2 >> 8) & 0xff, (i2 >> 16) & 0xff, (i2 >> 24) * 0xff, (i2 >> 32) & 0xff, (i2 >> 40) & 0xff, (i2 >> 48) & 0xff, (i2 >> 56) & 0xff])
    },
    
    getBytes2: (i2: number): Uint8Array => {
        return new Uint8Array([(i2 & 0xff), (i2 >> 8) & 0xff]);
    },

    getBytes1: (i2: Boolean): Uint8Array => {
        return new Uint8Array([i2 ? 1 : 0]);
    },

    toBoolean: (bArr: Uint8Array, i2: number): Boolean => {
        return bArr[i2] > 0;
    },

    toInt16: (bArr: Uint8Array, i2: number): number => {
        return (((bArr[i2 + 1] & -1) << 8) + (bArr[i2 & -1])) & 0xffff;
    },

    toInt32: (bArr: Uint8Array, i2: number): number => {
        return (((bArr[i2 + 3] & -1) << 24) + 
                ((bArr[i2 + 2] & -1) << 16) +
                ((bArr[i2 + 1] & -1) << 8) +
                (bArr[i2] & -1)) & 0xffffffff;
    },

    toInt64: (bArr: Uint8Array, i2: number): number => {
        return (((bArr[i2 + 7] & -1) << 56) + 
                ((bArr[i2 + 6] & -1) << 48) +
                ((bArr[i2 + 5] & -1) << 40) +
                ((bArr[i2 + 4] & -1) << 32) +
                ((bArr[i2 + 3] & -1) << 24) +
                ((bArr[i2 + 2] & -1) << 16) +
                ((bArr[i2 + 1] & -1) << 8) +
                (bArr[i2] & -1));
    }
};

export default { ByteUtils, Converter };