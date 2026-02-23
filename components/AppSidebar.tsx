'use client'

import {
  AlertTriangle,
  BarChart3,
  Globe,
  LayoutDashboard,
  LucideShieldHalf,
  ShieldAlert,
  TrendingUp,
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

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

import { UserNav } from './UserNav'

const items = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    disabled: false,
    url: '/dashboard',
  },
  {
    title: 'Risk Events',
    icon: AlertTriangle,
    disabled: false,
    url: '/risk-events',
  },
  { title: 'Market', icon: TrendingUp, disabled: true, url: '/market' },
  { title: 'Exposure', icon: BarChart3, disabled: true, url: '/exposure' },
  { title: 'Global', icon: Globe, disabled: true, url: '/global' },
  { title: 'Security', icon: ShieldAlert, disabled: true, url: '/security' },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()

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
                const isActive =
                  pathname === item.url || pathname.startsWith(item.url + '/')

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      disabled={item.disabled}
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
