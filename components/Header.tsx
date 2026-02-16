import { Globe } from 'lucide-react'

import { Badge } from './ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { UserNav } from './UserNav'

export function Header() {
  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b px-12 backdrop-blur">
      <div className="flex h-14 items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-foreground text-3xl font-bold tracking-tight">
            BankOps
            <span className="text-muted-foreground font-medium">Analytics</span>
          </h1>

          <Badge
            variant="outline"
            className="rounded-sm border-emerald-500 bg-emerald-500/20 px-2 text-[10px] font-bold tracking-wider text-emerald-500"
          >
            LIVE SYSTEM
          </Badge>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <Select defaultValue="global">
            <SelectTrigger className="border-border/40 bg-muted/20 hover:bg-muted/40 h-8 w-[400px] text-xs font-medium transition-all focus:ring-0">
              <div className="flex items-center gap-2">
                <Globe className="text-muted-foreground h-3.5 w-3.5" />
                <span className="text-muted-foreground font-normal">
                  Escopo:
                </span>
                <SelectValue placeholder="Global" />
              </div>
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="global" className="text-xs">
                Global
              </SelectItem>
              <SelectItem value="agencia" className="text-xs">
                Agência
              </SelectItem>
              <SelectItem value="operacao" className="text-xs">
                Operação
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <UserNav />
        </div>
      </div>
    </header>
  )
}
