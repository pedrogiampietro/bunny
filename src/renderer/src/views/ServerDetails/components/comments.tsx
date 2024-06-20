import { ComponentProps } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

export function DetailServerComments({ comment }: any) {
  return (
    <ScrollArea className="my-3 rounded-lg border">
      <div className="flex flex-col gap-2 p-4 pt-2">
        <>
          <div className="flex w-full flex-col gap-1">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="font-semibold">{comment.user}</div>
                {!comment.read && <span className="flex h-2 w-2 rounded-full bg-blue-600" />}
              </div>
              <div
                className={cn(
                  'ml-auto text-xs',
                  true ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {formatDistanceToNow(new Date(comment.date), {
                  addSuffix: true
                })}
              </div>
            </div>
          </div>
          <div className="line-clamp-2 text-xs text-muted-foreground">{comment.comment}</div>
          {comment.hashtags.length ? (
            <div className="flex items-center gap-2">
              {comment.hashtags.map((comment, index) => (
                <Badge key={index} variant={getBadgeVariantFromLabel(comment)}>
                  {comment}
                </Badge>
              ))}
            </div>
          ) : null}
        </>
      </div>
    </ScrollArea>
  )
}

function getBadgeVariantFromLabel(label: string): ComponentProps<typeof Badge>['variant'] {
  const normalizedLabel = label.toLowerCase()

  if (['ótimo servidor', 'exp maravilhosa', 'sem lags'].includes(normalizedLabel)) {
    return 'default'
  }

  if (['power abuser'].includes(normalizedLabel)) {
    return 'outline'
  }

  return 'secondary'
}
