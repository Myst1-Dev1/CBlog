# CBlog

**Plataforma de blog moderna construída com arquitetura de microserviços orientada a eventos.**

CBlog é uma aplicação full-stack que implementa um sistema de blog completo utilizando padrões de design escaláveis e modernos. O projeto é estruturado como um monorepo gerenciado pelo Turborepo, com backend baseado em microserviços NestJS comunicando-se via RabbitMQ e frontend Next.js com design system moderno.

---

## 🏗️ Arquitetura

### Visão Geral
```
┌─────────────────┐
│   Frontend      │
│   (Next.js)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────┐
│  API Gateway    │◄────►│  RabbitMQ    │
│  (NestJS)       │      │  (Message    │
└────────┬────────┘      │   Broker)    │
         │               └──────┬───────┘
         │                      │
         ▼                      ▼
┌────────────────────────────────────────┐
│         Microserviços (NestJS)         │
├────────────┬──────────┬────────────────┤
│ Auth       │ Posts    │ Comments       │
│ Service    │ Service  │ Service        │
├────────────┼──────────┼────────────────┤
│ Media      │ Notif.   │                │
│ Service    │ Service  │                │
└────────────┴──────────┴────────────────┘
         │
         ▼
┌─────────────────┐
│   PostgreSQL    │
│   (Database)    │
└─────────────────┘
```

### Padrões Arquiteturais
- **Event-Driven Architecture**: Comunicação assíncrona via RabbitMQ
- **API Gateway Pattern**: Ponto único de entrada para o frontend
- **Database per Service**: Cada microserviço gerencia seu próprio domínio de dados
- **WebSocket Real-time**: Notificações em tempo real via Socket.IO

---

## 📦 Estrutura do Monorepo

```
CBlog/
├── apps/
│   ├── web/                    # Frontend Next.js
│   ├── gateway-service/        # API Gateway + WebSocket
│   ├── auth-service/           # Autenticação e autorização
│   ├── posts-service/          # Gerenciamento de posts
│   ├── comments-service/       # Sistema de comentários
│   ├── notifications-service/  # Notificações em tempo real
│   └── media-service/          # Upload e processamento de mídia
├── packages/
│   ├── ui/                     # Componentes React compartilhados
│   ├── eslint-config/          # Configurações ESLint
│   └── typescript-config/      # Configurações TypeScript
└── docker-compose.yml          # Orquestração de containers
```

---

## 🛠️ Stack Tecnológica

### Backend
- **Framework**: NestJS 11.x
- **ORM**: TypeORM 0.3.x
- **Database**: PostgreSQL 15
- **Message Broker**: RabbitMQ 3.x
- **Autenticação**: JWT (Passport.js)
- **Validação**: class-validator + class-transformer

### Frontend
- **Framework**: Next.js 16.x (App Router)
- **UI/UX**: TailwindCSS 4.x + GSAP + Swiper
- **State Management**: Zustand
- **Editor**: SunEditor (WYSIWYG)
- **Real-time**: Socket.IO Client
- **HTTP Client**: Fetch API nativo

### DevOps & Tooling
- **Monorepo**: Turborepo 2.x
- **Containerização**: Docker + Docker Compose
- **Package Manager**: npm 10.x
- **TypeScript**: 5.9.x

---

## 🚀 Início Rápido

### Pré-requisitos
- **Node.js** ≥ 18
- **Docker** e **Docker Compose**
- **npm** 10.8.2+

### 1. Instalação de Dependências
```bash
npm install
```

### 2. Configuração de Ambiente
Cada microserviço possui seu próprio `.env`. Exemplo para `media-service`:
```bash
# apps/media-service/.env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Subir Ambiente Docker
```bash
# Aliases recomendados (adicionar ao .bashrc/.zshrc)
alias dup='docker compose up'
alias ddown='docker compose down'
alias dshell='docker exec -it'

# Subir todos os serviços
dup -d
```

### 4. Executar Migrações
```bash
# Acessar container do auth-service
dshell auth-service sh

# Dentro do container
npm run migration:run
```

### 5. Desenvolvimento Local (sem Docker)
```bash
# Desenvolvimento de todos os apps
npm run dev

# Desenvolvimento de app específico
npx turbo dev --filter=web
```

---

## 🐳 Gerenciamento Docker

### Serviços Disponíveis
| Serviço               | Porta  | Descrição                          |
|-----------------------|--------|------------------------------------|
| `web`                 | 3000   | Frontend Next.js                   |
| `gateway-service`     | 4011   | API Gateway + WebSocket            |
| `auth-service`        | 4012   | Autenticação                       |
| `media-service`       | 4013   | Upload de mídia                    |
| `posts-service`       | 4014   | CRUD de posts                      |
| `comments-service`    | 4015   | Sistema de comentários             |
| `notifications-service` | 4016 | Notificações                       |
| `postgres`            | 5432   | Banco de dados                     |
| `rabbitmq`            | 5672   | Message broker                     |
| `rabbitmq-management` | 15672  | Interface de gerenciamento         |

### Comandos Úteis
```bash
# Logs de um serviço específico
docker compose logs -f auth-service

# Rebuild de um serviço
docker compose up -d --build auth-service

# Acessar shell de um container
dshell auth-service sh

# Parar todos os serviços
ddown

# Limpar volumes (⚠️ apaga dados do banco)
docker compose down -v
```

---

## 📝 Scripts Disponíveis

### Raiz do Projeto
```bash
npm run dev          # Inicia todos os apps em modo desenvolvimento
npm run build        # Build de produção de todos os apps
npm run lint         # Executa linting em todos os apps
npm run format       # Formata código com Prettier
npm run check-types  # Verifica tipos TypeScript
```

### Por Aplicação
```bash
# Executar comando em app específico
npx turbo dev --filter=web
npx turbo build --filter=auth-service
npx turbo lint --filter=gateway-service
```

---

## 🔐 Autenticação

O `auth-service` implementa autenticação JWT com os seguintes endpoints:

```typescript
POST /auth/register  // Registro de usuário
POST /auth/login     // Login (retorna access_token)
GET  /auth/profile   // Perfil do usuário autenticado (requer JWT)
```

**Fluxo de Autenticação:**
1. Cliente faz login via Gateway
2. Gateway encaminha para Auth Service via RabbitMQ
3. Auth Service valida credenciais e retorna JWT
4. Cliente inclui token em `Authorization: Bearer <token>`

---

## 📡 Comunicação entre Serviços

### Filas RabbitMQ
- `auth_queue`: Operações de autenticação
- `posts_queue`: CRUD de posts
- `comments_queue`: Gerenciamento de comentários
- `notifications_queue`: Envio de notificações
- `media_queue`: Processamento de uploads

### Padrão Request-Response
```typescript
// Gateway envia mensagem
this.client.send('create_post', { title, content, userId });

// Posts Service processa
@MessagePattern('create_post')
async createPost(data: CreatePostDto) {
  return this.postsService.create(data);
}
```

---

## 🧪 Testes

```bash
# Testes unitários (auth-service como exemplo)
cd apps/auth-service
npm run test

# Testes com coverage
npm run test:cov

# Testes em modo watch
npm run test:watch
```

---

## 🗄️ Migrações de Banco de Dados

```bash
# Gerar nova migração
npm run migration:generate

# Executar migrações (desenvolvimento)
npm run migration:run:dev

# Executar migrações (produção - dentro do container)
npm run migration:run
```

---

## 🎨 Frontend (Web)

### Tecnologias de UI
- **Animações**: GSAP + @gsap/react
- **Carrosséis**: Swiper 12.x
- **Editor Rico**: SunEditor
- **Ícones**: react-icons
- **Notificações**: react-toastify

### Estrutura
```
apps/web/
├── app/              # App Router (Next.js 16)
├── components/       # Componentes React
├── hooks/            # Custom hooks
├── actions/          # Server Actions
└── utils/            # Funções utilitárias
```

---

## 🔧 Troubleshooting

### Erro: "Cannot connect to RabbitMQ"
```bash
# Verificar se RabbitMQ está rodando
docker compose ps rabbitmq

# Reiniciar RabbitMQ
docker compose restart rabbitmq
```

### Erro: "Database connection failed"
```bash
# Verificar logs do PostgreSQL
docker compose logs postgres

# Verificar variáveis de ambiente
echo $DATABASE_URI
```

### Porta já em uso
```bash
# Identificar processo usando a porta
netstat -ano | findstr :4011  # Windows
lsof -i :4011                 # Linux/Mac

# Alterar porta no docker-compose.yml
```

---

## 📚 Recursos Adicionais

- [Documentação Turborepo](https://turborepo.dev/docs)
- [NestJS Microservices](https://docs.nestjs.com/microservices/basics)
- [Next.js App Router](https://nextjs.org/docs/app)
- [RabbitMQ Tutorials](https://www.rabbitmq.com/tutorials)
- [TypeORM Migrations](https://typeorm.io/migrations)

---

## 📄 Licença

Este projeto é privado e destinado a fins educacionais.

---

## 👥 Contribuindo

Este é um projeto acadêmico. Para contribuições:
1. Crie uma branch a partir de `main`
2. Implemente suas mudanças
3. Garanta que os testes passem
4. Abra um Pull Request com descrição detalhada
