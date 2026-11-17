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
│   ├── (public)/         # Landing page, login, registro e /letter/[slug] (leitura da carta)
│   ├── (private)/        # Dashboard e editor (/writeLetter, /writeLetter/[id])
│   └── api/auth/         # Rota de API do NextAuth.js
├── actions/              # Server actions (auth, CRUD de cartas, desbloqueio pelo leitor)
├── components/
│   ├── Letters/          # Editor da carta, modais de senha e leitura (envelope)
│   ├── ui/               # Componentes de UI reutilizáveis (shadcn/ui)
│   ├── layout/           # Headers e footers (público/privado)
│   ├── forms/            # Formulários de login e registro
│   └── editor/           # Editor de texto Tiptap
├── lib/                  # NextAuth, cliente Prisma, cookie de acesso à carta, utilitários
├── proxy.ts              # Proteção de rotas (redireciona quem não está logado)
├── schemas/              # Schemas de validação Zod
├── types/                # Tipos TypeScript compartilhados
├── utils/                # Slug, datas, limpeza de HTML
└── generated/prisma/     # Tipos gerados automaticamente pelo Prisma (não editar)

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

Copie `.env.example` para `.env` e preencha os valores. `AUTH_SECRET` pode ser gerado com `openssl rand -hex 32`; `DATABASE_URL` é a string de conexão do seu PostgreSQL.

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
- **Letter** — carta escrita pelo usuário, com título, texto, destinatário, senha (hash), dica, status e contagem de leitores.
- **RateLimit** — contador de tentativas por chave, usado para limitar força bruta na senha da carta, no login e no cadastro.
- **Account / Session / VerificationToken** — suporte a autenticação OAuth e gerenciamento de sessão (extensibilidade futura).

---

Feito com 💙 para G.
