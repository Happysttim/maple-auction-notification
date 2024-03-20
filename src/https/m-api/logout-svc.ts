import { IResponse, IRequest, Host, Header, BodyMessage } from '../nx-request';

export interface LogoutSVCResponse extends IResponse {
    errorCode: number,
    result: object,
    errorText: string,
    errorDetail: string
}

export class LogoutSVCRequest implements IRequest {

    host!: Host;
    path!: string;
    header!: Header;
    body!: BodyMessage;
    method!: 'post' | 'get';
    npparams?: string;
    npsn: number = 0;

    constructor(appsetId: string, uuid: string, uuid2: string, npsn: number) {
        this.host = Host.M_API;
        this.path = '/sdk/logoutSVC.nx';
        this.method = 'post';
        this.header = {
            'acceptCountry': 'KR',
            'acceptLanguage': 'en_US',
            'appset-id': appsetId,
            'appset-scope': 1,
            'charset': 'utf-8',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'deviceCountry': 'US',
            'timeZone': '0',
            'x-toy-service-id': 1118,
            'initialCountry': 'KR',
            'gid': 1118,
            'guid': npsn,
            'channel_id': null,
            'gcid': null,
            'gaid': '0',
            'uuid': uuid,
            'uuid2': uuid2,
            'gsid': null,
            'world_id': null,
            'npsn': npsn
        };
        
        this.body = {};
    }
}