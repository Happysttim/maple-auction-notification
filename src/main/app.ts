import * as path from 'path';
import { app, BrowserWindow, Tray, ipcMain, Menu, nativeImage, IpcMainInvokeEvent, Notification, Data } from 'electron';
import electronIsDev, * as isDev from 'electron-is-dev';
import ToyClient from '../network/toy-client';
import fcm from '../fcm.json';
import { PushReceiver } from '@eneris/push-receiver';
import UuidLike from '../utils/uuid-like';
import { NXToyTokenRequest, NXToyTokenResponse } from '../https/sdk-push/nx-toy-request';
import { SignInRequest, SignInResponse } from '../https/m-api/m-api-request';
import NXRequest from '../https/nx-request';
import { HttpsCryptType, NXCrypt } from '../crypt/toy-crypt';
import { ByteUtils } from '../utils/byte-utils';
import FcmMessage from '../notificate/fcm-message';
import LoginResponse from 'src/network/packet/response/login-response';
import LoginRequest from 'src/network/packet/request/login-request';

const BASE_URL = 'http://localhost:5173';

export default class ElectronApp {

    private mainWindow?: BrowserWindow;
    private tray?: Tray;
    private loginWindow!: BrowserWindow;
    private contextMenu!: Menu;
    private toyClient!: ToyClient;
    private nxrequest!: NXRequest;
    private pushReceiver!: PushReceiver;

    private pushToken!: string;
    private uuid!: string;
    private uuid2!: string;
    private appsetId!: string;

    private windowOption = {
        resizable: false,
        minimizable: false,
        maximizable: false,
        focusable: true,
        skipTaskbar: true,
        titleBarOverlay: {
            color: '#2f3241',
            symbolColor: '#74b1be',
            height: 60
        },
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

        this.pushReceiver.onCredentialsChanged(({oldCredentials, newCredentials}) => {
            this.pushToken = newCredentials.fcm.token;
        });

        await this.pushReceiver.connect();
    }

    initMainWindow() {
        
        this.mainWindow = new BrowserWindow(
            {
                width: 1000,
                height: 800,
                ...this.windowOption
            }
        );

        if(electronIsDev) {
            this.mainWindow.loadURL(BASE_URL + '/main.html');
        } else {
            this.mainWindow.loadFile(path.join(__dirname, '../dist/main.html'));
        }

        this.mainWindow.show();
    }

    initLoginWindow() {
        this.loginWindow = new BrowserWindow(
            {
                width: 400,
                height: 700,
                ...this.windowOption
            }
        );

        if(electronIsDev) {
            this.loginWindow.loadURL(BASE_URL + "/login.html");
        } else {
            this.loginWindow.loadFile(path.join(__dirname, '../dist/login.html'));
        }

        this.loginWindow.show();
    }

    initHook() {

        this.pushReceiver.onNotification(notificate => {
            const data = <FcmMessage> notificate.message.data;
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
        });

        app.on('window-all-closed', () => {
            if(this.toyClient.isConnect) {
                this.toyClient.end();
            }
        });
        
        ipcMain.handle('LOGIN', async (_: IpcMainInvokeEvent, [_id, _password]) => {
            this.toyClient.connect();

            const loginRequest: LoginRequest = new LoginRequest();
            loginRequest.set({
                id: _id,
                password: _password,
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
                        "NexonUser", ByteUtils.stringToByteArray(_password)
                    )
                );

                this.nxrequest.npparams(signInRequest, HttpsCryptType.COMMON, {
                    adid: this.uuid
                });

                this.nxrequest.encryptBody(signInRequest, {
                    encryptType: HttpsCryptType.COMMON
                });

                const signInResponse: SignInResponse = await this.nxrequest.send(signInRequest, {
                    decryptType: HttpsCryptType.COMMON
                });

                if(signInResponse.errorCode == 0) {
                    const tokenRequest = new NXToyTokenRequest(
                        this.uuid,
                        this.uuid2,
                        signInResponse.result!.npSN,
                        signInResponse.result!.npToken,
                        this.pushToken
                    );

                    await this.nxrequest.send(tokenRequest);
                }
            }
        });
    }

    initTray() {
        this.tray = new Tray(nativeImage.createEmpty());
        this.contextMenu = Menu.buildFromTemplate([
            {label: '알람', type: 'radio'},
            {label: '프로그램 열기', type: 'normal'}
        ]);
        this.tray.setContextMenu(this.contextMenu);
    }
};