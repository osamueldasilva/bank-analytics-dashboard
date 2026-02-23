import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export interface FilterSelectOption {
  value: string
  label: string
}

export interface FilterSelectProps {
  label: string
  value: string
  options: FilterSelectOption[]
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function FilterSelect({
  label,
  value,
  options,
  onChange,
  placeholder,
  className,
}: FilterSelectProps) {
  return (
    <div className={`flex min-w-45 flex-col gap-1 ${className ?? ''}`}>
      <span className="text-muted-foreground text-sm">{label}</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder ?? 'Select…'} />
        </SelectTrigger>
        <SelectContent position="popper">
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
