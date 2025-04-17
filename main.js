const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const child_process = require('child_process');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 350,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Configuración para comunicación segura
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('index.html'); // Carga el archivo de la interfaz
});

ipcMain.on('install', (event) => {
  try {
    // Copiar archivos
    const sourceFolder = "C:/Users/aleja/Downloads/AI_Hiroshi";
    const destinationFolder = "C:/Program Files/AI_Hiroshi";

    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder, { recursive: true });
    }

    fs.readdirSync(sourceFolder).forEach(file => {
      const sourceFile = path.join(sourceFolder, file);
      const destFile = path.join(destinationFolder, file);
      fs.copyFileSync(sourceFile, destFile);
    });

    // Reproducir música
    const musicPath = "C:/Users/aleja/OneDrive/Documentos/Any Video Converter/Video Download/Vocaloid_Playlist!.mp3";
    child_process.exec(`start "" "${musicPath}"`);

    event.sender.send('install-success');
  } catch (error) {
    event.sender.send('install-failure', error.message);
  }
});
