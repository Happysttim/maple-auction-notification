import { WriteBuffer } from '../packet-buffer';
import { IRequest } from '../toy-packet';

export default class PingRequest implements IRequest {
    readonly packetId: number = 5;
    loginToken!: string;
    adid!: string;

    set(data: {
        loginToken: string, 
        adid: string
    }) {
        this.loginToken = data.loginToken;
        this.adid = data.adid;
    }

    encode(): WriteBuffer {
        const buffer: WriteBuffer = new WriteBuffer(this.packetId);

        buffer.encodeShort(15);
        buffer.encodeByte(0);
        buffer.encodeByte(0);
        buffer.encodeString('');
        buffer.encodeString(this.loginToken);
        buffer.encodeLong(0);
        buffer.encodeString(this.adid);
        buffer.encodeString('13');

        return buffer;
    }
}