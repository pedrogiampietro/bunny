import React from 'react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export function DropdownMenuCards({ server, onToggleFavorite }) {
  const [isFavorite, setIsFavorite] = React.useState(false)

  const handleFavoriteChange = () => {
    setIsFavorite(!isFavorite)
    onToggleFavorite(server)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">⋮</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={isFavorite} onCheckedChange={handleFavoriteChange}>
          Favorite
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
