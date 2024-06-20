import { ElectronAPI } from '@electron-toolkit/preload'
import * as path from 'path'
import * as fs from 'fs'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      selectFolder: () => Promise<string>
      onBasePath: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => void
      path: typeof path
      fs: typeof fs
      tmpdir: () => string
      unzip: any
    }
  }
}
