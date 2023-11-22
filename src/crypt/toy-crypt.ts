import * as crypto from 'node:crypto';
import { ByteUtils as utils } from '../utils/byte-utils';

interface INXToyCrypt {
    crypt: Uint8Array;
}

export enum HttpsCryptType {
    NONE = 0,
    COMMON = 1,
    NPSN = 2,
    NXCOMSIGNUP = 3,
    NXNJ = 4
}

export enum CryptType {
    ENCRYPT,
    DECRYPT
}

export namespace NXCrypt {
    
    const cryptoTypes = new Int8Array(4);
    
    cryptoTypes[HttpsCryptType.NONE] = 1;
    cryptoTypes[HttpsCryptType.NPSN] = 2;
    cryptoTypes[HttpsCryptType.COMMON] = 3;
    cryptoTypes[HttpsCryptType.NXCOMSIGNUP] = 4;

    const COMMON_AES_KEY = new Uint8Array([0xdd, 0x47, 0x63, 0x54, 0x1b, 0xe1, 0x00, 0x91, 0x0b, 0x56, 0x8c, 0xa6, 0xd4, 0x82, 0x68, 0xe3]);
    const NXCOM_SIGNUP_AES_KEY = new Uint8Array([0x36, 0x97, 0x4d, 0x58, 0xea, 0xb5, 0x9d, 0x8b]);

    const APP_CRYPT_KEY = new Int8Array([-65, 20, -42, 126, 45, -36, -114, 102, -125, -17, 87, 73, 97, -1, 105, -113, 97, -51, -47, 30, -99, -100, 22, 114, 114, -26, 29, -16, -124, 79, 74, 119]);
    const APP_CRYPT_IV = new Int8Array([-58, 80, 83, -14, -88, 66, -99, 127, 119, 9, 29, 38, 66, 83, -120, 124]);

    const cipherWithAES128 = (key: string | Uint8Array, bArr: Uint8Array, i: CryptType): Buffer => {
        if(typeof key == 'string') {
            key = Uint8Array.from(Array.from(key).map(v => v.charCodeAt(0))) as Uint8Array
        }

        const newBytes = new Int8Array(16);
        newBytes.set(key.subarray(0, 16));
    
        const cipher = crypto[i == CryptType.ENCRYPT ? "createCipheriv" : "createDecipheriv"]("aes-128-ecb", newBytes, null);
        return Buffer.concat([cipher.update(bArr), cipher.final()]);
    }
    
    const cipherWithAES256 = (bArr: Uint8Array, bArr2: Uint8Array, bArr3: Uint8Array, i: CryptType, str: 'aes-256-cbc' | null): Buffer => {
        const newBytes = new Int8Array(32);
        newBytes.set(bArr.subarray(0, 32));
    
        const cipher = crypto[i == CryptType.ENCRYPT ? "createCipheriv" : "createDecipheriv"]("aes-256-cbc", newBytes, (bArr3 != null && str != null) ? bArr3 : null);
    
        return Buffer.concat([cipher.update(bArr2), cipher.final()]);
    }
    
    const makeNPSNAES128Key = (i: number): Uint8Array => {
        return HttpsCrypt.encryptWithAES128(i.toLocaleString('en-US', {
            minimumIntegerDigits: 19,
            useGrouping: false
        }).substring(3), utils.stringToByteArray(i.toLocaleString('en-US', {
            minimumIntegerDigits: 19,
            useGrouping: false
        }).substring(4)));
    }
    
    const encodeHmacSha256 = (str: string, b: Uint8Array): Uint8Array => {
        return crypto.createHmac("sha256", Buffer.from(str, "utf-8")).update(b).digest();
    }

    export const AppCrypto = {
        
        ASEDecrypt: (bArr: Uint8Array): Uint8Array => {
            const decipher = crypto.createDecipheriv("aes-256-cbc", APP_CRYPT_KEY, APP_CRYPT_IV);
    
            return Buffer.concat([decipher.update(bArr), decipher.final()]);
        },
    
        AESEncrypt: (bArr: Uint8Array): Buffer => {
            const encrypter = crypto.createCipheriv("aes-256-cbc", APP_CRYPT_KEY, APP_CRYPT_IV);
    
            return Buffer.concat([encrypter.update(bArr), encrypter.final()]);
        }
    }
    
    export const HttpsCrypt = {

        decrypt: (bArr: Uint8Array, cryptoType: HttpsCryptType, i: number): Uint8Array => {
            
            const cType = cryptoTypes[cryptoType];
            const nxToyDecrypt: INXToyCrypt = {
                crypt: new Uint8Array(0)
            };

            switch(cryptoTypes[cryptoType]) {
                case 1:
                    nxToyDecrypt.crypt = bArr;
                break;
                case 2:
                    nxToyDecrypt.crypt = HttpsCrypt.decryptWithAES128(makeNPSNAES128Key(i), bArr);
                break;
                case 3:
                    nxToyDecrypt.crypt = HttpsCrypt.decryptWithAES128(COMMON_AES_KEY, bArr);
                break;
                case 4:
                    nxToyDecrypt.crypt = HttpsCrypt.decryptWithAES128(NXCOM_SIGNUP_AES_KEY, bArr);
                break;
            }
    
            return nxToyDecrypt.crypt;
        },
    
        encrypt(b: Uint8Array, cryptoType: HttpsCryptType, i: number): Uint8Array {
            const nxToyEncrypt: INXToyCrypt = {
                crypt: new Uint8Array(0)
            };
            switch(cryptoTypes[cryptoType]) {
                case 1:
                    nxToyEncrypt.crypt = b;
                break;
                case 2:
                    const key = makeNPSNAES128Key(i);
                    nxToyEncrypt.crypt = HttpsCrypt.encryptWithAES128(key, b);
                break;
                case 3:
                    nxToyEncrypt.crypt = HttpsCrypt.encryptWithAES128(COMMON_AES_KEY, b);
                break;
            }
    
            return nxToyEncrypt.crypt;
        },
     
        decryptWithAES128: (t: Uint8Array, bArr: Uint8Array): Buffer => {
            return cipherWithAES128(t, bArr, CryptType.DECRYPT);
        },
    
        encryptWithAES128: (t: string | Uint8Array, bArr: Uint8Array): Buffer => {
            return cipherWithAES128(t, bArr, CryptType.ENCRYPT);
        },
    
        decryptWithAES256: (bArr: Uint8Array, bArr2: Uint8Array, bArr3: Uint8Array, str: 'aes-256-cbc' | null): Buffer => {
            return cipherWithAES256(bArr, bArr2, bArr3, CryptType.DECRYPT, str);
        },
    
        encryptWithAES256: (bArr: Uint8Array, bArr2: Uint8Array, bArr3: Uint8Array, str: 'aes-256-cbc' | null): Buffer => {
            return cipherWithAES256(bArr, bArr2, bArr3, CryptType.ENCRYPT, str);
        },
    
        encodeHmacSha256ToHexString: (str: string, b: Uint8Array): string => {
            return utils.bytesToHexString(encodeHmacSha256(str, b));
        },
    
        sha256HexString: (str: string): string => {
            return crypto.createHash('sha256').update(str).digest("hex");
        },
    
        sha512: (b: Uint8Array): string => {
            return crypto.createHash('sha512').update(b).digest('binary');
        }
    }
}