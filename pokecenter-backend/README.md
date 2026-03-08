# 🎮 Pokémon Center Backend API

<div align="center">
  <img src="https://img.shields.io/badge/NestJS-10.0.0-red?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS"/>
  <img src="https://img.shields.io/badge/Prisma-5.22.0-blue?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/TypeScript-5.2.2-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
</div>

## 📖 Sobre o Projeto

Backend API profissional para gerenciamento de Pokémons, desenvolvido com **NestJS** e seguindo as melhores práticas de arquitetura e segurança.

### ✨ Funcionalidades

- 🔐 **Autenticação JWT** - Sistema completo de registro e login
- 🛡️ **Segurança** - Hash de senhas com bcrypt, proteção de rotas
- 📊 **CRUD Completo** - Create, Read, Update, Delete de Pokémons
- 🎯 **Validação** - DTOs com class-validator
- 📝 **Documentação** - Swagger/OpenAPI automática
- 🔒 **Ownership** - Apenas o dono pode editar/deletar seus Pokémons
- 🗄️ **Database** - PostgreSQL com Prisma ORM
- 📱 **Type Safety** - TypeScript em todo o projeto

### 🚀 Tecnologias Utilizadas

- **Framework**: NestJS 10.0.0
- **Linguagem**: TypeScript 5.2.2
- **Database**: PostgreSQL com Prisma ORM 5.22.0
- **Autenticação**: JWT + Passport.js
- **Validação**: class-validator + class-transformer
- **Documentação**: Swagger/OpenAPI 3.0
- **Segurança**: bcryptjs para hash de senhas
- **Testes**: Jest com supertest

### 🏗️ Estrutura do Projeto

```
backend/
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
│   │   ├── pokemon.module.ts    # Configuração do módulo
│   │   └── dto/
│   │       └── pokemon.dto.ts   # DTOs de validação
│   ├── users/                   # Módulo de usuários
│   │   └── users.module.ts    # Configuração básica
│   ├── common/                  # Utilitários compartilhados
│   │   ├── guards/
│   │   │   └── jwt-auth.guard.ts  # Guard de proteção JWT
│   │   └── decorators/
│   │       └── get-user.decorator.ts  # Decorator para obter usuário
│   ├── prisma/
│   │   ├── prisma.service.ts   # Serviço Prisma
│   │   └── prisma.module.ts   # Módulo Prisma
│   ├── app.module.ts            # Módulo raiz
│   └── main.ts                 # Ponto de entrada
├── prisma/
│   ├── schema.prisma          # Schema do banco
│   ├── prisma.config.ts        # Configuração Prisma
│   └── seed.ts               # Dados iniciais
├── .env.example                # Variáveis de ambiente
├── package.json               # Dependências e scripts
├── tsconfig.json             # Configuração TypeScript
└── nest-cli.json            # Configuração Nest CLI
```

### 🔧 Instalação e Execução

1. **Clone o repositório**
   ```bash
   git clone https://github.com/inotyu/PokemonCenter.git
   cd PokemonCenter/backend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas credenciais
   ```

4. **Gere o Prisma Client**
   ```bash
   npm run prisma:generate
   ```

5. **Execute as migrações**
   ```bash
   npm run prisma:migrate
   ```

6. **Popule o banco (opcional)**
   ```bash
   npm run prisma:seed
   ```

7. **Inicie o servidor**
   ```bash
   # Desenvolvimento
   npm run start:dev
   
   # Produção
   npm run build
   npm run start:prod
   ```

### 📚 Documentação da API

Acesse a documentação interativa em:
- **Local**: http://localhost:3001/api
- **Swagger UI**: http://localhost:3001/api

### 🔗 Endpoints da API

#### Autenticação
- `POST /auth/register` - Registrar novo usuário
- `POST /auth/login` - Login e obter token JWT

#### Pokémons (Protegidos)
- `GET /pokemon` - Listar todos os Pokémons
- `GET /pokemon/:id` - Obter Pokémon por ID
- `POST /pokemon` - Criar novo Pokémon
- `PATCH /pokemon/:id` - Atualizar Pokémon (apenas dono)
- `DELETE /pokemon/:id` - Deletar Pokémon (apenas dono)

### 🛡️ Segurança Implementada

- ✅ **Hash de senhas** com bcrypt (10 rounds)
- ✅ **Tokens JWT** com expiração configurável
- ✅ **Proteção de rotas** com Guards
- ✅ **Validação de input** com class-validator
- ✅ **Ownership validation** - usuário só pode editar/deletar próprios Pokémons
- ✅ **CORS configurado** para frontend
- ✅ **Environment variables** para dados sensíveis

### 📊 Banco de Dados

**Schema PostgreSQL:**
```sql
-- Users
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pokemons
CREATE TABLE pokemons (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  level INTEGER NOT NULL,
  hp INTEGER NOT NULL,
  pokedex_number INTEGER NOT NULL,
  owner_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 🧪 Testes Automatizados

```bash
# Rodar todos os testes
npm run test

# Testes com coverage
npm run test:cov

# Testes em modo watch
npm run test:watch
```

### 🚀 Deploy

#### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Railway
```bash
# Deploy com Docker
vercel --prod
```

### 📝 Variáveis de Ambiente

```env
DATABASE_URL="postgresql://username:password@localhost:5432/pokemon_center"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=3001
```

### 🎮 Credenciais de Teste

Após executar `npm run prisma:seed`:

| Email | Senha | Tipo |
|-------|--------|------|
| ash@pokemon.com | pikachu123 | Treinador |
| oak@pokemon.com | research123 | Professor |
| misty@pokemon.com | starmie123 | Líder de Ginásio |

### 🤝 Contribuição

1. Fork o repositório
2. Crie branch para sua feature: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m "Adiciona nova funcionalidade"`
4. Push para o branch: `git push origin feature/nova-funcionalidade`
5. Abra Pull Request

### 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

<div align="center">
  <strong>🎮 Gotta Catch 'Em All! 🎮</strong>
</div>
