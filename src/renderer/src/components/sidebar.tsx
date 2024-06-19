import { useEffect, useState } from 'react'
import { IconChevronsLeft, IconMenu2, IconX } from '@tabler/icons-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import bunnyLogo from '@/assets/bunny.png'

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({ className, isCollapsed, setIsCollapsed }: SidebarProps) {
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
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${isCollapsed ? 'md:w-14' : 'md:w-64'}`,
        className
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'} w-full bg-black md:hidden`}
      />

      {/* Header */}
      <div className="sticky top-0 justify-between px-4 py-3 shadow md:px-4">
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

        {/* Toggle Button in mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Toggle Navigation"
          aria-controls="sidebar-menu"
          aria-expanded={navOpened}
          onClick={() => setNavOpened((prev) => !prev)}
        >
          {navOpened ? <IconX /> : <IconMenu2 />}
        </Button>
      </div>

      {/* Navigation links */}
      {/* enfiar os cards aq */}

      {/* Scrollbar width toggle button */}
      <Button
        onClick={() => setIsCollapsed((prev) => !prev)}
        size="icon"
        variant="outline"
        className="absolute -right-5 top-1/2 hidden rounded-full md:inline-flex"
      >
        <IconChevronsLeft stroke={1.5} className={`h-5 w-5 ${isCollapsed ? 'rotate-180' : ''}`} />
      </Button>
    </aside>
  )
}