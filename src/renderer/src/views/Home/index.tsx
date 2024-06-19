import React from 'react'
import rubinotImg from '@/assets/servers/rubinot.jpg'
import deusotImg from '@/assets/servers/deusot.jpg'
import taleonImg from '@/assets/servers/taleon.jpg'
import { CarouselPlugin } from '@/components/carousel'
import Sidebar from '@/components/sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'

const servers = [
  {
    id: 1,
    title: 'RubinOT',
    cover: rubinotImg
  },
  {
    id: 2,
    title: 'DeusOT',
    cover: deusotImg
  },
  {
    id: 3,
    title: 'Taleon',
    cover: taleonImg
  }
]

export default function Home() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  const [favoriteServers, setFavoriteServers] = React.useState([])
  const [navOpened, setNavOpened] = React.useState(false)

  const handleToggleFavorite = (server) => {
    setFavoriteServers((prevFavorites: any) => {
      if (prevFavorites.find((fav) => fav.id === server.id)) {
        return prevFavorites.filter((fav) => fav.id !== server.id)
      } else {
        return [...prevFavorites, server]
      }
    })
  }

  return (
    <div
      className={`container h-screen flex flex-col lg:flex-row bg-background lg:max-w-none lg:px-0 ${navOpened ? 'overflow-hidden' : ''}`}
    >
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        favoriteServers={favoriteServers}
        navOpened={navOpened}
        setNavOpened={setNavOpened}
      />

      {/* Overlay for mobile */}
      {navOpened && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50 lg:hidden"
          onClick={() => setNavOpened(false)}
        ></div>
      )}

      <div className="flex flex-1 flex-col items-center justify-center lg:justify-start lg:ml-64 p-4 mt-8 lg:mt-0 overflow-hidden">
        <div className="w-full max-w-4xl lg:mx-4 xl:mx-8">
          <CarouselPlugin servers={servers} onToggleFavorite={handleToggleFavorite} />
        </div>
        {/* Add other components below as needed */}
      </div>
    </div>
  )
}
