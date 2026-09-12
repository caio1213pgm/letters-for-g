# Letters for G 💌

Aplicação web full-stack para criação e gerenciamento de cartas, com editor de texto rico, autenticação de usuários e persistência em banco de dados PostgreSQL.

## ✨ Funcionalidades

- **Autenticação de usuários** — cadastro e login via credenciais (e-mail/senha), com senhas armazenadas de forma segura e sessões baseadas em JWT.
- **Dashboard privado** — área autenticada onde o usuário visualiza suas cartas em formato de cards.
- **Editor de texto rico** — criação e edição de cartas com o editor [Tiptap](https://tiptap.dev/), incluindo suporte a formatação de texto e cabeçalhos.
- **Validação de formulários** — formulários validados com Zod + React Hook Form.
- **Rotas protegidas** — separação clara entre rotas públicas e privadas via route groups do Next.js App Router.

## 🛠️ Tecnologias

| Categoria       | Tecnologia                                        |
| --------------- | ------------------------------------------------- |
| Framework       | [Next.js](https://nextjs.org/) 16 (App Router)    |
| Linguagem       | TypeScript                                        |
| UI / Estilo     | Tailwind CSS 4 + shadcn/ui + Radix UI             |
| Editor de texto | Tiptap 3                                          |
| Autenticação    | NextAuth.js 5 (beta) — Credentials Provider + JWT |
| Banco de dados  | PostgreSQL                                        |
| ORM             | Prisma 7 (com `@prisma/adapter-pg`)               |
| Formulários     | React Hook Form + Zod                             |

## 📂 Estrutura do projeto

```
src/
├── app/
│   ├── (public)/        # Rotas públicas: landing page, login, registro
│   ├── (private)/       # Rotas privadas: dashboard (requer autenticação)
│   └── api/auth/         # Rota de API do NextAuth.js
├── actions/              # Server actions (login, registro, busca de cartas)
├── components/
│   ├── ui/               # Componentes de UI reutilizáveis (shadcn/ui)
│   ├── layout/            # Headers e footers (público/privado)
│   ├── forms/              # Formulários de login e registro
│   └── editor/            # Editor de texto Tiptap
├── lib/                  # Configuração do NextAuth, cliente Prisma, utilitários
├── schemas/              # Schemas de validação Zod
├── types/                # Tipos TypeScript compartilhados
└── generated/prisma/      # Tipos gerados automaticamente pelo Prisma (não editar)

prisma/
├── schema.prisma         # Definição do banco de dados (User, Letter, Account, Session...)
└── migrations/           # Histórico de migrações
```

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js
- Um banco de dados PostgreSQL

### 1. Instalar as dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias para autenticação e conexão com o banco de dados. Consulte um mantenedor do projeto ou a documentação interna para obter os valores.

### 3. Rodar as migrações do banco de dados

```bash
npx prisma migrate dev
```

### 4. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## 📜 Scripts disponíveis

```bash
npm run dev              # Inicia o servidor de desenvolvimento
npm run build            # Gera o build de produção
npm start                # Roda o build de produção
npm run lint              # Executa o ESLint
```

### Comandos úteis do Prisma

```bash
npx prisma migrate dev --name <nome_da_migração>  # Cria e roda uma nova migração
npx prisma migrate deploy                          # Aplica migrações pendentes (CI/produção)
npx prisma generate                                # Regenera os tipos do Prisma
npx prisma studio                                  # Abre a interface visual do Prisma Studio
```

## 🗄️ Modelo de dados

- **User** — dados do usuário, com relação para credenciais, contas OAuth, sessões e cartas.
- **Credential** — hash da senha do usuário (autenticação por credenciais).
- **Letter** — carta escrita pelo usuário, com título, texto, status e contagem de leitores.
- **Account / Session / VerificationToken** — suporte a autenticação OAuth e gerenciamento de sessão (extensibilidade futura).

---

Feito com 💙 para G.
