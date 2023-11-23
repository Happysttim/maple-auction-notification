import { ReadBuffer } from "../packet-buffer";
import { IResponse } from "../toy-packet";

export type Record = {
    nSN: number;
    message: string;
    date: string;
    characterName: string;
    worldId: number;
    characterId: number;
    pushType: number;
    itemName: string;
    itemId: number;
    count: number;
    price: number;
}

export default class AuctionResponse implements IResponse {
    readonly packetId: number = 22;
    records: Array<Record> = [];

    decode(buffer: ReadBuffer): void {
        if(buffer.decodeByte() == 0) {
            const auctionCount = buffer.decodeInt();
            this.records = new Array<Record>;

            while(this.records.length < auctionCount) {
                this.records.push({
                    nSN: buffer.decodeLong(),
                    message: buffer.decodeString(),
                    date: buffer.decodeString(),
                    characterName: buffer.decodeString(),
                    worldId: buffer.decodeByte(),
                    characterId: buffer.decodeInt(),
                    pushType: buffer.decodeByte(),
                    itemName: buffer.decodeString(),
                    itemId: buffer.decodeInt(),
                    count: buffer.decodeInt(),
                    price: buffer.decodeLong()
                });
            }
        }
    }
}