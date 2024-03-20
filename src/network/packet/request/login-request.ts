import { WriteBuffer } from '../packet-buffer';
import { IRequest } from '../toy-packet';

export default class LoginRequest implements IRequest {
    readonly packetId: number = 4;
    id!: string;
    password!: string;
    adid!: string;

    set(data: {
        id: string,
        password: string,
        adid: string
    }) {
        this.id = data.id;
        this.password = data.password;
        this.adid = data.adid;
    }

    encode(): WriteBuffer {
        const buffer: WriteBuffer = new WriteBuffer(this.packetId);

        buffer.encodeShort(15);
        buffer.encodeByte(0);
        buffer.encodeByte(0);
        buffer.encodeString(this.id);
        buffer.encodeString(this.password);
        buffer.encodeString('');
        buffer.encodeString(this.adid);
        buffer.encodeString('13');

        return buffer;
    }
}