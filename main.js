
import {app, BrowserWindow} from 'electron';
import path from 'path';
import url from 'url';

let win;
function createWindow() {
    win = new BrowserWindow({width: 800, height: 600});

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slahes: true,
    }));

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
