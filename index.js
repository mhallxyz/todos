const { platform } = require('process');
const electron = require('electron');

const { app, BrowserWindow, Menu, ipcMain } = electron;

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
    addWindow.on('closed', () => addWindow = null);
}

ipcMain.on('todo:add', (event, todo) => {
    mainWindow.webContents.send('todo:add', todo);
    addWindow.close();
});

clearTodos = () => {
    mainWindow.webContents.send('todo:clear');
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
                label: 'Clear Todos',
                click() {
                    clearTodos();
                }
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

process.env.NODE_ENV !== 'production' ? menuTemplate.push({
    label: 'Developer',
    submenu: [
        {
            role: 'reload'
        },
        {
            label: 'Toggle Developer Tools',
            accelerator: platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
            click(item, focussedWindow) {
                focussedWindow.toggleDevTools();
            }
        }
    ]
}) : null;