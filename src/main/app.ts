import * as path from 'path';
import { app, BrowserWindow, Tray, ipcMain, Menu, nativeImage, IpcMainInvokeEvent, Notification, dialog, IpcMainEvent } from 'electron';
import electronIsDev from 'electron-is-dev';
import ToyClient from '../network/toy-client';
import fcm from '../fcm.json';
import { PushReceiver } from '@eneris/push-receiver';
import UuidLike from '../utils/uuid-like';
import NXToyTokenRequest from '../https/sdk-push/push-token';
import { SignInRequest, SignInResponse } from '../https/m-api/sign-in';
import ToyPushAck from '../https/sdk-push/push-ack';
import NXRequest from '../https/nx-request';
import { HttpsCryptType, NXCrypt } from '../crypt/toy-crypt';
import { ByteUtils } from '../utils/byte-utils';
import FcmMessage from '../notificate/fcm-message';
import LoginResponse from '../network/packet/response/login-response';
import LoginRequest from '../network/packet/request/login-request';
import { LogoutSVCRequest, LogoutSVCResponse } from '../https/m-api/logout-svc';

import AuctionRequest from '../network/packet/request/auction-request';
import AuctionResponse, { Record as AuctionRecord } from '../network/packet/response/auction-response';

const BASE_URL = 'http://localhost:5173';

type NXCredential = {
    npsn: number,
    npToken: string,
    dwAccountId: number
};

export default class ElectronApp {

    private mainWindow?: BrowserWindow;
    private loginWindow!: BrowserWindow;
    private tray?: Tray;
    private contextMenu!: Menu;
    private toyClient!: ToyClient;
    private nxrequest!: NXRequest;
    private pushReceiver!: PushReceiver;

    private pushToken!: string;
    private uuid!: string;
    private uuid2!: string;
    private appsetId!: string;
    private nxCredential?: NXCredential;

    private windowOption: Electron.BrowserWindowConstructorOptions = {
        resizable: false,
        maximizable: false,
        focusable: true,
        titleBarStyle: 'hidden',
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, './preload.js')
        }
    };

    constructor() {
        this.uuid = UuidLike.createUUID();
        this.uuid2 = UuidLike.createUUID2();
        this.appsetId = UuidLike.createUUID();
        this.toyClient = new ToyClient();
        this.nxrequest = new NXRequest();
        this.pushReceiver = new PushReceiver({
            senderId: fcm.messagingSenderId
        });
    }

    async initNotifcate() {

        this.pushReceiver.onCredentialsChanged(({ newCredentials }) => {
            this.pushToken = newCredentials.fcm.token;
        });

        await this.pushReceiver.connect();
    }

    initMainWindow() {
        
        this.mainWindow = new BrowserWindow(
            {
                width: 900,
                height: 770,
                ...this.windowOption,
                titleBarOverlay: {
                    color: 'white',
                    symbolColor: 'black',
                    height: 30
                }
            }
        );

        if(electronIsDev) {
            this.mainWindow.loadURL(BASE_URL + '/main.html');
        } else {
            this.mainWindow.loadFile(path.join(__dirname, '../dist/main.html'));
        }

        this.mainWindow.show();
        this.mainWindow.webContents.openDevTools();
    }

    initLoginWindow() {
        this.loginWindow = new BrowserWindow(
            {
                width: 500,
                height: 350,
                ...this.windowOption,
                titleBarOverlay: {
                    color: 'black',
                    symbolColor: 'white',
                    height: 30
                }
            }
        );

        if(electronIsDev) {
            this.loginWindow.loadURL(BASE_URL + "/login.html");
        } else {
            this.loginWindow.loadFile(path.join(__dirname, '../dist/login.html'));
        }

        this.loginWindow.show();
        this.loginWindow.webContents.openDevTools();
    }

    initHook() {

        this.pushReceiver.onNotification(notificate => {
            if(this.nxCredential) { 
                const data = <FcmMessage> notificate.message.data;
                const toyPushAck: ToyPushAck = new ToyPushAck(this.uuid2, this.nxCredential.npsn, data.pushId, notificate.persistentId);
                
                if(Notification.isSupported()) {
                    const notificate = new Notification({
                        title: "경매장 알림",
                        body: data.body
                    });
        
                    notificate.on('click', () => {
                        this.mainWindow?.show();
                    });
        
                    notificate.show();
                }

                this.nxrequest.request(toyPushAck);
            }

        });

        app.on('window-all-closed', () => {
            if(this.toyClient.isConnect) {
                this.toyClient.end();
            }
        });

        ipcMain.on('SHOW_ERROR', (_, [ title, content ]) => {
            dialog.showErrorBox(title, content);
        });
        
        ipcMain.handle('LOGIN', async (_: IpcMainInvokeEvent, [loginType, id, password]): Promise<boolean> => {
            if(id.trim() == "" || password.trim() == "")
                return false;

            if(!this.toyClient.isConnect) {
                this.toyClient.connect();
            }

            const loginRequest: LoginRequest = new LoginRequest();
            loginRequest.set({
                id: id,
                password: password,
                adid: this.uuid
            });

            const loginResponse: LoginResponse = await this.toyClient.request(loginRequest, LoginResponse);

            if(!loginResponse.error) {
                const signInRequest = new SignInRequest(
                    this.appsetId, 
                    this.uuid, 
                    this.uuid2, 
                    loginResponse.dwAccountId!,
                    NXCrypt.HttpsCrypt.encodeHmacSha256ToHexString(
                        "NexonUser", ByteUtils.stringToByteArray(password)
                    )
                );

                this.nxrequest.npparams(signInRequest, {
                    encryptType: HttpsCryptType.COMMON
                }, {
                    adid: this.uuid
                });

                this.nxrequest.encryptBody(signInRequest, {
                    encryptType: HttpsCryptType.COMMON
                });

                const signInResponse: SignInResponse = await this.nxrequest.request(signInRequest, {
                    decryptType: HttpsCryptType.COMMON
                });

                if(signInResponse.errorCode == 0) {
                    this.nxCredential = {
                        npsn: signInResponse.result?.npSN!,
                        npToken: signInResponse.result?.npToken!,
                        dwAccountId: loginResponse.dwAccountId!
                    };

                    const tokenRequest = new NXToyTokenRequest(
                        this.uuid,
                        this.uuid2,
                        signInResponse.result!.npSN,
                        signInResponse.result!.npToken,
                        this.pushToken
                    );
                    
                    await this.nxrequest.request(tokenRequest);

                    this.initMainWindow();
                    this.loginWindow.destroy();
                }

                return true;
            }

            return false;
        });

        ipcMain.handle('AUCTION_HISTORY', async (_, [ lastSn ]): Promise<AuctionRecord[]> => {
            if(this.nxCredential) {
                const auctionRequest: AuctionRequest = new AuctionRequest();
                auctionRequest.set({
                    accountId: this.nxCredential.dwAccountId,
                    lastSn: lastSn
                });

                const auctionResponse: AuctionResponse = await this.toyClient.request(auctionRequest, AuctionResponse);

                if(auctionResponse.records.length == 0) {
                    return [];
                }
                return auctionResponse.records;
            } else {
                return [];
            }
        });

        ipcMain.handle('LOGOUT', async (): Promise<boolean> => {
            if(this.nxCredential) {
                const logoutRequest: LogoutSVCRequest = new LogoutSVCRequest(
                    this.appsetId,
                    this.uuid,
                    this.uuid2,
                    this.nxCredential.npsn
                );

                this.nxrequest.npparams(logoutRequest, {
                    encryptType: HttpsCryptType.NPSN,
                    key: this.nxCredential.npsn
                }, {
                    adid: this.uuid,
                    npToken: this.nxCredential.npToken
                });

                const logoutResponse: LogoutSVCResponse = await this.nxrequest.request(
                    logoutRequest,
                    {
                        decryptType: HttpsCryptType.NPSN,
                        key: this.nxCredential.npsn
                    }
                );

                if(logoutResponse.errorCode == 0) {
                    this.toyClient.end();
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        });
    }

    initTray() {
        this.tray = new Tray(nativeImage.createEmpty());
        this.contextMenu = Menu.buildFromTemplate([
            {label: '알람', type: 'radio'},
            {label: '프로그램 열기', type: 'normal', click: () => {
                // TODO
            }}
        ]);
        this.tray.setContextMenu(this.contextMenu);
    }
};