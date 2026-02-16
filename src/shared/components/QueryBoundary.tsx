import { AlertCircle, Inbox } from 'lucide-react'
import { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface QueryBoundaryProps<T> {
  data: T | undefined | null
  isLoading: boolean
  isError: boolean
  onRetry: () => void
  skeletonCount?: number
  skeletonClass?: string
  loadingFallback?: ReactNode
  emptyFallback?: ReactNode
  children: (data: T) => ReactNode
}

export function QueryBoundary<T>({
  data,
  isLoading,
  isError,
  onRetry,
  skeletonCount = 1,
  skeletonClass = 'h-32 w-full',
  loadingFallback,
  emptyFallback,
  children,
}: QueryBoundaryProps<T>) {
  if (isLoading) {
    if (loadingFallback) return <>{loadingFallback}</>

    return (
      <div className="grid grid-cols-10 gap-4">
        {[...Array(skeletonCount)].map((_, i) => (
          <Skeleton key={i} className={skeletonClass} />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-rose-500/20 bg-rose-500/5 p-8 text-center">
        <AlertCircle className="mb-2 h-8 w-8 text-rose-500" />
        <p className="mb-4 text-sm font-medium text-rose-500">
          System Unavailable
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="border-rose-500/50"
        >
          Retry Connection
        </Button>
      </div>
    )
  }

  const isActuallyEmpty = (Array.isArray(data) && data.length === 0) || !data
  if (isActuallyEmpty) {
    return (
      emptyFallback || (
        <Card className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 opacity-40">
          <Inbox className="mb-2 h-8 w-8" />
          <p className="text-sm font-medium">No records found</p>
        </Card>
      )
    )
  }

  return <>{children(data)}</>
}
