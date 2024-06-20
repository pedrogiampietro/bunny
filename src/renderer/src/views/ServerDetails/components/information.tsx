import { BellIcon, EyeNoneIcon, PersonIcon } from '@radix-ui/react-icons'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function DetailInformations({ client, currentVersion }) {
  console.log('currentVersion, currentVersion')

  return (
    <Card className="my-4">
      <CardHeader className="pb-3">
        <CardTitle>Informações Gerais</CardTitle>
        <CardDescription>{client.about}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 grid-cols-2">
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
          <BellIcon className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-start text-sm font-medium leading-none">Empresa</p>
            <p className="text-start text-sm text-muted-foreground">{client.company}</p>
          </div>
        </div>
        <div className="-mx-2 flex items-start space-x-4 rounded-md hover:bg-accent p-2 text-accent-foreground transition-all">
          <PersonIcon className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-start text-sm font-medium leading-none">IP para Conexão</p>
            <p className="text-start text-sm text-muted-foreground">{client.ip}</p>
          </div>
        </div>
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
          <EyeNoneIcon className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-start text-sm font-medium leading-none">Experiencia</p>
            <p className="text-start text-sm text-muted-foreground">{client.exp}</p>
          </div>
        </div>
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
          <PersonIcon className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-start text-sm font-medium leading-none">Descrição</p>
            <p className="text-start text-sm text-muted-foreground">{client.description}</p>
          </div>
        </div>
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
          <PersonIcon className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-start text-sm font-medium leading-none">Versão Atual</p>
            <p className="text-start text-sm text-muted-foreground">{currentVersion}</p>
          </div>
        </div>
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
          <PersonIcon className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-start text-sm font-medium leading-none">Jogadores online</p>
            <p className="text-start text-sm text-muted-foreground">{client.online}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
