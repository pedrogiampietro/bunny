import { useEffect, useState } from 'react'
import { IconChevronsLeft, IconMenu2, IconX } from '@tabler/icons-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import bunnyLogo from '@/assets/bunny.png'
import { Card, CardContent } from '@/components/ui/card'

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  favoriteServers: any
}

export default function Sidebar({
  className,
  isCollapsed,
  setIsCollapsed,
  favoriteServers
}: SidebarProps) {
  const [navOpened, setNavOpened] = useState(false)

  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [navOpened])

  return (
    <>
      {/* Toggle Button in mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 lg:hidden"
        aria-label="Toggle Navigation"
        aria-controls="sidebar-menu"
        aria-expanded={navOpened}
        onClick={() => setNavOpened((prev) => !prev)}
      >
        {navOpened ? <IconX /> : <IconMenu2 />}
      </Button>

      <aside
        className={cn(
          `fixed left-0 top-0 z-50 h-full w-64 border-r-2 border-r-muted transition-all lg:bottom-0 lg:right-auto lg:h-screen ${isCollapsed ? 'lg:w-14' : 'lg:w-64'}`,
          navOpened ? 'block' : 'hidden lg:block',
          className
        )}
      >
        {/* Overlay in mobile */}
        <div
          onClick={() => setNavOpened(false)}
          className={`absolute inset-0 transition-opacity duration-300 ${navOpened ? 'h-full opacity-50' : 'h-0 opacity-0'} w-full bg-black lg:hidden`}
        />

        {/* Header */}
        <div className="flex justify-between px-4 py-3 shadow lg:px-4">
          <div className={`flex items-center ${!isCollapsed ? 'gap-2' : ''}`}>
            <img
              src={bunnyLogo}
              className={`transition-all ${isCollapsed ? 'h-6 w-6' : 'h-16 w-16'}`}
            />
            <div
              className={`flex flex-col justify-end truncate ${
                isCollapsed ? 'invisible w-0' : 'visible w-auto'
              }`}
            >
              <span className="font-medium">Bunny</span>
            </div>
          </div>
        </div>

        {/* Favorited Servers */}
        <div
          className={`flex flex-col items-center justify-center h-full w-full p-4 space-y-4 ${isCollapsed || !navOpened ? 'hidden lg:flex' : 'flex'}`}
        >
          {favoriteServers.map((server) => (
            <Card key={server.id} className="w-full max-w-sm">
              <CardContent className="flex flex-col items-center p-4">
                <img src={server.cover} className="w-full h-full mb-2 object-cover" />
                <h4 className="text-lg font-medium text-center">{server.title}</h4>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Favorited Servers Icons for Collapsed Sidebar */}
        {isCollapsed && (
          <div className="flex flex-col items-center justify-center h-full w-full p-4 space-y-4 lg:hidden">
            {favoriteServers.map((server) => (
              <img
                key={server.id}
                src={server.cover}
                alt={server.title}
                className="w-8 h-8 rounded-full"
              />
            ))}
          </div>
        )}

        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size="icon"
          variant="outline"
          className="absolute -right-5 top-1/2 hidden rounded-full lg:inline-flex"
        >
          <IconChevronsLeft stroke={1.5} className={`h-5 w-5 ${isCollapsed ? 'rotate-180' : ''}`} />
        </Button>
      </aside>
    </>
  )
}
