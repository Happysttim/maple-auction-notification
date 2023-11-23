import { IResponse, IRequest, Host, Header, BodyMessage } from '../nx-request';

export interface SignInResponse extends IResponse {
    errorCode: number;
    result?: {
        npSN: number,
        guid: string,
        umKey: string,
        memType: number,
        isSwap: boolean,
        termsAgree: Array<Object>,
        npToken: string,
        npaCode: string,
    },
    errorText: string,
    errorDetail: string
}

export class SignInRequest implements IRequest {

    host!: Host;
    path!: string;
    header!: Header;
    body!: BodyMessage;
    method!: 'post' | 'get';
    npparams?: string;
    npsn: number = 0;

    constructor(appsetId: string, uuid: string, uuid2: string, accountId: number, passwd: string) {
        this.host = Host.M_API;
        this.path = '/sdk/signIn.nx';
        this.method = 'post';
        this.header = {
            "acceptCountry": "KR",
            "acceptLanguage": "en_US",
            "appset-id": appsetId,
            "appset-scope": 1,
            "charset": "utf-8",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "deviceCountry": "US",
            "timeZone": "0",
            "x-toy-service-id": 1118,
            "initialCountry": "KR",
            "gid": 1118,
            "guid": null,
            "channel_id": null,
            "gcid": null,
            "gaid": "0",
            "uuid": uuid,
            "uuid2": uuid2,
            "gsid": null,
            "world_id": null,
            "npsn": 0
        };
        
        this.body = {
            userID: accountId,
            passwd: passwd,
            uuid: uuid,
            uuid2: uuid2,
            memType: 7,
            termsApiVer: 2,
            optional: {
                email: null,
                device: "sdk_gphone64_x86_64",
                name: "",
                carrierName: "T-mobile",
                fbBizToken: null,
                refreshToken: null,
                encryptedMemberSN: null,
                toySecurityToken: null,
                memberSN: null
            }
        }
    }
}