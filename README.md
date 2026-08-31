# MoSPI Competency Intelligence & iGOT Karmayogi Learning Platform 🚀
### Smart India Hackathon (SIH) Solution — Problem Statement 26101
**Ministry of Statistics & Programme Implementation (MoSPI)**

---

## 📌 Overview

Officials in India's **Official Statistical System (OSS)** — such as Junior Statistical Officers (JSO), Senior System Analysts (SSA), and Deputy Directors General (DDG) — require targeted upskilling across statistical, technical, digital governance, and behavioural domain competencies.

This platform automates **competency assessment**, **role-based skill-gap analysis**, **AI-driven quiz evaluation**, and **direct course recommendations synchronized with the official iGOT Karmayogi learning portal** ([igotkarmayogi.gov.in](https://igotkarmayogi.gov.in/)).

---

## Key Features

1. **Competency Profile & Skill Gap Engine**:
   - Compares employee current proficiency levels against role target requirement vectors.
   - Computes weighted readiness match percentages and identifies high/medium skill deltas.

2. **iGOT Karmayogi Course Catalog Integration**:
   - Courses mapped to specific competency gaps.
   - **Direct Redirection**: Clicking courses opens the official course page on [iGOT Karmayogi](https://igotkarmayogi.gov.in/).
   - Simulated progress & completion telemetry syncing.

3. **AI Competency Assessment Studio (RAG + LLM)**:
   - Generates interactive multiple-choice assessment quizzes from official MoSPI statistical manuals and handbooks.
   - Calculates topic accuracy breakdown and awards skill level upgrades upon passing.

4. **NSSTA Administrator Governance Portal**:
   - Departmental competency heatmap matrix across National Accounts, Field Operations, Economic Statistics, Price Statistics, and IT divisions.
   - Role requirement vector manager & officer directory.

5. **Multi-Persona Dual Authentication**:
   - Statistical Officer vs. NSSTA Admin portals with user switch credentials verification.
   - Light / Dark theme support.

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS (Clean Slate / Zinc Engineering Design System)
- **Icons & Visuals**: Lucide React
- **Data Visualization**: Recharts (Competency Radar & Skill Delta Bar Charts)
- **Effects**: Canvas Confetti

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn`

### Installation & Setup

1. **Clone the Repository**:
   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd SmartEducaiton
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📁 Repository Directory Structure

```
SmartEducaiton/
├── public/                 # Static assets & icons
├── src/
│   ├── components/
│   │   ├── admin/          # Admin Governance & Skill Heatmap Matrix
│   │   ├── auth/           # Login Portal & User Switch Credentials Modal
│   │   ├── common/         # Header Navigation & iGOT Sync Modal
│   │   └── learner/        # Radar View, iGOT Catalog, AI Quiz Assessor
│   ├── data/               # Taxonomy, Mock Personas, Courses, Manuals
│   ├── services/           # Skill Gap Engine & RAG AI Assessment Service
│   ├── types/              # TypeScript Type Interfaces & Models
│   ├── App.tsx             # Root Application Container
│   ├── index.css           # Engineering UI Design System Tokens
│   └── main.tsx            # Entry Point
├── .gitignore              # Ignored files (node_modules, dist, temp)
├── index.html              # HTML Root
├── package.json            # Dependencies & Scripts
├── tsconfig.json           # TypeScript Compiler Config
└── vite.config.ts          # Vite Build Configuration
```

---

## 📜 License
Developed for Smart India Hackathon (SIH 2024) — Ministry of Statistics & Programme Implementation (MoSPI).
