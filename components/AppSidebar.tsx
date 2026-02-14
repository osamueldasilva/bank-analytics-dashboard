// components/app-sidebar.tsx
import {
  BarChart3,
  Globe,
  LayoutDashboard,
  LucideShieldHalf,
  ShieldAlert,
  TrendingUp,
} from 'lucide-react'

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
  { title: 'Dashboard', icon: LayoutDashboard, disabled: false },
  { title: 'Market', icon: TrendingUp, disabled: true },
  { title: 'Exposure', icon: BarChart3, disabled: true },
  { title: 'Global', icon: Globe, disabled: true },
  { title: 'Security', icon: ShieldAlert, disabled: true },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="flex h-12 items-center justify-center border-b">
        <LucideShieldHalf className="size-7 fill-blue-500/20 text-blue-600" />
      </SidebarHeader>

      <SidebarContent className="mt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    disabled={item.disabled}
                    className="mx-auto hover:text-blue-500"
                  >
                    <item.icon className="size-4" />
                    <span>{item.title}</span>{' '}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
