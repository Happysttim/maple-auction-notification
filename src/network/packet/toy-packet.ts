import { ReadBuffer, WriteBuffer } from './packet-buffer';

export interface IRequest {
    readonly packetId: number;

    set?(data: { [key: string]: unknown }): void;
    encode(): WriteBuffer;
} 

export interface IResponse {
    readonly packetId: number;

    set?(data: { [key: string]: unknown}): void;
    decode(buffer: ReadBuffer): void;
}