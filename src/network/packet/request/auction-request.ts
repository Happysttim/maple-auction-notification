import { WriteBuffer } from "../packet-buffer";
import { IRequest } from "../toy-packet";

export default class AutionRequest implements IRequest {
    readonly packetId: number = 23;
    accountId!: number;
    lastSn!: number;

    set(data: {
        accountId: number, 
        lastSn: number
    }) {
        this.accountId = data.accountId;
        this.lastSn = data.lastSn;
    }

    encode(): WriteBuffer {
        const buffer: WriteBuffer = new WriteBuffer(this.packetId);

        buffer.encodeInt(this.accountId);
        buffer.encodeLong(this.lastSn);

        return buffer;
    }
}