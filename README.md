# 🏥 Pokémon Center — Sistema de Gerenciamento

> **📝 Nota para Avaliação:** Os repositórios originais com todo o histórico de commits estão disponíveis em:
> - **Backend:** [BackEnd do Projeto](https://github.com/inotyu/pokecenter-backend)
> - **Frontend:** [FrontEnd do Projeto](https://github.com/inotyu/PokemonCenter)
> - Este README é uma versão organizada e consolidada para facilitar a avaliação do projeto completo.

Bem-vindo ao **Pokémon Center**! Um sistema moderno e completo para treinadores e pesquisadores gerenciarem sua coleção de Pokémons de forma segura e intuitiva.

🌐 **Site ao vivo:** [PokeCenter](https://pokecenter-kohl.vercel.app)

Este é um sistema completo para gerenciamento de Pokémons, composto por **frontend** e **backend**, permitindo que treinadores e pesquisadores autenticados realizem operações CRUD (Create, Read, Update, Delete) em uma base de dados compartilhada.

### 🖥️ Frontend
Interface moderna desenvolvida com Next.js, React e TypeScript, oferecendo uma experiência intuitiva para gerenciamento de Pokémons.

### 🔧 Backend
API robusta construída com NestJS, TypeScript e PostgreSQL, garantindo segurança, performance e escalabilidade.

## 🎯 Desafio Técnico

Sistema para controle de Pokémons de um Centro Pokémon, onde treinadores ou pesquisadores podem operar um CRUD (Create, Read, Update, Delete), será desenvolvido tanto frontend quanto backend. O sistema deve ser restrito, permitindo o gerenciamento apenas para usuários autenticados.

> **🎉 Desafio Técnico 100% Cumprido!** Este projeto atende integralmente aos requisitos do desafio proposto, incluindo frontend, backend, autenticação, CRUD, deploy e testes automatizados.

### ✅ Requisitos Cumpridos

#### Frontend:
- ✅ **Desenvolvido com React e NextJS com TypeScript**: Ultilização de Next.js 15 com App Router para roteamento eficiente, React 19 para componentes modernos e TypeScript 5 para tipagem forte e segurança de código.
- ✅ **Interface para gerenciamento de Pokémons (Pokedex administrativa)**: Criado um dashboard intuitivo com cards de Pokémons, formulários validados e navegação responsiva usando Tailwind CSS.
- ✅ **Lista de Pokémons com opções para adicionar, editar e excluir**: Implementação de uma lista filtrável por tipo, com botões para CRUD, modais para edição e confirmação para exclusão.
- ✅ **Páginas de login e registro para acesso autorizado**: Desenvolvido páginas seguras com validação de formulários, integração com API JWT e redirecionamento automático.

#### Backend:
- ✅ **API desenvolvida em Node.js com NestJS e TypeScript**: Contrução de uma API RESTful com NestJS 10, TypeScript 5 e arquitetura modular para escalabilidade.
- ✅ **Endpoints RESTful para CRUD de Pokémons**: Criação de endpoints protegidos (GET, POST, PATCH, DELETE) com validação usando class-validator e proteção JWT.
- ✅ **Campos obrigatórios: Nome, Tipo, Nível, HP, Pokedex Number**: Definidos DTOs rigorosos e schema Prisma para garantir integridade dos dados.
- ✅ **Banco PostgreSQL com Prisma ORM**: Usado Prisma 5 para migrations seguras, queries type-safe e seed de dados iniciais.
- ✅ **Sistema de autenticação (Login e Cadastro) com JWT**: Implementação de autenticação stateless com bcrypt para hash de senhas, Passport.js para estratégias JWT e guards para proteção de rotas.

#### Extras:
- ✅ **Deploy em Vercel (Frontend e Backend)**: Frontend hospedado em vercel.com, backend em vercel.com com integração automática via GitHub.
- ✅ **Testes automatizados (Jest + Supertest para e2e)**: Criado testes e2e completos para auth e pokemon, cobrindo cenários de sucesso, erro e segurança.

#### Regras Específicas:
- ✅ **Sistema restrito a usuários autenticados**: Todas as rotas protegidas por JWT, com middleware de autenticação.
- ✅ **Lista de Pokémons global e compartilhada**: Pokémons visíveis para todos os usuários logados, mas edição restrita ao criador.
- ✅ **Apenas o criador pode editar/excluir seu Pokémon**: Validação no service com verificação de ownerId antes de operações de update/delete.

## 🚀 Deployments

- **Frontend:** [https://pokecenter-kohl.vercel.app](https://pokecenter-kohl.vercel.app)
- **Backend API:** [https://pokemon-center-backend.vercel.app](https://pokemon-center-backend.vercel.app)
- **Backend Repo:** [https://github.com/inotyu/pokecenter-backend](https://github.com/inotyu/pokecenter-backend)

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

## 📁 Estrutura do Projeto

### 🖥️ Frontend
```
pokecenter-frontend/
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

### 🔧 Backend
```
pokecenter-backend/
├── src/
│   ├── auth/                    # Módulo de autenticação
│   │   ├── auth.controller.ts  # Endpoints: /auth/login, /auth/register
│   │   ├── auth.service.ts     # Lógica de autenticação JWT
│   │   ├── auth.module.ts      # Configuração do módulo
│   │   ├── jwt.strategy.ts     # Estratégia de validação JWT
│   │   └── dto/
│   │       └── auth.dto.ts     # DTOs de validação
│   ├── pokemon/                 # Módulo de Pokémons
│   │   ├── pokemon.controller.ts  # Endpoints CRUD completos
│   │   ├── pokemon.service.ts    # Lógica de negócio
│   │   ├── pokemon.module.ts
│   │   └── dto/
│   ├── prisma/                  # Configuração do banco
│   ├── common/                  # Guards, decorators
│   └── users/                   # Módulo de usuários
├── test/                        # Testes e2e
├── prisma/
│   ├── schema.prisma            # Schema do banco
│   └── seed.ts                  # Dados iniciais
└── dist/                        # Build
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
