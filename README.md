# BankOps Analytics Dashboard

> **Sistema de visualização e análise operacional para bancos**

O **BankOps Analytics Dashboard** é um sistema moderno para monitoramento de métricas estratégicas, eventos de risco e indicadores de performance no contexto bancário.

---

## 🚀 Visão Geral

O foco do sistema é fornecer uma visão consolidada da operação bancária, permitindo:

- Análise comparativa
- Segmentação por período
- Estrutura de autorização baseada em roles (RBAC) implementada de forma simulada, preparada para futura integração com autenticação real

---

## 🎯 Propósito do Sistema

O BankOps Analytics Dashboard simula um ambiente real de análise operacional bancária, atendendo diferentes perfis de usuários que precisam:

- 📊 Monitorar KPIs financeiros e operacionais
- 📈 Comparar desempenho entre períodos
- 🔎 Filtrar dados por segmento e granularidade
- ⚠️ Analisar eventos de risco com paginação e ordenação
- 📤 Exportar dados estruturados
- 🔒 Estruturar controle de acesso por permissões (RBAC) como evolução do projeto

---

> O objetivo principal não é apenas exibir métricas, mas demonstrar uma arquitetura **escalável** e **organizada** para sistemas analíticos.

Dashboard analítico bancário construído com **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS** e **shadcn/ui**.

---

## 🧠 Decisões Arquiteturais

### Organização por Módulo (Feature-Based Architecture)

O projeto foi estruturado por domínio (`dashboard`, `risk-events`) ao invés de separação puramente técnica.

**Motivação:**

- Redução de acoplamento entre features
- Escalabilidade horizontal
- Facilidade para expansão do sistema e atuação paralela de times

**Trade-offs:**

- Estrutura inicial mais detalhada
- Maior disciplina para manter fronteiras de módulo

### Uso de TanStack Query

Optou-se por TanStack Query para estado assíncrono por oferecer:

- Cache inteligente por chave
- Invalidação controlada
- Sincronização automática de dados
- Controle estratégico de `staleTime`, `retry` e refetch

Isso reduz complexidade de gerenciamento manual e evita boilerplate de estado remoto.

### Validação Runtime com Zod

Mesmo com TypeScript, contratos externos podem quebrar em runtime. O uso de Zod garante:

- Segurança estrutural na borda da aplicação
- Tipagem derivada (`z.infer`) a partir do schema
- Single Source of Truth entre validação e tipos

---

## 🔄 Fluxo de Dados

```text
UI
 → Hook (React Query + URL state)
   → Service (orquestração)
     → API client
       → Validação Zod
         → Transformação (utils)
           → Renderização
```

---

## 🏆 Diferenciais Técnicos

- Estado sincronizado com URL (query param driven)
- Controle de permissão centralizado (RBAC) com role persistida localmente e matriz declarativa de permissões
- Separação clara entre domínio e infraestrutura
- Tipagem derivada de schema com validação runtime
- Arquitetura preparada para evolução incremental

---

## 🔐 Autorização (RBAC)

O controle de acesso é baseado em uma matriz declarativa de permissões por role (`Admin`, `Analyst`, `Viewer`), definida em `auth.config.ts`. Cada role possui um conjunto explícito de permissões (ex.: `dashboardAccess`, `riskEventsAccess`, `dashboardExportCsv`).

A role ativa é persistida em `localStorage` e exposta via `AuthProvider` + hook `useAuth()`, que disponibiliza o método `can(permission)` para verificação condicional em qualquer ponto da UI.

A autenticação real (login, token, sessão) ainda não está implementada — a role é resolvida localmente. A arquitetura já separa **autenticação** (quem é o usuário) de **autorização** (o que ele pode fazer), permitindo integração futura com provedores de identidade sem alterar a lógica de permissões.

---

## Sumário

- [Decisões Arquiteturais](#-decisões-arquiteturais)
- [Fluxo de Dados](#-fluxo-de-dados)
- [Diferenciais Técnicos](#-diferenciais-técnicos)
- [Autorização (RBAC)](#-autorização-rbac)
- [Início Rápido](#início-rápido)
- [Arquitetura & Estrutura de Pastas](#arquitetura--estrutura-de-pastas)
- [Padrões do Projeto](#padrões-do-projeto)
- [Escalabilidade](#-escalabilidade)
- [Testabilidade](#-testabilidade)
- [Guia de Contribuição](#guia-de-contribuição)
- [Tech Stack](#-tech-stack)
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

```text
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
│   │   ├── auth.constants.ts          # Roles e permissions (RBAC)
│   │   ├── dashboard.constants.ts     # Segmentos, períodos, status, etc.
│   │   ├── kpi.constants.ts           # Labels de KPI, categorias, granularidades
│   │   └── query.constants.ts         # Defaults do React Query (staleTime, retry, etc.)
│   │
│   ├── types/               # ⭐ Tipos globais centralizados
│   │   ├── index.ts                   # Barrel export
│   │   ├── auth.types.ts              # Tipos de auth (UserRole, Permission, RoleMeta)
│   │   ├── dashboard.types.ts         # Re-exports de schemas + tipos puros de domínio
│   │   └── kpi.types.ts               # Tipos de KPI (registry, columns, comparison, etc.)
│   │
│   ├── core/                # Infraestrutura compartilhada (API + auth)
│   │   ├── auth/
│   │   │   ├── index.ts               # Barrel de auth (import único)
│   │   │   ├── auth.context.tsx       # AuthProvider + hook useAuth
│   │   │   ├── auth.storage.ts        # Persistência local de role
│   │   │   ├── auth.schema.ts         # Schema Zod para role
│   │   │   └── auth.config.ts         # ROLE_META + matriz de permissões
│   │   └── api/
│   │       ├── dashboard.api.ts       # API client com validação Zod
│   │       ├── dashboard.mock.ts      # Geração de dados mockados
│   │       ├── riskEvents.api.ts      # API client de risk events
│   │       ├── riskEvents.mock.ts     # Mock de risk events (240 eventos)
│   │       └── simulateLatency.ts     # Simulação de latência de rede
│   │
│   ├── modules/
│   │   ├── dashboard/       # Feature module do dashboard
│   │   │   ├── components/            # Componentes do módulo
│   │   │   │   ├── DashboardFiltersBar.tsx
│   │   │   │   ├── KpiCards.tsx
│   │   │   │   ├── DashboardPanel/    # Painel com widgets
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── widgets/       # Widgets individuais
│   │   │   │   └── KpiPageClient/     # Página de detalhe de KPI
│   │   │   │       ├── index.tsx
│   │   │   │       └── components/
│   │   │   │           └── types.ts   # Tipos locais do componente
│   │   │   │
│   │   │   ├── config/                # Configurações do módulo
│   │   │   │   └── kpiRegistry.ts     # Registry de KPIs (endpoints, colunas, filtros)
│   │   │   │
│   │   │   ├── hooks/                 # React hooks do módulo
│   │   │   │   ├── useDashboardFilters.ts
│   │   │   │   ├── useDashboardQueries.ts
│   │   │   │   ├── useExportDashboardCsv.ts
│   │   │   │   ├── useKpiComparisonQuery.ts
│   │   │   │   ├── useKpiDetail.ts
│   │   │   │   ├── useKpiDetailsFilters.ts
│   │   │   │   ├── useKpiDetailsQuery.ts
│   │   │   │   ├── useKpiDetailsTableQuery.ts
│   │   │   │   └── useUrlFilters.ts   # Hook genérico para filtros via URL
│   │   │   │
│   │   │   ├── schemas/               # Zod schemas (source of truth para tipos runtime)
│   │   │   │   ├── dashboard.schemas.ts
│   │   │   │   └── kpiDetailsFilters.schema.ts
│   │   │   │
│   │   │   ├── services/              # Camada de serviço (facade para API)
│   │   │   │   ├── dashboard.service.ts
│   │   │   │   ├── kpi.service.ts
│   │   │   │   └── exportDashboardCsv.ts
│   │   │   │
│   │   │   ├── storage/               # Persistência local (localStorage)
│   │   │   │   └── dashboardPreferences.ts
│   │   │   │
│   │   │   ├── types/                 # Tipos locais do módulo
│   │   │   │   ├── dashboard.types.ts       # Re-export (compat) → src/types/
│   │   │   │   ├── dashboard.filters.ts     # DashboardFilters type
│   │   │   │   └── userPreferences.ts       # UserPreferences type
│   │   │   │
│   │   │   └── utils/                 # Utilitários do módulo
│   │   │       ├── csv.utils.ts             # Geração de CSV
│   │   │       ├── dashboard.transform.ts   # Formatação e transformação de dados
│   │   │       ├── kpi.comparison.ts        # ⭐ Lógica de comparação de KPI (extraída)
│   │   │       └── kpi.format.ts            # Formatação de valores por tipo
│   │   │
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
│           ├── FilterSelect.tsx    # ⭐ Select de filtro reutilizável
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
import { useAuth } from '@/src/core/auth'

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

## 📈 Escalabilidade

O projeto foi desenhado para crescer sem reestruturação:

- **Novos módulos** → Criar diretório em `src/modules/` seguindo a mesma convenção (`components/`, `hooks/`, `schemas/`, `services/`, `types/`, `utils/`)
- **Novos KPIs** → Estender o registry em `kpiRegistry.ts` (endpoints, colunas e filtros declarativos)
- **Novos endpoints** → Adicionar em `services/` com validação Zod na borda
- **Backend real** → Substituir mocks em `core/api/` sem alterar hooks ou componentes
- **Novos filtros** → Compor via `useUrlFilters` com schema Zod para validação automática dos query params

---

## 🧪 Testabilidade

A arquitetura facilita testes em múltiplas camadas, mesmo que a suíte de testes ainda esteja em construção:

| Camada      | Estratégia                                                 |
| ----------- | ---------------------------------------------------------- |
| `utils/`    | Funções puras — testáveis com testes unitários sem mock    |
| `services/` | Facade desacoplada — facilita mocking da camada de API     |
| `hooks/`    | Isolados por responsabilidade — testáveis com `renderHook` |
| `schemas/`  | Validação determinística — testável com `.safeParse()`     |

> A separação entre lógica pura (`utils`), orquestração (`services`) e estado (`hooks`) foi projetada para tornar cada camada independentemente testável.

---

## Guia de Contribuição

1. **Novos tipos?** → Defina em `src/types/` (ou schema Zod + re-export).
2. **Nova constante?** → Adicione em `src/constants/`.
3. **Lógica reutilizável?** → Extraia para `utils/` como função pura.
4. **Novo hook?** → Um hook, uma responsabilidade. Use `QUERY_DEFAULTS`.
5. **Imports** → Sempre `@/` alias para paths absolutos.
6. **Auth/RBAC** → Base estrutural em `src/constants/auth.constants.ts` e `src/types/auth.types.ts`, consumo via `@/src/core/auth`. A autenticação real ainda não está ativa — atualmente a role é resolvida localmente para demonstrar separação entre autenticação e autorização.

---

## 🧱 Tech Stack

| Categoria         | Ferramenta/Lib                                            |
| ----------------- | --------------------------------------------------------- |
| Framework         | Next.js 16 (App Router, SSR/CSR híbrido, streaming ready) |
| Linguagem         | TypeScript                                                |
| Estado assíncrono | TanStack Query v5                                         |
| Validação runtime | Zod                                                       |
| UI                | Tailwind CSS v4 + shadcn/ui                               |
| Lint              | ESLint + simple-import-sort                               |

---

## Deploy

Deploy recomendado via [Vercel](https://vercel.com):

```bash
pnpm build
```

Veja [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.
