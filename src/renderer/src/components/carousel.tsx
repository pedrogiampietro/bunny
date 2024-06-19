import * as React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { DropdownMenuCards } from './dropdown-menu-cards'

export function CarouselPlugin({ servers, onToggleFavorite }) {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="-ml-1">
        {servers.map((server) => (
          <CarouselItem key={server.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1 relative">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                  <img src={server.cover} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2">
                    <DropdownMenuCards server={server} onToggleFavorite={onToggleFavorite} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
