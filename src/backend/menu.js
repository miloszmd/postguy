const {Menu, dialog} = require('electron');
var {projectDirectory} = require('./core');

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open Project',
        click(item, focusedWindow) {
          projectDirectory = dialog.showOpenDialog({ properties: ['openDirectory'] });
          loadProject(projectDirectory[0], (fileList) => {
            mainWindow.webContents.send('projectLoaded', fileList);
          }, { shortPath: true });
        }
      },
      {
        label: 'Save History',
        type: 'checkbox',
        clicked: true,
        click(item, focusedWindow) {
          saveHistory = !saveHistory;
        }
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload();
        }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools();
        }
      }]
  }];

  module.exports = {
    init: () => {
      var menu = Menu.buildFromTemplate(template);
      Menu.setApplicationMenu(menu);
    }
  };
