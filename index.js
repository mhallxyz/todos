const { platform } = require('process');
const electron = require('electron');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
app.on('ready', () => {
    mainWindow = new BrowserWindow;
    mainWindow.loadURL(`file://${__dirname}/main.html`);

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
})

let addWindow;
createAddWindow = () => {
    addWindow = new BrowserWindow({height: 400, width: 600});
    addWindow.loadURL('https://mhall.xyz');
}

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Todo',
                click() {
                    createAddWindow();
                }
            },
            {
                label: 'Refresh'
            },
            {
                label: 'Quit',
                accelerator: platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

platform === 'darwin' ? menuTemplate.unshift({}) : null;