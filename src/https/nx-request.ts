import { NXCrypt, HttpsCryptType } from '../crypt/toy-crypt';
import { ByteUtils } from '../utils/byte-utils';
import axios from 'axios';
import * as iconv from 'iconv-lite';

const httpCrypt = NXCrypt.HttpsCrypt;

type NPParams = {
    sdkVer: unknown,
    os: unknown,
    svcID: unknown,
    npToken: unknown,
    appVersionNumber: unknown,
    appId: unknown,
    timeZone: unknown,
    adid: unknown,
    mnc: unknown,
    mcc: unknown,
    model: unknown,
    carrierName: unknown,
    mk: unknown
};

type NPParamsKey = keyof NPParams;

export type Header = {
    [key: string]: unknown,
    npparams?: string,
} & {
    [key: string]: any,
};

export type BodyMessage = {
    [key: string]: unknown,
    encrypted?: any
}

export enum Host {
    M_API = 'https://m-api.nexon.com',
    SDK_PUSH_MP = 'https://sdk-push.mp.nexon.com'
}

export interface IRequest {
    host: Host,
    path: string,
    header: Header,
    body: BodyMessage,
    method: 'post' | 'get',
}

export interface IResponse {
    [key: string]: unknown
}

export default class NXRequest {

    encryptBody<T extends IRequest>(nxRequest: T, encryptOptions: {
        encryptType: HttpsCryptType,
        key?: number
    }) {
        nxRequest.body.encrypted = httpCrypt.encrypt(
            ByteUtils.stringToByteArray(JSON.stringify(nxRequest.body)),
            encryptOptions.encryptType,
            encryptOptions.key ?? 0
        );
    }

    npparams<T extends IRequest>(nxRequest: T, encryptOptions: {
        encryptType: HttpsCryptType,
        key?: number
    }, options: {
        [key in NPParamsKey]?: unknown
    }) {
        const npparamsObj: NPParams = {
            sdkVer: options['sdkVer'] ?? '1.5.66.1',
            os: options['os'] ?? 'android',
            svcID: options['svcID'] ?? 1118,
            npToken: options['npToken'] ?? 0,
            appVersionNumber: options['appVersionNumber'] ?? 58,
            appId: options['appId'] ?? 'com.nexon.handsplus',
            timeZone: options['timeZone'] ?? '0',
            adid: options['adid'] ?? '',
            mnc: options['mnc'] ?? 0,
            mcc: options['mcc'] ?? 0,
            model: options['model'] ?? '',
            carrierName: options['carrierName'] ?? 'T-mobile',
            mk: options['mk'] ?? 'google'
        };

        nxRequest.header['npparams'] = ByteUtils.bytesToHexString(
            NXCrypt.HttpsCrypt.encrypt(
                iconv.encode(
                    JSON.stringify(npparamsObj), 
                    'utf-8'
                ),
                encryptOptions.encryptType,
                encryptOptions.key ?? 0
            )
        );
    }

    async request<K extends IRequest, V extends IResponse>(nxRequest: K, responseOptions?: {
        decryptType: HttpsCryptType,
        key?: number
    }): Promise<V> {
        const data = nxRequest.body.encrypted || JSON.stringify(nxRequest.body); 
        const response = await axios.create({
            baseURL: nxRequest.host,
            headers: nxRequest.header,
            responseType: 'arraybuffer'
        })[nxRequest.method](nxRequest.path, data);
        
        if(!response.data || response.data != '') {
            if(responseOptions != null) {
                return JSON.parse(
                    httpCrypt.decrypt(
                        response.data,
                        responseOptions.decryptType,
                        responseOptions.key ?? 0
                    ).toString()
                );
            }
            
            return JSON.parse(
                response.data
            );
        }

        return <V>{};
    }
}