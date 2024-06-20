import { useState, useEffect } from 'react'
import { clients as mockClients } from '@/mock/data'
import ServerDetails from '@/views/ServerDetails'

const Launcher = () => {
  const [clients, setClients] = useState(mockClients)
  const [loading, setLoading] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)

  useEffect(() => {
    setClients(mockClients) // Replace with actual fetch call if necessary
  }, [])

  const handleSelectClient = (client) => {
    setSelectedClient(client)
  }

  const handleBack = () => {
    setSelectedClient(null)
  }

  return (
    <div className="p-4 h-full flex flex-col">
      {selectedClient ? (
        <ServerDetails client={selectedClient} onBack={handleBack} />
      ) : (
        <>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Lista de Servidores</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex-grow overflow-y-auto custom-scrollbar">
              <ul className="space-y-4">
                {clients.map((client) => (
                  <li
                    key={client.id}
                    className="flex flex-col sm:flex-row bg-background border rounded-lg p-4 shadow cursor-pointer"
                    onClick={() => handleSelectClient(client)}
                  >
                    <img
                      src={client.cover}
                      alt={client.name}
                      className="w-full sm:w-16 h-16 rounded-lg mb-4 sm:mb-0 sm:mr-4"
                    />
                    <div>
                      <h2 className="text-lg sm:text-xl text-white font-bold">{client.name}</h2>
                      <p className="text-gray-300">{client.description}</p>
                      <p className="text-sm text-gray-600">
                        Versão: {client.version} | IP: {client.ip} | Exp: {client.exp}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Launcher
