import { AlertCircle, Inbox, Loader2 } from 'lucide-react'
import { HTMLAttributes, ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface QueryBoundaryProps<T> {
  data: T | undefined | null
  isLoading: boolean
  isError: boolean
  isFetching?: boolean
  onRetry: () => void
  children: (data: T) => ReactNode
  skeleton?: {
    count?: number
    className?: HTMLAttributes<HTMLDivElement>['className']
    wrapperClassName?: HTMLAttributes<HTMLDivElement>['className']
  }
  fallback?: {
    loading?: ReactNode
    empty?: ReactNode
  }

  className?: {
    error?: HTMLAttributes<HTMLDivElement>['className']
    empty?: HTMLAttributes<HTMLDivElement>['className']
    loading?: HTMLAttributes<HTMLDivElement>['className']
    wrapper?: HTMLAttributes<HTMLDivElement>['className']
  }
}

export function QueryBoundary<T>({
  data,
  isLoading,
  isError,
  isFetching,
  onRetry,
  children,
  skeleton,
  fallback,
  className,
}: QueryBoundaryProps<T>) {
  const skeletonCount = skeleton?.count ?? 1
  const skeletonClass = skeleton?.className ?? 'h-full w-full'
  const skeletonWrapperClass = skeleton?.wrapperClassName
  const loadingFallback = fallback?.loading
  const emptyFallback = fallback?.empty
  const classError = className?.error
  const classEmpty = className?.empty
  const classLoading = className?.loading
  const classWrapper = className?.wrapper

  if (isLoading) {
    if (loadingFallback) return <>{loadingFallback}</>

    return (
      <div className={cn(skeletonWrapperClass, classLoading, classWrapper)}>
        {[...Array(skeletonCount)].map((_, i) => (
          <Skeleton key={i} className={cn(skeletonClass)} />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <Card
        className={cn(
          classError,
          classWrapper,
          `flex flex-col items-center justify-center rounded-lg border border-rose-500/20 bg-rose-500/5 text-center`,
        )}
      >
        <AlertCircle className="h-8 w-8 text-rose-500" />
        <p className="text-sm font-medium text-rose-500">System Unavailable</p>
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="border-rose-500/50"
        >
          Retry Connection
        </Button>
      </Card>
    )
  }

  const isActuallyEmpty = (Array.isArray(data) && data.length === 0) || !data
  if (isActuallyEmpty) {
    return (
      emptyFallback || (
        <Card
          className={cn(
            classEmpty,
            classWrapper,
            'flex flex-col items-center justify-center opacity-50',
          )}
        >
          <Inbox className="mb-2 h-8 w-8" />
          <p className="text-sm font-medium">No records found</p>
        </Card>
      )
    )
  }

  return (
    <>
      {isFetching && (
        <div className="animate-in fade-in slide-in-from-bottom-2 fixed right-4 bottom-4 z-9999">
          <div className="bg-background flex items-center gap-2 rounded-full border px-4 py-2 shadow-2xl">
            <Loader2 className="text-primary h-4 w-4 animate-spin" />
            <span className="text-xs font-semibold">Updating data...</span>
          </div>
        </div>
      )}

      <div
        className={cn(
          isFetching && 'pointer-events-none opacity-50 transition-opacity',
          skeletonWrapperClass,
          classWrapper,
        )}
      >
        {children(data)}
      </div>
    </>
  )
}
