# xSaikiz — Game Developer Portfolio

A modern, futuristic game developer portfolio built with **Vite + React**, featuring a Solo Leveling / dark fantasy aesthetic with neon glow effects, glassmorphism, and smooth animations.

![Portfolio Preview](screenshot.png)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone <repo-url> portfolio
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/`.

### Building for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

## 📁 Project Structure

```
src/
 ├── components/
 │    ├── Navbar/          # Sticky navigation with mobile menu
 │    ├── Hero/            # Full-viewport hero section
 │    ├── ProjectCard/     # Portfolio project card
 │    ├── GameCard/        # Live Roblox game card
 │    ├── ContactForm/     # Contact form with validation
 │    └── UI/              # Reusable UI components
 │         ├── Button
 │         ├── SectionTitle
 │         ├── SkillBar
 │         ├── StatCard
 │         ├── PricingCard
 │         ├── FilterBar
 │         ├── LoadingSpinner
 │         ├── ScrollReveal
 │         └── PageTransition
 │
 ├── pages/
 │    ├── Profile.jsx      # Home / profile page
 │    ├── Portfolio.jsx     # Projects showcase
 │    ├── Pricing.jsx       # Service pricing tiers
 │    ├── Games.jsx         # Live Roblox games
 │    └── Contact.jsx       # Contact information & form
 │
 ├── services/
 │    └── robloxAPI.js      # Roblox API service (mock data)
 │
 ├── data/
 │    ├── profile.js        # Developer profile data
 │    ├── projects.js       # Portfolio projects
 │    └── pricing.js        # Pricing tiers
 │
 ├── assets/
 │    └── images/           # Generated images
 │
 ├── App.jsx               # App with routing
 ├── main.jsx              # Entry point
 └── index.css             # Global design system
```

## 🎨 Customization

### Profile Data
Edit `src/data/profile.js` to update your name, bio, skills, stats, and social links.

### Projects
Edit `src/data/projects.js` to add/remove/modify portfolio projects.

### Pricing
Edit `src/data/pricing.js` to adjust service pricing tiers.

### Roblox Games
Edit `src/services/robloxAPI.js` to add your actual games or connect to a backend proxy.

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repo to [Vercel](https://vercel.com)
3. Vercel will auto-detect the Vite config
4. Deploy!

The `vercel.json` is already configured for SPA routing.

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
VITE_ROBLOX_API_BASE=https://games.roblox.com
VITE_CONTACT_EMAIL=your@email.com
```

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 18 + Vite |
| Routing | react-router-dom v6 |
| Animations | Framer Motion + CSS |
| Scroll Effects | react-intersection-observer |
| Styling | Vanilla CSS + Custom Properties |
| Fonts | Google Fonts (Orbitron + Inter) |
| Deployment | Vercel |

## 📝 License

MIT
