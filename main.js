// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

function getCPU () {

  var os = require('os')
  //console.log(os.type()); // "Windows_NT"
  //console.log(os.release()); // "10.0.14393"
  //console.log(os.platform()); // "win32"
  return os.cpus()[0].model;
}

function getRAM () {
  //console.log(formatBytes(os.totalmem()));
  var os = require('os')
  return formatBytes(os.totalmem());
}

// going to be used as a switch statement which returns whatever choice e.g. RAM
function getPCInfo() {
}

function formatBytes(a,b=2)
{
  if(0===a)
    return"0 Bytes";
  const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));
    return parseFloat((a/Math.pow(1024,d)).toFixed(c))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
