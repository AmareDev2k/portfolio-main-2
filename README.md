<div align="center">

# ✦ ARAVINDA AMARASINGHA ✦
### Full-Stack Developer · Creative Builder · Open Source Enthusiast

[![Portfolio](https://img.shields.io/badge/🌐_Live_Portfolio-000000?style=for-the-badge&logoColor=white)](https://aravinda-amarasingha.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AmareDev2k)

---

```
██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗
██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝
```

</div>

---

## 🎯 What Is This?

> A **sleek, modern, full-stack portfolio website** built to make an impression. Dark glassmorphism aesthetic, buttery-smooth animations, a contact form backed by a real API — this isn't your average portfolio template.

Built with **React** on the front, **FastAPI** on the back, and **MongoDB** in the middle. Deployed and live. ⚡

---

## ✨ Highlights

| Feature | Description |
|---|---|
| 🌑 **Dark Glassmorphism** | Deep black theme with frosted-glass UI elements |
| 📱 **Fully Responsive** | Looks great on phones, tablets, and desktops |
| 🎨 **Project Showcase** | Card-based layout for projects with tech tags |
| 🧠 **Skills Grid** | Organized categories for easy scanning |
| 📬 **Live Contact Form** | Messages go to a real MongoDB database via FastAPI |
| 🔗 **Social Links** | GitHub, LinkedIn, and email all wired up |
| 🎞️ **Animations** | Smooth transitions, hover effects, scroll behavior |

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

### Backend
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

### Tooling & Deploy
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white)

</div>

---

## 📁 Project Structure

```
portfolio-main-2/
├── 📂 src/
│   ├── 📂 pages/
│   │   └── Home.jsx           # Main portfolio page
│   ├── 📂 components/
│   │   ├── ContactForm.jsx    # Contact form component
│   │   └── ui/                # Reusable UI components
│   ├── App.js
│   └── mock.js                # 👈 Edit this to customize content
│
├── 📂 backend/
│   ├── server.py              # FastAPI server + contact endpoint
│   └── requirements.txt
│
├── 📂 assets/                 # Images & static files
├── 📂 public/
├── .env                       # Environment variables
├── tailwind.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v14+
- **Python** v3.8+
- **MongoDB** (local or Atlas)
- **Yarn** (recommended) or npm

---

### ⚡ Frontend

```bash
# 1. Clone the repo
git clone https://github.com/AmareDev2k/portfolio-main-2.git
cd portfolio-main-2

# 2. Install dependencies
yarn install

# 3. Start dev server
yarn start
```

> 🟢 Runs at `http://localhost:3000`

---

### 🐍 Backend

```bash
# 1. Go to backend folder
cd backend

# 2. Install Python dependencies
pip install -r requirements.txt

# 3. Set up environment
cp .env.example .env
# Then fill in your values 👇
```

**.env**
```env
MONGO_URL=mongodb+srv://user:password@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=portfolio
CORS_ORIGINS=http://localhost:3000
```

```bash
# 4. Start the server
uvicorn server:app --reload
```

> 🟢 API runs at `http://localhost:8000`

---

## 🎨 Make It Yours

All personal content lives in **`src/mock.js`** — just edit and you're done.

```js
// 👤 Your Info
export const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  tagline: "Your tagline",
  about: "Tell your story here.",
  email: "you@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername"
};

// 🗂️ Projects
export const projects = [
  {
    id: 1,
    title: "Awesome Project",
    description: "What it does and why it's cool.",
    technologies: ["React", "Node.js", "MongoDB"],
    category: "Full Stack",
    link: "https://your-project.com"
  }
];

// 🧠 Skills
export const skills = [
  {
    category: "Frontend",
    items: ["React", "Tailwind CSS", "TypeScript"]
  },
  {
    category: "Backend",
    items: ["FastAPI", "Node.js", "MongoDB"]
  }
];
```

---

## 📬 Contact Form — How It Works

When someone submits the contact form, here's what happens:

```
User fills form
      ↓
React sends POST to /api/contact
      ↓
FastAPI validates & saves to MongoDB
      ↓
Message stored with timestamp + UUID
      ↓
You get the message! 🎉
```

Each message stores: `name` · `email` · `subject` · `message` · `timestamp` · `id`

---

## 🌐 Deployment

### Frontend → Vercel

```bash
# Option 1: Auto-deploy via GitHub
# Just push to main, Vercel handles the rest

# Option 2: CLI
npm i -g vercel
vercel --prod
```

### Backend → Railway / Render / Heroku

1. Push to GitHub
2. Connect your repo to the platform
3. Set environment variables:
   - `MONGO_URL`
   - `DB_NAME`
   - `CORS_ORIGINS` ← set to your Vercel URL

---

## 🎨 Color Palette

```
Background   ████  #0a0a0a    (Deep black)
Surface      ████  rgba(255,255,255,0.05)  (Glassmorphism)
Text         ████  #ffffff    (Pure white)
Muted        ████  #a0a0a0    (Soft gray)
Accent       ████  #ffffff    (White highlights)
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `yarn start` | Start dev server |
| `yarn build` | Production build |
| `yarn test` | Run test suite |
| `python server.py` | Start FastAPI backend |
| `uvicorn server:app --reload` | Backend with hot reload |

---

## 🌍 Browser Support

✅ Chrome &nbsp; ✅ Firefox &nbsp; ✅ Safari &nbsp; ✅ Edge &nbsp; ✅ Mobile

---

## 📄 License

This project is open source under the **MIT License** — fork it, hack it, make it yours.

---

## 🤝 Contributing

Got ideas to improve this? PRs are welcome!

```bash
git checkout -b feature/cool-idea
git commit -m "feat: add cool idea"
git push origin feature/cool-idea
# Open a PR 🚀
```

---

<div align="center">

**Made with ❤️ by [Aravinda Amarasingha](https://aravinda-amarasingha.vercel.app/)**

⭐ Star this repo if it helped you · 🍴 Fork it to build your own

</div>
