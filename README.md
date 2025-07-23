# 🧠 SmartScribe - AI PDF Summarizer

SmartScribe is a modern web application that allows users to upload PDF files, automatically summarize them using AI (Gemini or OpenAI), and store/view/download their summaries with an intuitive interface. The project is built with **Next.js 15 App Router**, **TypeScript**, and integrates with **Clerk authentication**, **MongoDB**, and **TailwindCSS + ShadCN UI**.

## 🚀 Features

- 📥 Upload PDF files and extract text
- 🤖 Summarize text using AI (Gemini/OpenAI)
- 🧾 View summaries card-by-card
- 📤 Download summary as a PDF
- 🗑️ Delete summaries with confirmation
- 🔐 User authentication via Clerk
- 🌓 Light & Dark mode support
- 🎨 Beautiful UI with ShadCN + TailwindCSS
- ⚡ Animations with Framer Motion

---

## 🧰 Tech Stack

| Tech             | Description                            |
|------------------|----------------------------------------|
| Next.js 15       | React-based full-stack framework       |
| TypeScript       | Type-safe JavaScript                   |
| Clerk            | Auth management (sign in, sign up)     |
| MongoDB + Prisma | Database & ORM                         |
| pdf-lib          | Generate downloadable PDF summaries    |
| ShadCN UI        | UI components                          |
| TailwindCSS      | Styling framework                      |
| Framer Motion    | Animations                             |

---

## 📸 Screenshots

> (comming soon...)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **npm/pnpm** package manager
- **Git** version control

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/smartscribe.git
cd smartscribe
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env.local
```

4. **Configure environment variables** (see Environment Variables section)

5. **Database setup**
```bash
npx prisma generate
npx prisma db push
```

6. **Run development server**
```bash
pnpm dev
# or
npm run dev
```

7. **Open your browser**
```
http://localhost:3000
```

## 🔧 Environment Variables

Create a `.env` file in your project root:

```env
# Database
DATABASE_URL="your-mongodb-url"


