'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { z } from 'zod'

type UseUrlFiltersParams<
  Schema extends z.ZodObject<z.ZodRawShape>,
  Keys extends readonly (keyof z.infer<Schema> & string)[],
> = {
  schema: Schema
  keys: Keys
}

export function useUrlFilters<
  Schema extends z.ZodObject<z.ZodRawShape>,
  Keys extends readonly (keyof z.infer<Schema> & string)[],
>({ schema, keys }: UseUrlFiltersParams<Schema, Keys>) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const filters = useMemo(() => {
    const rawValues = keys.reduce<Record<string, string | undefined>>(
      (acc, key) => {
        acc[key] = searchParams.get(key) ?? undefined
        return acc
      },
      {},
    )

    const parsed = schema.safeParse(rawValues)
    if (parsed.success) return parsed.data as z.infer<Schema>

    return schema.parse({}) as z.infer<Schema>
  }, [keys, schema, searchParams])

  const updateFilters = (newFilters: Partial<z.infer<Schema>>) => {
    const params = new URLSearchParams(searchParams.toString())
    const nextFilters = { ...filters, ...newFilters }

    for (const key of keys) {
      const value = nextFilters[key]

      if (value === undefined || value === null || value === '') {
        params.delete(key)
        continue
      }

      params.set(key, String(value))
    }

    router.replace(`${pathname}?${params.toString()}`)
  }

  return {
    filters,
    updateFilters,
  }
}
