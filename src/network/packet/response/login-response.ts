import { ReadBuffer } from "../packet-buffer";
import { IResponse } from "../toy-packet";

export default class LoginResponse implements IResponse {
    readonly packetId: number = 4;
    error!: boolean;
    dwAccountId?: number;
    session?: string;
    id?: string;

    set(data: {
        error: boolean,
        dwAccountId?: number,
        session?: string,
        id?: string
    }) {
        this.error = data.error;
        this.dwAccountId = data.dwAccountId;
        this.session = data.session;
        this.id = data.id;
    }

    decode(buffer: ReadBuffer): void {
        if(buffer.decodeByte() == 0) {
            buffer.decodeByte();
            this.set({
                error: false,
                dwAccountId: buffer.decodeInt(),
                session: buffer.decodeString(),
                id: buffer.decodeString()
            });
        } else {
            this.set({
                error: true
            });
        }
    }
}