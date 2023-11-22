import { MessageCustomData } from "@eneris/push-receiver/dist/types";

export default interface FcmMessage extends MessageCustomData {
    extension?: {
        contentType?: string,
        sound?: string,
        default?: string,
        udid?: string,
        token?: string,
        svcId?: string | number,
        npsn?: string | number,
        utc?: string,
        platform?: string,
        countryCode?: string,
        ackUrl?: string,
        timestamp?: string,
        noticeType?: string
    },
    pushId: string,
    console: string,
    senderNPSN: string,
    body: string,
    meta: string,
    foreground: string,
};