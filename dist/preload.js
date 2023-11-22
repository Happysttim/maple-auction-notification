'use strict';

var electron = require('electron');

electron.contextBridge.exposeInMainWorld('ipcRenderer', {
    on: (channel, listener) => electron.ipcRenderer.on(channel, listener),
    send: (channel, ...args) => electron.ipcRenderer.send(channel, args),
    invoke: (channel, ...args) => electron.ipcRenderer.invoke(channel, args)
});
