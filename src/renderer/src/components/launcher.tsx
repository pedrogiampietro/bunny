import { useState, useEffect } from 'react'
import { clients as mockClients } from '@/mock/data'
import ServerDetails from '@/views/ServerDetails'

const Launcher = () => {
  const [clients, setClients] = useState(mockClients)
  const [loading, setLoading] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)

  useEffect(() => {
    // Fetch clients from the server or local storage
    setClients(mockClients) // Replace with actual fetch call if necessary
  }, [])

  const handleSelectClient = (client) => {
    setSelectedClient(client)
  }

  const handleBack = () => {
    setSelectedClient(null)
  }

  return (
    <div className="p-4">
      {selectedClient ? (
        <ServerDetails client={selectedClient} onBack={handleBack} />
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-4">Meu Launcher</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {clients.map((client) => (
                <li key={client.id} className="mb-2">
                  <div className="cursor-pointer" onClick={() => handleSelectClient(client)}>
                    <strong>{client.name}</strong> - {client.version}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}

export default Launcher
