import { app, shell, BrowserWindow, ipcMain, globalShortcut } from 'electron'
import { join } from 'path'
import { exec } from 'child_process'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  //----- Create the browser window.-----
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hiddenInset',
    vibrancy: 'under-window',
    visualEffectState: 'active',
    backgroundMaterial: 'acrylic',
    transparent: true,
    backgroundColor: '#00000000',
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false
    }
  })
  mainWindow.setAlwaysOnTop(true, 'screen-saver')
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}





// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  ipcMain.handle('scan-videos', async () => {
    return new Promise((resolve) => {
      if (process.platform === 'darwin') {
        const homeDir = app.getPath('home')
        exec(`mdfind -onlyin "${homeDir}" "kind:movie"`, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout) => {
          if (error) {
            console.error(error)
            resolve([])
            return
          }
          const files = stdout.split('\n').filter(p => Number(p.trim().length) > 0)
          // Filter out obvious system/library caches and return top 30
          const validFiles = files.filter(f => !f.includes('/Library/') && !f.includes('/.Trash/'))
          
          resolve(validFiles.slice(0, 30).map(f => ({
            name: f.split('/').pop(),
            path: f,
            url: `file://${f}`
          })))
        })
      } else {
        resolve([])
      }
    })
  })

  ipcMain.on('close-window', () => {
    const currentWindow = BrowserWindow.getFocusedWindow()
    if (currentWindow) {
      currentWindow.close()
    }
  })

  ipcMain.on('minimize', () => {
    const currentWindow = BrowserWindow.getFocusedWindow()
    if (currentWindow) {
      currentWindow.minimize()
    }
  })

  createWindow()

  app.on('activate', function () {
    
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.whenReady().then(() => {
  if (is.dev) {
    const mainWindow = BrowserWindow.getAllWindows()[0]
    globalShortcut.register('CommandOrControl+Shift+I', () => {
      mainWindow.webContents.toggleDevTools()
    })
  }
})
