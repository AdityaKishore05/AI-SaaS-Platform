# Deployment Guide

The best place to deploy your Next.js AI SaaS Platform is **Vercel**. It is the creators of Next.js and offers the best performance and developer experience.

## ⚠️ Important: Database Migration
Your project currently uses **SQLite** (`file:./db.sqlite`). SQLite is a file-based database and **does not work** on serverless platforms like Vercel because the file system is not persistent (your data would disappear after every request).

Since we disabled the History feature, your app is mostly stateless, but the code still initializes the database. To deploy successfully and future-proof your app, you should switch to a hosted **Postgres** database.

### Recommended Stack
- **Frontend/Backend**: [Vercel](https://vercel.com) (Free Hobby Tier)
- **Database**: [Neon](https://neon.tech) or [Supabase](https://supabase.com) (Free Tier Postgres)

---

## Step-by-Step Deployment

### 1. Set up a Database (Neon)
1.  Go to [Neon.tech](https://neon.tech) and sign up.
2.  Create a new project.
3.  Copy the **Connection String** (it looks like `postgres://user:pass@...`).

### 2. Update Your Code for Postgres
I can help you do this automatically, but here is what needs to change:
- Update `prisma/schema.prisma` to use `postgresql` provider.
- Update `.env` with your new `DATABASE_URL`.

### 3. Push to GitHub
1.  Create a new repository on GitHub.
2.  Push your code:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin <your-repo-url>
    git push -u origin main
    ```

### 4. Deploy to Vercel
1.  Go to [Vercel Dashboard](https://vercel.com/new).
2.  Import your GitHub repository.
3.  **Environment Variables**: Add the following in the Vercel project settings:
    - `DATABASE_URL`: (Your Neon connection string)
    - `GOOGLE_AI_KEY`: (Your Gemini API Key)
    - `NEXTAUTH_SECRET`: (Generate one using `openssl rand -base64 32`)
    - `NEXTAUTH_URL`: `https://your-project.vercel.app` (after deployment) or `http://localhost:3000` for now.
4.  Click **Deploy**.

## Alternative: "Stateless" Deployment (Not Recommended)
If you absolutely do not want to set up a database right now, we can try to strip out all database dependencies from the code so it runs purely as a frontend + API wrapper. This involves removing Prisma entirely.

**Recommendation**: Go with **Vercel + Neon**. It's free, robust, and allows you to re-enable features like History and User Accounts later.
