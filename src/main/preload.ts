import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

contextBridge.exposeInMainWorld('ipcRenderer', {
    on: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => ipcRenderer.on(channel, listener),
    send: (channel: string, ...args: any[]): void => ipcRenderer.send(channel, args),
    invoke: (channel: string, ...args: any[]): Promise<any> => ipcRenderer.invoke(channel, args)
});