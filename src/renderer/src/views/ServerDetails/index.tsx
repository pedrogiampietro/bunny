import { useState, useEffect } from 'react'
import versions from '@/mock/versions.json'
import remoteVersions from '@/mock/remoteVersions.json'
import { CalendarDate } from './components/input-date'
import { Button } from '@/components/ui/button'
import { DetailInformations } from './components/information'
import { SystemRequired } from './components/system-required'
import { DetailServerComments } from './components/comments'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

const compareVersions = (local, remote) => {
  const localParts = local.split('.').map(Number)
  const remoteParts = remote.split('.').map(Number)

  const length = Math.max(localParts.length, remoteParts.length)

  for (let i = 0; i < length; i++) {
    const localPart = localParts[i] || 0
    const remotePart = remoteParts[i] || 0

    if (remotePart > localPart) return -1
    if (remotePart < localPart) return 1
  }

  return 0
}

const ServerDetails = ({ client, onBack }) => {
  const [loading, setLoading] = useState(false)
  const [installPath, setInstallPath] = useState('')
  const [updatesAvailable, setUpdatesAvailable] = useState(false)
  const [installed, setInstalled] = useState(false)
  const [basePath, setBasePath] = useState('')
  const [tmpPath, setTmpPath] = useState('')

  useEffect(() => {
    window.api.onBasePath((event, basePath) => {
      console.log(`Received base path: ${basePath}`)
      setBasePath(basePath)
    })

    // Set temporary directory path
    const tmp = window.api.tmpdir()
    console.log(`Temporary directory path: ${tmp}`)
    setTmpPath(tmp)
  }, [])

  useEffect(() => {
    checkForUpdates()
  }, [client])

  const checkForUpdates = () => {
    const localVersion = versions[client.name]
    const remoteVersion = remoteVersions[client.name]

    console.log('client.name', client.name)

    if (!localVersion || !remoteVersion) {
      console.warn(`Versão local ou remota não encontrada para o cliente ${client.name}`)
      return
    }

    if (compareVersions(localVersion, remoteVersion) === -1) {
      setUpdatesAvailable(true)
    }
  }

  const handleDownload = async () => {
    setLoading(true)
    try {
      const serverPath = window.api.path.join(basePath, 'mock', `${client.name}.zip`)
      const downloadPath = window.api.path.join(tmpPath, `${client.name}.zip`)

      window.api.fs.copyFileSync(serverPath, downloadPath)
      console.log(`Copied ${serverPath} to ${downloadPath}`)

      alert(`Cliente ${client.name} baixado com sucesso para ${downloadPath}!`)
      setInstalled(true)
    } catch (error) {
      console.error('Erro ao baixar o cliente:', error)
    } finally {
      handleInstall()
      setLoading(false)
    }
  }

  const handleInstall = async () => {
    if (!installPath) {
      alert('Por favor, selecione um caminho de instalação.')
      return
    }
    setLoading(true)
    try {
      const downloadPath = window.api.path.join(tmpPath, `${client.name}.zip`)
      const unzipPath = window.api.path.join(tmpPath, client.name)

      console.log(`Starting extraction of ${downloadPath} to ${unzipPath}`)
      await window.api.unzip(downloadPath, unzipPath)
      console.log(`Extracted ${downloadPath} to ${unzipPath}`)

      const files = window.api.fs.readdirSync(unzipPath)
      console.log(`Files in unzip path: ${files}`)

      // Limpar o conteúdo do caminho de instalação sem deletar a pasta
      if (window.api.fs.existsSync(installPath)) {
        const installFiles = window.api.fs.readdirSync(installPath)
        for (const file of installFiles) {
          const filePath = window.api.path.join(installPath, file)
          window.api.fs.rmSync(filePath, { recursive: true, force: true })
        }
        console.log(`Cleared existing install path: ${installPath}`)
      } else {
        window.api.fs.mkdirSync(installPath, { recursive: true })
        console.log(`Created install path: ${installPath}`)
      }

      for (const file of files) {
        const srcPath = window.api.path.join(unzipPath, file)
        const destPath = window.api.path.join(installPath, file)
        console.log(`Moving ${srcPath} to ${destPath}`)

        // Verificar se o arquivo de origem existe
        if (window.api.fs.existsSync(srcPath)) {
          try {
            window.api.fs.renameSync(srcPath, destPath)
          } catch (err) {
            console.error(`Error moving file ${srcPath} to ${destPath}:`, err)
            throw err
          }
        } else {
          console.error(`Source file does not exist: ${srcPath}`)
          throw new Error(`Source file does not exist: ${srcPath}`)
        }
      }

      // Remover o diretório temporário se estiver vazio
      if (window.api.fs.existsSync(unzipPath)) {
        window.api.fs.rmdirSync(unzipPath, { recursive: true })
        console.log(`Removed temporary directory ${unzipPath}`)
      }

      alert(`Cliente ${client.name} instalado em ${installPath}`)
      setInstalled(true)
    } catch (error: any) {
      console.error('Erro ao instalar o cliente:', error)
      alert(`Erro ao instalar o cliente: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async () => {
    setLoading(true)
    try {
      const serverPath = window.api.path.join(basePath, 'mock', `${client.name}.zip`)
      const downloadPath = window.api.path.join(tmpPath, `${client.name}.zip`)

      window.api.fs.copyFileSync(serverPath, downloadPath)
      console.log(`Updated ${serverPath} to ${downloadPath}`)

      alert(`Cliente ${client.name} atualizado com sucesso!`)
      setUpdatesAvailable(false)
      versions[client.name] = remoteVersions[client.name]
    } catch (error) {
      console.error('Erro ao atualizar o cliente:', error)
    } finally {
      setLoading(false)
    }
  }

  const selectInstallPath = async () => {
    try {
      const path = await window.api.selectFolder()
      console.log(`Selected install path: ${path}`)
      setInstallPath(path)
    } catch (error) {
      console.error('Erro ao selecionar a pasta:', error)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Voltar
      </button>
      <h1 className="text-4xl font-bold mb-4 text-center">{client.name}</h1>

      <img
        src={client.cover}
        alt={`${client.name} cover`}
        className="mb-4 w-full max-w-md mx-auto rounded shadow-lg"
      />
      <div className="mb-8 text-center">
        <p className="flex gap-5 items-center justify-center">
          <strong>Data de Lançamento:</strong> <CalendarDate />
          {/* {client.releaseDate} */}
        </p>

        <DetailInformations client={client} currentVersion={versions[client.name]} />

        <SystemRequired dataRequired={client.systemRequirements} />
      </div>
      {/* {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="text-center">
          <button
            className="mb-4 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={selectInstallPath}
          >
            Selecionar Caminho de Instalação
          </button>
          <input
            type="text"
            placeholder="Caminho de instalação"
            value={installPath}
            readOnly
            className="mb-4 p-2 border rounded w-full max-w-md mx-auto"
          />
          {installed ? (
            updatesAvailable ? (
              <button
                className="ml-4 bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-400"
                onClick={handleUpdate}
              >
                Atualizar
              </button>
            ) : (
              <button className="ml-4 bg-green-700 text-white px-2 py-1 rounded hover:bg-green-600">
                Jogar
              </button>
            )
          ) : (
            <Button onClick={handleDownload}>Download</Button>
          )}
        </div>
      )} */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Comentários</h2>

        {client.comments.map((comment) => {
          return <DetailServerComments comment={comment} />
        })}
      </div>

      <div className="p-4">
        <form>
          <div className="grid gap-4">
            <Textarea className="p-4" placeholder={`Reply to Pedro...`} />
            <div className="flex items-center">
              <Label htmlFor="mute" className="flex items-center gap-2 text-xs font-normal">
                <Switch id="mute" aria-label="Mute thread" /> Mute this thread
              </Label>
              <Button onClick={(e) => e.preventDefault()} size="sm" className="ml-auto">
                Send
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ServerDetails
