const { platform } = require('process');
const electron = require('electron');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({title: 'My Todos'});
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    mainWindow.on('closed', () => app.quit());

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
})

createAddWindow = () => {
    addWindow = new BrowserWindow({height: 200, width: 300, title: 'Add Todo'});
    addWindow.loadURL(`file://${__dirname}/add.html`);
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