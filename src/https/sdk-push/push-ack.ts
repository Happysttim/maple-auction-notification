import { IRequest, Host, Header, BodyMessage, IResponse } from '../nx-request';

export default class NXToyPushAck implements IRequest {

    host!: Host;
    path!: string;
    header!: Header;
    body!: BodyMessage;
    method!: 'post' | 'get';
    npparams?: string;
    npsn: number = 0;

    constructor(uuid2: string, npsn: string | number, pushId: string | number, messageId: string) {
        this.host = Host.SDK_PUSH_MP;
        this.path = '/sdk/push/ack';
        this.method = 'post';
        this.header = {
            "channel_id": null,
            "Content-Type": "application/json",
            "timeZone": 0,
            "x-toy-service-id": 1118,
            "gid": 1118,
            "guid": npsn,
            "gcid": null,
            "gsid": null,
            "world_id": null,
        };
        this.body = {
            svcID: "1118",
            pushId: pushId,
            console: "0",
            utc: 0,
            countryCode: 8,
            messageId: messageId,
            abGroup: 0,
            udid: uuid2,
            npsn: npsn,
            platform: "1"
        }
    }
}