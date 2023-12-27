import { ipcRenderer as electronIpcRenderer } from 'electron';
import { getConfig } from 'src/utils/config';

declare global {
    interface Window {
        ipcRenderer: typeof electronIpcRenderer,
        config: typeof getConfig
    }
}