# 📝 Medium Blog v2

A modern **blogging platform** built using **serverless architecture**, **PostgreSQL**, **Prisma ORM**, and the blazing-fast **Hono.js** framework. Backend is deployed on **Cloudflare Workers** and powered by **Prisma Accelerate** for optimized performance. The frontend is crafted in **TypeScript + React**.

> Powered by [@godara_29/medium-blog-v2](https://www.npmjs.com/package/@godara_29/medium-blog-v2)

---

## 🚀 Live API

**Backend URL:**  
[https://backend.mediummmmmmmmmmmm.workers.dev/](https://backend.mediummmmmmmmmmmm.workers.dev/)

---

## 🧰 Tech Stack

### Backend
- 🧠 [Hono.js](https://hono.dev/)
- 🧬 [Prisma ORM](https://www.prisma.io/)
- ⚡ [Prisma Accelerate](https://www.prisma.io/accelerate)
- 🌐 [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- 🗃️ PostgreSQL
- 📦 [@godara_29/medium-blog-v2](https://www.npmjs.com/package/@godara_29/medium-blog-v2) (Custom NPM Package)

### Frontend
- ⚛️ React
- 🧑‍💻 TypeScript
- 🪄 TailwindCSS (if used)

---

## 📦 Installation

### 1. setup backend Repository

```bash
git clone https://github.com/your-username/medium-blog-v2.git
cd medium-blog-v2
DATABASE_URL=postgresql://your-user:your-pass@localhost:5432/your-db
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```
### 2. setup frontend Repository

```bash
npm i
npm run dev
```



