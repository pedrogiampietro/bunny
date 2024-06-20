import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function SystemRequired({ dataRequired }) {
  return (
    <Card className="my-4">
      <CardHeader className="pb-3">
        <CardTitle>Requisitos Mínimos</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium leading-none">Sistema Operacional:</p>
            <p className="text-sm text-muted-foreground">{dataRequired[0].os}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium leading-none">Processador:</p>
            <p className="text-sm text-muted-foreground truncate">{dataRequired[0].processor}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium leading-none">Memória:</p>
            <p className="text-sm text-muted-foreground">{dataRequired[0].memory}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium leading-none">Gráfico:</p>
            <p className="text-sm text-muted-foreground truncate">{dataRequired[0].grapic}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium leading-none">Hard Drive:</p>
            <p className="text-sm text-muted-foreground">{dataRequired[0].hardDriver}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
