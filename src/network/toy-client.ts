import { NXCrypt } from "../crypt/toy-crypt";
import { ReadBuffer , WriteBuffer } from "./packet/packet-buffer";
import { IRequest, IResponse } from "./packet/toy-packet"
import * as net from 'node:net';

const serverOpts: net.NetConnectOpts = {
    port: 8605,
    host: '175.207.0.45'
};

export default class ToyClient {

    private socket!: net.Socket;

    isConnect: boolean = false;

    async request<K extends IRequest, V extends IResponse>(requestPacket: K, responseClass: { new(): V }): Promise<V> {
        const requestData: WriteBuffer = requestPacket.encode();
        const responsePacket = new responseClass();
        
        if(!this.socket.write(requestData.final())) {
            throw new Error(requestPacket.packetId + " packet error");
        } 

        return new Promise<V>((resolve, reject) => {
            let origin: Uint8Array;
            let size: number, packetLength: number = 0;

            this.socket.on('data', (data: Uint8Array) => {
                if(data[2] == 0x00 && data[3] == 0x00) {
                    size = (data[0] | data[1] << 8) & 0xffff;
                    origin = new Uint8Array(size + 4);
                }
    
                origin.set(data, packetLength);
                packetLength += data.length;

                if(packetLength >= size + 4) {
                    const responseData = new ReadBuffer(
                        NXCrypt.AppCrypto.ASEDecrypt(
                            new Uint8Array(origin.subarray(4, origin.length))
                        )
                    );
        
                    responsePacket.decode(responseData);
                    origin = new Uint8Array();
                    size = 0; packetLength = 0;
                    this.socket.removeAllListeners("data");
                    resolve(responsePacket);
                }
            });
        });
    }

    connect() {
        if(this.socket == null) {
            this.socket = net.connect(serverOpts);
        }
        this.isConnect = true;
    }

    end() {
        if(this.socket != null && !this.socket.closed)
            this.socket.end();
        this.isConnect = false;
    }
}