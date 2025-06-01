# Node + React Starter Project

Este projeto é um **template inicial completo** para aplicações full stack com:

- ⚙️ **Backend**: Node.js + Fastify + TypeScript + Prisma
- 💻 **Frontend**: React.js + Vite + Axios + TypeScript
- 🐘 **Banco de dados**: PostgreSQL via Docker Compose

---

## 📁 Estrutura do Projeto

```
my-starter-app/
├── back/        # Backend (Fastify, Prisma, etc)
├── front/       # Frontend (React, Vite, etc)
├── docker-compose.yml
```

---

## 🚀 Instruções de uso

### 1. Clonar e instalar
```bash
cd back
npm install

cd ../front
npm install
```

### 2. Subir banco de dados via Docker
```bash
cd ..
docker-compose up -d
```

---

## 🔐 Configuração do .env (Prisma)

Dentro da pasta `back/`, o Prisma utiliza o arquivo `.env` para ler a URL de conexão com o banco.

### Exemplo:
```env
DATABASE_URL="postgresql://dev:dev@localhost:5432/myapp"
```

> Essa URL já funciona com o banco do `docker-compose.yml`, mas você pode alterar usuário, senha ou nome do banco se quiser.

---

## 🧬 Configurar e rodar Prisma

### 1. Criar o cliente Prisma (com a primeira migration)
```bash
cd back
npx prisma migrate dev --name init
```

### 2. Ver o banco de dados com interface visual:
```bash
npx prisma studio
```

### 3. Atualizar o cliente Prisma (após mudanças no schema)
```bash
npx prisma generate
```

---

## ▶️ Rodar projeto

### Backend:
```bash
cd back
npm run dev
```

### Frontend:
```bash
cd front
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Funcionalidade inicial

- O frontend consome a rota `/health` do backend
- Toda requisição registra no banco o resultado do healthcheck (tabela `HealthLog`)
- Apenas o último log é mantido (os anteriores são apagados a cada nova requisição)
- O frontend exibe o status e a data da última verificação

---

## 🛠️ Tecnologias utilizadas

### Backend:
- Fastify
- TypeScript
- Prisma ORM
- PostgreSQL (Docker)

### Frontend:
- React.js
- Vite
- Axios
- TypeScript

---

## 📦 Scripts úteis

### Backend:
```bash
npm run dev            # Rodar Fastify com ts-node-dev
npx prisma studio      # Abrir visualização do banco
npx prisma migrate dev # Gerar migrations
```

### Frontend:
```bash
npm run dev            # Rodar Vite em localhost:5173
npm run build          # Gerar build
npm run preview        # Servir build gerado
```

---

## 📥 Extensões recomendadas (VS Code)

- ESLint
- Prettier
- Prisma
- React Snippets
- GitLens
- Docker
- Path Intellisense

---

Feito com 💻 para acelerar seus futuros projetos.

Se quiser adicionar autenticação, upload, uploads com S3, CI/CD ou deploy, esse template já está pronto pra escalar.
