import { useState, useEffect } from 'react'
import versions from '@/mock/versions.json'
import remoteVersions from '@/mock/remoteVersions.json'

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

  const checkForUpdates = () => {
    const localVersion = versions[client.name]
    const remoteVersion = remoteVersions[client.name]

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
      const serverPath = window.api.path.join(basePath, 'mock', 'Rubinot.zip')
      const downloadPath = window.api.path.join(tmpPath, 'Rubinot.zip')

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
      const downloadPath = window.api.path.join(tmpPath, 'Rubinot.zip')
      const unzipPath = window.api.path.join(tmpPath, 'Rubinot')

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
    } catch (error) {
      console.error('Erro ao instalar o cliente:', error)
      alert(`Erro ao instalar o cliente: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async () => {
    setLoading(true)
    try {
      const serverPath = window.api.path.join(basePath, 'mock', 'Rubinot.zip')
      const downloadPath = window.api.path.join(tmpPath, 'Rubinot.zip')

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

  useEffect(() => {
    checkForUpdates()
  }, [])

  return (
    <div className="p-4">
      <button onClick={onBack} className="mb-4 bg-gray-500 text-white px-4 py-2 rounded">
        Voltar
      </button>
      <h1 className="text-4xl font-bold mb-4">{client.name}</h1>
      <div className="mb-4">
        <p>
          <strong>IP:</strong> {client.ip}
        </p>
        <p>
          <strong>Exp:</strong> {client.exp}
        </p>
        <p>
          <strong>Descrição:</strong> {client.description}
        </p>
        <p>
          <strong>Versão Atual:</strong> {versions[client.name]}
        </p>
        <p>
          <strong>Versão Remota:</strong> {remoteVersions[client.name]}
        </p>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <button
            className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={selectInstallPath}
          >
            Selecionar Caminho de Instalação
          </button>
          <input
            type="text"
            placeholder="Caminho de instalação"
            value={installPath}
            readOnly
            className="mb-4 p-2 border rounded w-full"
          />
          {installed ? (
            updatesAvailable ? (
              <button
                className="ml-4 bg-yellow-500 text-white px-2 py-1 rounded"
                onClick={handleUpdate}
              >
                Atualizar
              </button>
            ) : (
              <button className="ml-4 bg-green-500 text-white px-2 py-1 rounded">Jogar</button>
            )
          ) : (
            <>
              <button
                className="ml-4 bg-blue-500 text-white px-2 py-1 rounded"
                onClick={handleDownload}
              >
                Download
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default ServerDetails
