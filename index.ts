import ElectronApp from './src/main/app';
import { app } from 'electron';

app.whenReady().then(async () => {

    const electronApp = new ElectronApp();

    await electronApp.initNotifcate();
    electronApp.initHook();
    electronApp.initLoginWindow();
    electronApp.initTray();
    
});