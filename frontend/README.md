# 🏥 Pokémon Center — Sistema de Gerenciamento

Interface administrativa da Pokédex para o Centro Pokémon. Desenvolvida com **Next.js 15**, **TypeScript** e **Tailwind CSS**.

## 🚀 Começando

```bash
npm install
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 🔐 Credenciais de Teste

| E-mail | Senha | Função |
|---|---|---|
| ash@pokemon.com | pikachu123 | Treinador |
| oak@pokemon.com | research123 | Pesquisador |
| misty@pokemon.com | starmie123 | Treinador |

> **Regra:** Apenas o criador do Pokémon pode editá-lo ou excluí-lo.

## 📁 Estrutura

```
pokemon-center/
├── app/
│   ├── login/         # Página de login
│   ├── register/      # Página de registro
│   └── dashboard/     # Dashboard principal (protegido)
├── components/
│   ├── ui/            # Button, Input, Modal, TypeBadge
│   ├── pokemon/       # PokemonCard, PokemonForm, SearchBar, StatsPanel
│   └── layout/        # Sidebar
├── hooks/
│   ├── useAuth.tsx    # Context de autenticação
│   └── usePokemon.ts  # Estado e CRUD de Pokémon
├── data/
│   └── mock.ts        # Dados mockados
├── lib/
│   └── utils.ts       # Utilitários e cores por tipo
└── types/
    └── index.ts       # Tipos TypeScript globais
```

## 🛠️ Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 3**
- **Lucide React** (ícones)

## 📋 Funcionalidades

- ✅ Login e registro de usuários
- ✅ Rota protegida (redirecionamento automático)
- ✅ Listagem de Pokémon com busca e filtro por tipo
- ✅ Adicionar Pokémon (formulário validado)
- ✅ Editar Pokémon (somente o criador)
- ✅ Excluir Pokémon com confirmação (somente o criador)
- ✅ Painel lateral com estatísticas e destaques
- ✅ Badges de tipo com cores por elemento
- ✅ Barra de HP colorida por valor
- ✅ Indicação visual de dono do Pokémon
