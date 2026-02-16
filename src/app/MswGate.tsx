import { Lock } from 'lucide-react'

export function MswGate() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <div className="relative mb-4 flex h-16 w-16 items-center justify-center">
        <div className="bg-primary/20 absolute inset-0 animate-ping rounded-full"></div>
        <div className="border-primary/50 relative rounded-xl border p-3">
          <Lock className="text-primary" />
        </div>
      </div>

      <h2 className="text-sm font-semibold tracking-[0.2em] uppercase">
        BankOps <span className="text-primary">Analytics</span>
      </h2>

      <div className="mt-6 flex items-center gap-2">
        <div className="bg-primary h-1 w-1 animate-bounce rounded-full"></div>
        <div className="bg-primary h-1 w-1 animate-bounce rounded-full [animation-delay:-0.15s]"></div>
        <div className="bg-primary h-1 w-1 animate-bounce rounded-full [animation-delay:-0.3s]"></div>
        <span className="text-[10px] font-medium tracking-widest uppercase">
          Initializing Secure Environment
        </span>
      </div>
    </div>
  )
}
