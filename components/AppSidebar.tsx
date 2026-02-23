'use client'

import {
  AlertTriangle,
  LayoutDashboard,
  LucideShieldHalf,
  Settings,
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import type { ComponentType } from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { PERMISSIONS } from '@/src/constants'
import { useAuth } from '@/src/core/auth'
import type { Permission } from '@/src/types'

import { UserNav } from './UserNav'

type SidebarItem = {
  title: string
  icon: ComponentType<{ className?: string }>
  disabled: boolean
  url: string
  permission: Permission
}

const items: SidebarItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    disabled: false,
    url: '/dashboard',
    permission: PERMISSIONS.dashboardAccess,
  },
  {
    title: 'Risk Events',
    icon: AlertTriangle,
    disabled: false,
    url: '/risk-events',
    permission: PERMISSIONS.riskEventsAccess,
  },
  {
    title: 'Settings',
    icon: Settings,
    disabled: false,
    url: '/settings',
    permission: PERMISSIONS.settingsAccess,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const { can } = useAuth()

  return (
    <Sidebar collapsible="icon" className="flex flex-col border-r">
      <SidebarHeader
        className="mt-2 flex items-center justify-center"
        title="BankOps Analytics"
      >
        <div className="bg-primary flex items-center justify-center rounded-sm p-2 text-white">
          <LucideShieldHalf className="size-8" />
        </div>
      </SidebarHeader>

      <SidebarContent className="mt-4 flex flex-1 flex-col">
        <SidebarGroup className="flex flex-1 flex-col">
          <SidebarGroupContent className="flex flex-1 flex-col">
            <SidebarMenu className="gap-1">
              {items.map((item) => {
                if (!can(item.permission)) return null

                const isActive =
                  pathname === item.url || pathname.startsWith(item.url + '/')

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="hover:text-primary data-[active=true]:text-primary mx-auto cursor-pointer"
                      isActive={isActive}
                      onClick={() => router.push(item.url)}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>

            <SidebarFooter className="mt-auto">
              <UserNav />
            </SidebarFooter>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
