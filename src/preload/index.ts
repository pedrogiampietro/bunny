import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import * as unzipper from 'unzipper'

// Custom APIs for renderer
const api = {
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  onBasePath: (callback) => ipcRenderer.on('base-path', callback),
  path,
  fs,
  tmpdir: () => os.tmpdir(),
  unzip: (source, target) => {
    return new Promise((resolve, reject) => {
      console.log(`Starting to unzip ${source} to ${target}`)
      fs.createReadStream(source)
        .pipe(unzipper.Extract({ path: target }))
        .on('close', () => {
          console.log(`Finished unzipping ${source} to ${target}`)
          resolve()
        })
        .on('error', (err) => {
          console.error(`Error unzipping ${source}:`, err)
          reject(err)
        })
    })
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
