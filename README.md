# 🛒 E-commerce Project

Este projeto utiliza [NestJS](https://nestjs.com/) e [Prisma](https://www.prisma.io/) para desenvolver um sistema de e-commerce escalável e eficiente.

---

## 📋 Requisitos

Antes de começar, certifique-se de que as versões das ferramentas estão de acordo com as da sua máquina.

`💡 OBS: esse projeto de E-commerce foi executado e testado com as versões citadas abaixo.`

- **Node.js** (v20 ou superior) 🟢
- **NPM** (v10 ou superior) 📦
- **Prisma** (v6.0.0) 🔧
- **Supabase** ☁️

---

## 🚀 Instalação

1. **Clone o repositório para sua máquina local**:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd e-commerce
   ```

2. **Instale as dependências do projeto**:

   Com NPM:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:

   Renomeie o arquivo `.env.example` para `.env` e configure as variáveis conforme suas necessidades:

   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/ecommerce"
   DIRECT_URL="postgresql://usuario:senha@localhost:5432/ecommerce"
   ```

4. **Configure o Prisma**:

   - Gere os esquemas do Prisma:

     ```bash
     npx prisma generate
     ```

   - Realize a migração para criar as tabelas no banco de dados:

     ```bash
     npx prisma db push
     ```

---

## ▶️ Execução

Para iniciar o projeto, use:

Com NPM:
```bash
npm run start
```

🔗 O servidor será iniciado em `http://localhost:3000` por padrão.

---

### ✅ Testes

Para rodar os testes:

```bash
npm run test
```

---

## 🗄️ Banco de Dados

O Prisma está configurado para usar o PostgreSQL. Certifique-se de que o banco de dados esteja configurado e rodando antes de iniciar o projeto.

Para abrir o cliente do Prisma Studio e visualizar os dados:

```bash
npx prisma studio
```

🌟 **Dica**: Use o Prisma Studio para inspecionar e editar dados facilmente! 🖥️

