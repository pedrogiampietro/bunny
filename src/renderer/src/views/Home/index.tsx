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
  return (
    <div className="container h-screen flex bg-background lg:max-w-none lg:px-0">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="mx-auto w-full flex flex-col space-y-2 sm:w-[80%] lg:w-[70%] lg:p-8 ml-72 mt-4">
        <CarouselPlugin servers={servers} />
      </div>
    </div>
  )
}
