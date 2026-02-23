'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { USER_ROLES } from '@/src/constants'
import { ROLE_META, useAuth } from '@/src/core/auth'

export function UserNav() {
  const { theme, setTheme } = useTheme()

  const { role, setRole } = useAuth()
  const roleMeta = ROLE_META[role]

  const themeOptions = [
    { key: 'light', label: 'Light', icon: Sun },
    { key: 'dark', label: 'Dark', icon: Moon },
    { key: 'system', label: 'System', icon: Monitor },
  ] as const

  const renderThemeItems = () =>
    themeOptions.map((themeOption) => {
      const Icon = themeOption.icon
      const isActive = theme === themeOption.key
      return (
        <DropdownMenuItem
          key={themeOption.key}
          onClick={() => setTheme(themeOption.key)}
          className={
            isActive
              ? 'bg-primary focus:bg-primary/90 font-bold text-white focus:text-white'
              : ''
          }
        >
          <Icon
            className={cn(
              'mr-2 h-4 w-4',
              isActive ? 'font-bold text-white' : '',
            )}
          />
          {themeOption.label}
        </DropdownMenuItem>
      )
    })

  const renderRoleItems = () =>
    USER_ROLES.map((roleOption) => {
      const isActive = role === roleOption
      return (
        <DropdownMenuItem
          key={roleOption}
          onClick={() => setRole(roleOption)}
          className={
            isActive
              ? 'bg-primary focus:bg-primary/90 font-bold text-white focus:text-white'
              : ''
          }
        >
          {roleOption}
        </DropdownMenuItem>
      )
    })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56"
        align="start"
        side="right"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">{roleMeta.name}</p>
            <p className="text-muted-foreground text-sm leading-none">
              {roleMeta.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Access Role</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>{renderRoleItems()}</DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {renderThemeItems()}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-red-600 focus:text-red-600">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
