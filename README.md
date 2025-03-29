# 🚀 Stackronyms

Stackronyms is a fun web app that helps you generate hilarious technology-related acronyms. Whether you're brainstorming a ridiculous new stack or need an acronym-filled README, Stackronyms has you covered!

## 🎉 Features
- 🏗️ **Generate Tech Acronyms** – Create funny and absurd acronyms using popular tech stacks.
- 📜 **README Generator** – Instantly format your acronyms into a professional (or not) README.
- ⚡ **Instant Sharing** – Copy your generated acronym or just screenshot it.
- 🔄 **Dynamic Database** – Powered by **PostgreSQL** + **Drizzle ORM** for easy data handling.

## 🛠️ Tech Stack
- **Frontend:** Next.js 15, React 19, TailwindCSS 4
- **Backend:** PostgreSQL, Drizzle ORM, Neon Proxy
- **Other Tools:** TypeScript, Zod, ESLint, Motion

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/stackronyms.git  
cd stackronyms  
```  

## 2️⃣ Set Up Environment Variables
Create a `.env` file and configure your database settings:
```sh
NODE_ENV=development  
LOCAL_DATABASE_URL=postgres://user:password@localhost:5432/stackronyms  
NEON_DATABASE_URL=postgresql://stackronyms_owner:npg_XYZ123secureTOKEN@ep-random-word-abcdefg-pooler.us-region-1.aws.neon.tech/stackronyms?sslmode=require
  
```  

---

# 🏗️ Running Locally

### 1️⃣ Start Database & Proxy
```sh
docker compose up -d  
```  

### 2️⃣ Install Dependencies & Start Dev Server
```sh
npm install  
npm run dev  
```  

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

# 📦 Database Management

Run Drizzle ORM commands for migrations and schema generation:

```sh
npm run db:generate  # Generate types  
npm run db:migrate   # Apply migrations  
npm run db:studio    # Open Drizzle Studio  
```  

---

# 🌍 Deploying to Production with Neon

### 1️⃣ Create a PostgreSQL Database with Neon

1. Go to [Neon](https://neon.tech) and sign up.
2. Click **"Create a New Project"**.
3. Choose **"PostgreSQL 15"** as the database version.
4. Set a **project name** (e.g., `stackronyms-db`).
5. Once created, go to **"Connection Details"**, and copy the `DATABASE_URL`.
    - It will look like this:
      ```
      postgresql://stackronyms_owner:npg_XYZ123secureTOKEN@ep-random-word-abcdefg-pooler.us-region-1.aws.neon.tech/stackronyms?sslmode=require
      ```

### 2️⃣ Configure `.env`
Create an `.env` if it doesn't exist file and add:
```sh
NODE_ENV=production  
DATABASE_URL=${NEON_DATABASE_URL}  
```  

### 3️⃣ Apply Migrations to Neon
```sh
npm run db:migrate  
```  

### 4️⃣ Deploy the App
```sh
npm run build  
npm start  
```

---

# 🗄️ Adding Initial Data

If you want to add initial data to the Neon database, follow these steps:

1. **Open Drizzle Studio**
   ```sh
   npm run db:studio
   ```
2. **Use the SQL file**
- Open the `insert_technologies.sql` file inside the `data` folder.
- Press **Ctrl + A** to select all, then **Ctrl + C** to copy the SQL commands.
- **For Local Databases**: Paste and execute the SQL in **Drizzle Studio's** SQL Console.
- **For Neon Cloud**: Paste and run the SQL in the **Neon SQL Editor**.
  This will insert initial technology data into the database.

---

# 📖 Official Setup Guide
This project follows the **Neon + Drizzle Local** setup as described in the official guide:  
🔗 **[Neon + Drizzle Local Guide](https://neon.tech/guides/drizzle-local-vercel)**

---