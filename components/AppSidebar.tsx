'use client'

import {
  BarChart3,
  Globe,
  LayoutDashboard,
  LucideShieldHalf,
  ShieldAlert,
  TrendingUp,
} from 'lucide-react'
import { usePathname } from 'next/navigation'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const items = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    disabled: false,
    url: '/dashboard',
  },
  { title: 'Market', icon: TrendingUp, disabled: true, url: '/market' },
  { title: 'Exposure', icon: BarChart3, disabled: true, url: '/exposure' },
  { title: 'Global', icon: Globe, disabled: true, url: '/global' },
  { title: 'Security', icon: ShieldAlert, disabled: true, url: '/security' },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="flex h-12 items-center justify-center border-b">
        <LucideShieldHalf className="text-primary fill-primary/20 size-12" />
      </SidebarHeader>

      <SidebarContent className="mt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {items.map((item) => {
                const isActive =
                  pathname === item.url || pathname.startsWith(item.url + '/')

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      disabled={item.disabled}
                      className="hover:text-primary data-[active=true]:text-primary mx-auto"
                      isActive={isActive}
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
