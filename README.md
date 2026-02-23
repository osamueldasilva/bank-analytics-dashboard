# Bank Analytics Dashboard

Dashboard analítico bancário construído com **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS** e **shadcn/ui**.

---

## Sumário

- [Início Rápido](#início-rápido)
- [Arquitetura & Estrutura de Pastas](#arquitetura--estrutura-de-pastas)
- [Padrões do Projeto](#padrões-do-projeto)
- [Guia de Contribuição](#guia-de-contribuição)
- [Deploy](#deploy)

---

## Início Rápido

```bash
# Instalar dependências
pnpm install

# Desenvolvimento
pnpm dev

# Build de produção
pnpm build

# Lint
pnpm lint
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

---

## Arquitetura & Estrutura de Pastas

```
├── components/              # Componentes de UI reutilizáveis (shadcn/ui + layout)
│   ├── ui/                  # Componentes primitivos do shadcn/ui
│   ├── AppSidebar.tsx       # Sidebar principal
│   ├── Header.tsx           # Header da aplicação
│   └── UserNav.tsx          # Navegação do usuário
│
├── hooks/                   # Hooks utilitários genéricos (use-mobile, etc.)
│
├── lib/                     # Utilitários genéricos de infraestrutura
│   ├── utils.ts             # cn() helper (clsx + twMerge)
│   └── buildKpiUrl.ts       # Construção de URL para KPIs
│
├── src/
│   ├── app/                 # App Router do Next.js (rotas e layouts)
│   │   ├── layout.tsx
│   │   ├── providers.tsx    # QueryClientProvider, ThemeProvider, etc.
│   │   ├── dashboard/
│   │   │   ├── page.tsx                  # Página principal do dashboard
│   │   │   └── kpi/[kpiId]/page.tsx      # Detalhes de KPI (SSR dinâmico)
│   │   └── risk-events/
│   │       └── page.tsx                  # Página de risk events
│   │
│   ├── constants/           # ⭐ Constantes centralizadas
│   │   ├── index.ts                   # Barrel export
│   │   ├── dashboard.constants.ts     # Segmentos, períodos, status, etc.
│   │   ├── kpi.constants.ts           # Labels de KPI, categorias, granularidades
│   │   └── query.constants.ts         # Defaults do React Query (staleTime, retry, etc.)
│   │
│   ├── types/               # ⭐ Tipos globais centralizados
│   │   ├── index.ts                   # Barrel export
│   │   ├── dashboard.types.ts         # Re-exports de schemas + tipos puros de domínio
│   │   └── kpi.types.ts               # Tipos de KPI (registry, columns, comparison, etc.)
│   │
│   ├── core/                # Camada de infraestrutura (API, mocks)
│   │   └── api/
│   │       ├── dashboard.api.ts       # API client com validação Zod
│   │       ├── dashboard.mock.ts      # Geração de dados mockados
│   │       ├── riskEvents.api.ts      # API client de risk events
│   │       ├── riskEvents.mock.ts     # Mock de risk events (240 eventos)
│   │       └── simulateLatency.ts     # Simulação de latência de rede
│   │
│   ├── modules/
│   │   ├── dashboard/       # Feature module do dashboard
│   │       ├── components/            # Componentes do módulo
│   │       │   ├── DashboardFiltersBar.tsx
│   │       │   ├── KpiCards.tsx
│   │       │   ├── DashboardPanel/    # Painel com widgets
│   │       │   │   ├── index.tsx
│   │       │   │   └── widgets/       # Widgets individuais
│   │       │   └── KpiPageClient/     # Página de detalhe de KPI
│   │       │       ├── index.tsx
│   │       │       └── components/
│   │       │           └── types.ts   # Tipos locais do componente
│   │       │
│   │       ├── config/                # Configurações do módulo
│   │       │   └── kpiRegistry.ts     # Registry de KPIs (endpoints, colunas, filtros)
│   │       │
│   │       ├── hooks/                 # React hooks do módulo
│   │       │   ├── useDashboardFilters.ts
│   │       │   ├── useDashboardQueries.ts
│   │       │   ├── useExportDashboardCsv.ts
│   │       │   ├── useKpiComparisonQuery.ts
│   │       │   ├── useKpiDetail.ts
│   │       │   ├── useKpiDetailsFilters.ts
│   │       │   ├── useKpiDetailsQuery.ts
│   │       │   ├── useKpiDetailsTableQuery.ts
│   │       │   └── useUrlFilters.ts   # Hook genérico para filtros via URL
│   │       │
│   │       ├── schemas/               # Zod schemas (source of truth para tipos runtime)
│   │       │   ├── dashboard.schemas.ts
│   │       │   └── kpiDetailsFilters.schema.ts
│   │       │
│   │       ├── services/              # Camada de serviço (facade para API)
│   │       │   ├── dashboard.service.ts
│   │       │   ├── kpi.service.ts
│   │       │   └── exportDashboardCsv.ts
│   │       │
│   │       ├── storage/               # Persistência local (localStorage)
│   │       │   └── dashboardPreferences.ts
│   │       │
│   │       ├── types/                 # Tipos locais do módulo
│   │       │   ├── dashboard.types.ts       # Re-export (compat) → src/types/
│   │       │   ├── dashboard.filters.ts     # DashboardFilters type
│   │       │   └── userPreferences.ts       # UserPreferences type
│   │       │
│   │       └── utils/                 # Utilitários do módulo
│   │           ├── csv.utils.ts             # Geração de CSV
│   │           ├── dashboard.transform.ts   # Formatação e transformação de dados
│   │           ├── kpi.comparison.ts        # ⭐ Lógica de comparação de KPI (extraída)
│   │           └── kpi.format.ts            # Formatação de valores por tipo
│   │
│   │   └── risk-events/     # Feature module de risk events (independente)
│   │       ├── components/
│   │       │   ├── RiskEventsPageClient.tsx  # Orquestrador da página (client)
│   │       │   ├── RiskEventsFilters.tsx     # Filtros (URL-driven)
│   │       │   └── RiskEventsTable.tsx       # Tabela com sort + pagination
│   │       ├── hooks/
│   │       │   ├── useRiskEventsFilters.ts   # Filtros via URL (Zod-validated)
│   │       │   └── useRiskEventsQuery.ts     # React Query hook
│   │       ├── schemas/
│   │       │   └── riskEvents.schema.ts      # Zod schemas (source of truth)
│   │       ├── services/
│   │       │   └── riskEvents.service.ts     # Facade para API
│   │       └── types/
│   │           └── riskEvents.types.ts       # z.infer types
│   │
│   └── shared/              # Componentes compartilhados entre módulos
│       └── components/
│           ├── DataTable.tsx       # ⭐ Tabela genérica (sort + paginação + Card)
│           ├── FilterSelect.tsx   # ⭐ Select de filtro reutilizável
│           └── QueryBoundary.tsx
│
└── public/                  # Assets estáticos
```

---

## Padrões do Projeto

### 1. Single Source of Truth para Tipos

| Camada                    | Responsabilidade                                                    |
| ------------------------- | ------------------------------------------------------------------- |
| `src/modules/**/schemas/` | **Zod schemas** — fonte de verdade para tipos com validação runtime |
| `src/types/`              | **Re-exports + tipos puros** — centralização para consumo externo   |
| `src/modules/**/types/`   | **Tipos locais** do módulo (filtros, preferências)                  |

> **Regra:** Nunca duplique uma interface que já existe em um schema Zod.
> Use `z.infer<typeof Schema>` para derivar o tipo e re-exporte de `src/types/`.

### 2. Constantes Centralizadas

Valores fixos ficam em `src/constants/`:

```ts
// ✅ Correto — usar constante centralizada
import { QUERY_DEFAULTS } from '@/src/constants'

useQuery({ ...QUERY_DEFAULTS, queryKey: [...], queryFn: ... })

// ❌ Errado — valores hardcoded repetidos
useQuery({ staleTime: 60000, retry: 1, refetchOnWindowFocus: false, ... })
```

### 3. Imports com Alias `@/`

Sempre usar o alias `@/` para imports absolutos:

```ts
// ✅ Correto
import type { KpiMetric } from '@/src/types/dashboard.types'
import { QUERY_DEFAULTS } from '@/src/constants'

// ❌ Errado — caminhos relativos longos
import { KpiMetric } from '../../../types/dashboard.types'
```

### 4. Separação de Responsabilidades

```
schemas/   → Validação de dados (Zod)
services/  → Façade para API (orquestra chamadas)
hooks/     → Lógica de estado (React Query + URL params)
utils/     → Funções puras (formatação, cálculos, transformação)
config/    → Configurações estáticas (registry)
storage/   → Persistência local (localStorage)
```

### 5. Estrutura de Hooks

- **Um hook = uma responsabilidade**
- Lógica de cálculo complexa deve ser **extraída para `utils/`**
- Configurações de `useQuery` reutilizar constantes de `src/constants/query.constants.ts`

```ts
// ✅ Lógica extraída para utils
import { calculateKpiComparison } from '../utils/kpi.comparison'

const comparison = useQuery({
  queryFn: async () => {
    const [current, previous] = await Promise.all([...])
    return calculateKpiComparison({ currentPoints: current, previousPoints: previous })
  },
  ...QUERY_DEFAULTS,
})
```

### 6. Nomenclatura de Arquivos

| Tipo             | Padrão                    | Exemplo                  |
| ---------------- | ------------------------- | ------------------------ |
| Componente React | `PascalCase.tsx`          | `KpiCards.tsx`           |
| Hook             | `camelCase.ts`            | `useDashboardFilters.ts` |
| Tipo/Interface   | `kebab-case.types.ts`     | `dashboard.types.ts`     |
| Schema Zod       | `kebab-case.schema(s).ts` | `dashboard.schemas.ts`   |
| Utilitário       | `kebab-case.utils.ts`     | `csv.utils.ts`           |
| Constante        | `kebab-case.constants.ts` | `query.constants.ts`     |
| Serviço          | `kebab-case.service.ts`   | `kpi.service.ts`         |
| Config           | `camelCase.ts`            | `kpiRegistry.ts`         |

### 7. Organização de Tipos Union/Literal

Sempre centralizar string unions como tipos nomeados em `src/types/`:

```ts
// ✅ Tipo nomeado reutilizável
export type KpiGranularity = 'daily' | 'weekly' | 'monthly'
export type KpiSortField = 'date' | 'segment' | 'value' | ...

// ❌ String literals inline
(sortBy: 'date' | 'segment' | 'value' | ...)
```

---

## Guia de Contribuição

1. **Novos tipos?** → Defina em `src/types/` (ou schema Zod + re-export).
2. **Nova constante?** → Adicione em `src/constants/`.
3. **Lógica reutilizável?** → Extraia para `utils/` como função pura.
4. **Novo hook?** → Um hook, uma responsabilidade. Use `QUERY_DEFAULTS`.
5. **Imports** → Sempre `@/` alias para paths absolutos.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router + Turbopack)
- **UI:** Tailwind CSS v4 + shadcn/ui
- **State:** React Query (TanStack Query v5)
- **Validação:** Zod
- **Lint:** ESLint + simple-import-sort

---

## Deploy

Deploy recomendado via [Vercel](https://vercel.com):

```bash
pnpm build
```

Veja [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.
