import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { getConfig, PushType } from '../utils/config';

contextBridge.exposeInMainWorld('ipcRenderer', {
    on: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => ipcRenderer.on(channel, listener),
    send: (channel: string, ...args: any[]): void => ipcRenderer.send(channel, args),
    invoke: (channel: string, ...args: any[]): Promise<any> => ipcRenderer.invoke(channel, args)
});

contextBridge.exposeInMainWorld('config', (): PushType => getConfig());