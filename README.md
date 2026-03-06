# 🎮 Pokémon Center

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.2.1-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5.0.0-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
</div>

## 📖 Sobre o Projeto

O **Pokémon Center** é uma aplicação web moderna para gerenciamento de Pokémon, desenvolvida com as melhores tecnologias do mercado. O sistema permite que treinadores Pokémon cadastrem, editem e gerenciem seus Pokémons de forma intuitiva e responsiva.

### ✨ Funcionalidades

- 🔐 **Sistema de Autenticação** - Login seguro com múltiplos usuários de teste
- 📱 **Design Responsivo** - Experiência perfeita em mobile, tablet e desktop
- 🎯 **Filtros Avançados** - Busca por nome, número da Pokédex e tipo
- ➕ **CRUD Completo** - Adicione, edite e remova Pokémons
- 📊 **Painel de Estatísticas** - Visualização de dados em tempo real
- 🎨 **Interface Moderna** - UI/UX inspirada no universo Pokémon
- 🍔 **Menu Mobile** - Navegação intuitiva com hamburger menu

### 🚀 Tecnologias Utilizadas

- **Frontend**: Next.js 15.2.1 com React 19
- **Linguagem**: TypeScript para type safety
- **Styling**: Tailwind CSS com design system customizado
- **Ícones**: Lucide React
- **Estado**: React Hooks com Context API
- **Build**: Vite/Next.js optimized builds

### 🎨 Design System

O projeto utiliza um design system inspirado no universo Pokémon:

- 🎨 **Cores Temáticas**: Azul Pokémon (#3B5BA7), Amarelo (#FFCB05)
- 📱 **Breakpoints**: Mobile-first com 5 pontos de quebra
- 🎯 **Componentes**: Biblioteca UI reutilizável e consistente
- ✨ **Animações**: Transições suaves e micro-interações

### 📱 Responsividade

A aplicação foi desenvolvida com mobile-first approach:

- 📱 **Mobile** (< 768px): Layout otimizado para toque
- 📱 **Tablet** (768px - 1024px): Layout adaptativo
- 🖥️ **Desktop** (> 1024px): Experiência completa com sidebar
- 🖥️ **Large Desktop** (> 1536px): Grid otimizado para telas grandes

### 🏗️ Estrutura do Projeto

```
pokemon-center/
├── app/                    # Páginas Next.js App Router
│   ├── dashboard/          # Dashboard principal
│   ├── login/             # Página de login
│   └── layout.tsx         # Layout raiz
├── components/             # Componentes reutilizáveis
│   ├── ui/               # Componentes base (Button, Input, Modal)
│   ├── layout/           # Componentes de layout (Sidebar, MobileMenu)
│   └── pokemon/         # Componentes específicos de Pokémon
├── hooks/                # React Hooks customizados
├── lib/                  # Utilitários e configurações
├── types/                # Definições TypeScript
└── data/                 # Dados mockados para desenvolvimento
```

### 🔧 Instalação e Execução

1. **Clone o repositório**
   ```bash
   git clone https://github.com/inotyu/PokemonCenter.git
   cd PokemonCenter
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   ```
   http://localhost:3000
   ```

### 🎮 Credenciais de Teste

Use estas credenciais para explorar a aplicação:

| Email | Senha | Tipo |
|-------|--------|------|
| ash@pokemon.com | pikachu123 | Treinador |
| oak@pokemon.com | research123 | Professor |
| misty@pokemon.com | starmie123 | Líder de Ginásio |

### 🚀 Deploy

A aplicação está otimizada para deploy em plataformas modernas:

- **Vercel** (Recomendado): Deploy automático com `vercel`
- **Netlify**: Build estático com `npm run build`
- **Railway**: Container Docker com `npm start`

### 📱 Demonstração

- 🌐 **Live Demo**: [Em breve]
- 📱 **Mobile First**: Teste no seu celular
- 🎨 **Design System**: Inspiração Pokémon

### 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### 📝 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

### 🙏 Agradecimentos

- **Pokémon Company** - Pelos personagens e universo inspirador
- **Next.js Team** - Pela framework incrível
- **Tailwind CSS** - Pelo CSS utility-first
- **Comunidade** - Pelo apoio e feedback constante

---

<div align="center">
  <strong>🎮 Gotta Catch 'Em All! 🎮</strong>
</div>
