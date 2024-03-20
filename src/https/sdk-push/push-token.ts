import { IRequest, Host, Header, BodyMessage } from '../nx-request';

export default class NXToyTokenRequest implements IRequest {

    host!: Host;
    path!: string;
    header!: Header;
    body!: BodyMessage;
    method!: 'post' | 'get';
    npparams?: string;
    npsn: number = 0;

    constructor(uuid: string, uuid2: string, npsn: string | number, npToken: string, pushToken: string) {
        this.host = Host.SDK_PUSH_MP;
        this.path = '/sdk/push/token';
        this.method = 'post';
        this.header = {
            'channel_id': null,
            'Content-Type': 'application/json',
            'timeZone': 0,
            'x-toy-service-id': 1118,
            'gid': 1118,
            'guid': npsn,
            'gcid': null,
            'gsid': null,
            'world_id': null,
        };
        this.body = {
            svcID: '1118',
            ldid: uuid2,
            country: 'KR',
            loc: 'en_US',
            npToken: npToken,
            appId: 'com.nexon.handsplus',
            udid: uuid,
            pushToken: pushToken,
            platform: '1'
        };
    }
}