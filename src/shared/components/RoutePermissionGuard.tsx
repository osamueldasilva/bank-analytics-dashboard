'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

import { PERMISSIONS, ROUTE_PERMISSIONS } from '@/src/constants'
import { useAuth } from '@/src/core/auth'

function getRequiredPermission(pathname: string) {
  const routes = Object.keys(ROUTE_PERMISSIONS).sort(
    (firstRoute, secondRoute) => secondRoute.length - firstRoute.length,
  )

  const matchedRoute = routes.find(
    (route) => pathname === route || pathname.startsWith(route + '/'),
  )

  return matchedRoute
    ? ROUTE_PERMISSIONS[matchedRoute as keyof typeof ROUTE_PERMISSIONS]
    : null
}

function getFallbackRoute(
  can: (permission: (typeof PERMISSIONS)[keyof typeof PERMISSIONS]) => boolean,
) {
  if (can(PERMISSIONS.dashboardAccess)) return '/dashboard'
  if (can(PERMISSIONS.riskEventsAccess)) return '/risk-events'
  if (can(PERMISSIONS.settingsAccess)) return '/settings'
  return '/dashboard'
}

export function RoutePermissionGuard({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { can } = useAuth()

  const requiredPermission = useMemo(
    () => getRequiredPermission(pathname),
    [pathname],
  )

  const isAllowed = !requiredPermission || can(requiredPermission)

  useEffect(() => {
    if (isAllowed) return

    router.replace(getFallbackRoute(can))
  }, [isAllowed, router, can])

  if (!isAllowed) {
    return null
  }

  return children
}
