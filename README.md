hooks/ → Lógica de estado (React Query + URL params)
utils/ → Funções puras (formatação, cálculos, transformação)
config/ → Configurações estáticas (registry)
storage/ → Persistência local (localStorage)

# BankOps Analytics Dashboard

Sistema analítico para monitoramento de métricas operacionais e eventos de risco no contexto bancário.

Construído com **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS** e **shadcn/ui**.

---

## Visão Geral

O sistema oferece uma visão consolidada da operação bancária, permitindo:

- Monitorar KPIs financeiros e operacionais
- Comparar períodos
- Filtrar dados por segmento e granularidade
- Analisar eventos de risco com ordenação e paginação
- Exportar dados estruturados
- Controlar acesso por permissões (RBAC)

O foco não é apenas exibir dados, mas demonstrar uma arquitetura organizada, escalável e preparada para evolução.

---

## Principais Decisões Técnicas

### 1. Arquitetura por Módulos (Feature-Based)

A estrutura é organizada por domínio (`dashboard`, `risk-events`) em vez de separação técnica pura.

Benefícios:

- Menor acoplamento
- Escalabilidade mais simples
- Evolução independente por módulo

---

### 2. TanStack Query

Usado para gerenciar estado assíncrono.

Vantagens:

- Cache automático por chave
- Controle de invalidação
- Gerenciamento de `staleTime`, `retry` e refetch
- Menos boilerplate

---

### 3. Validação com Zod

Mesmo com TypeScript, dados externos podem quebrar em runtime.
Zod garante:

- Validação estrutural na borda da aplicação
- Tipos derivados com `z.infer`
- Fonte única de verdade para contratos

---

## Fluxo de Dados

UI
→ Hook (React Query + URL)
→ Service
→ API Client
→ Validação com Zod
→ Transformação (utils)
→ Renderização

---

## RBAC (Autorização)

O controle de acesso é baseado em roles:

- Admin
- Analyst
- Viewer

Cada role possui permissões explícitas (ex: `dashboardAccess`, `riskEventsAccess`, `dashboardExportCsv`).

A role ativa:

- É persistida em `localStorage`
- É exposta via `AuthProvider`
- Pode ser verificada com `useAuth().can(permission)`

A autenticação real ainda não está implementada, mas a arquitetura já separa autenticação de autorização, permitindo integração futura com provedores externos.

---

## Estrutura Geral do Projeto

```
src/
 ├── app/              # Rotas (App Router)
 ├── constants/        # Constantes centralizadas
 ├── types/            # Tipos globais
 ├── core/             # Infraestrutura (API + auth)
 ├── modules/          # Módulos por domínio
 │    ├── dashboard/
 │    └── risk-events/
 └── shared/           # Componentes reutilizáveis
```

Cada módulo segue o mesmo padrão:

```
components/  → UI do módulo
hooks/       → Estado e queries
schemas/     → Validação Zod
services/    → Orquestração de API
types/       → Tipos locais
utils/       → Funções puras
config/      → Configuração declarativa
storage/     → Persistência local
```

---

## Padrões Importantes

### Single Source of Truth

- Schemas Zod definem os contratos
- Tipos são derivados com `z.infer`
- Evitar duplicação de interfaces

---

### Constantes Centralizadas

Configurações fixas (ex: React Query defaults) ficam em `src/constants/`.

Evita repetição de valores hardcoded.

---

### Separação Clara de Responsabilidades

- `schemas/` → validação
- `services/` → orquestração
- `hooks/` → estado
- `utils/` → lógica pura
- `config/` → definições declarativas

---

## Escalabilidade

A arquitetura permite:

- Adicionar novos módulos sem refatoração estrutural
- Incluir novos KPIs via registry declarativo
- Substituir mocks por backend real sem alterar UI
- Criar novos filtros com validação automática via URL

---

## Testabilidade

Cada camada pode ser testada isoladamente:

- `utils/` → testes unitários simples
- `services/` → fácil mock de API
- `hooks/` → testáveis com `renderHook`
- `schemas/` → validação determinística

---

## Início Rápido

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
```

Acesse:
[http://localhost:3000](http://localhost:3000)

---
