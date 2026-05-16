TypeRush.io ⚡
> A real-time multiplayer typing competition platform with live races, dynamic leaderboards, and competitive game modes.
![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen?style=for-the-badge)
![GitHub](https://img.shields.io/badge/GitHub-Source%20Code-black?style=for-the-badge&logo=github)
[![Tech](https://img.shields.io/badge/Stack-React%20%7C%20Node.js%20%7C%20Socket.IO-blue?style=for-the-badge)]()
---
📸 Preview
> _Add a screenshot or GIF of the game in action here_
> Tip: Record a short screen capture of a live race and upload it as a GIF
---
🎯 What is TypeRush?
TypeRush is a real-time multiplayer typing game where players compete in live races, track their WPM and accuracy, and climb leaderboards — all in the browser, no download needed.
Built entirely from scratch using React, Node.js, and Socket.IO, with a cyberpunk-inspired UI and multiple unique game modes.
→ Play it live here
---
✨ Features
⚡ Real-time multiplayer races — compete live with other players via Socket.IO
📊 Live WPM, Accuracy & Error tracking per keystroke
🎮 5 unique game modes:
🏃 Random Rush — speed-focused typing challenges
🔁 Mirror Mode — words appear reversed
🧠 Memory Mode — characters disappear as you type
🎧 Echo Mode — rhythm-based typing challenge
🧪 Practice Mode — adjustable difficulty for focused training
🏆 Dynamic leaderboards with session-based rankings
🌙 Cyberpunk-themed responsive UI
📱 Mobile-friendly layout
---
🛠️ Tech Stack
Layer	Technology
Frontend	React.js, Vite, Tailwind CSS
State Management	Zustand
Backend	Node.js, Express.js
Real-Time	Socket.IO, WebSockets
Database	MongoDB
Deployment	Vercel (frontend), Render (backend)
HTTP Client	Axios
Routing	React Router DOM
---
🏗️ Architecture
```
TypeRush/
├── frontend/
│   ├── src/
│   │   ├── components/     # UI components (race track, keyboard, leaderboard)
│   │   ├── pages/          # Route pages (home, lobby, game, results)
│   │   ├── store/          # Zustand state management
│   │   └── socket/         # Socket.IO client handlers
│   └── public/
│
└── backend/
    ├── socket/             # Socket.IO event handlers (room, race, score)
    ├── utils/              # Game logic helpers
    └── server.js           # Express + Socket.IO server entry
```
---
🚀 Run Locally
Prerequisites
Node.js v18+
MongoDB (local or Atlas)
Frontend Setup
```bash
git clone https://github.com/AkhilRasamalla/typerushgame-frontend.git
cd typerushgame-frontend
npm install
```
Create `.env` in the frontend root:
```env
VITE_BACKEND_URL=http://localhost:3000
```
```bash
npm run dev
```
Backend Setup
```bash
git clone https://github.com/AkhilRasamalla/typenova-backend.git
cd typenova-backend
npm install
npm start
```
---
🔌 Key Technical Decisions
Why Socket.IO over plain WebSockets?
Socket.IO provides automatic reconnection, room management, and fallback support — critical for a multiplayer game where connection drops would ruin the experience.
Why Zustand over Redux?
For a real-time game, Redux's boilerplate adds latency in the update cycle. Zustand's minimal API keeps state updates synchronous and fast.
Why Vite over CRA?
Vite's HMR (Hot Module Replacement) is significantly faster during development and produces smaller production bundles.
---
📈 Roadmap
[ ] Persistent user accounts & authentication
[ ] Global leaderboard with all-time rankings
[ ] Custom rooms with invite links
[ ] Sound effects and haptic feedback
[ ] More themes (minimal, retro, neon)
---
👨‍💻 Author
Akhil Rasamalla
![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)
![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=flat&logo=github)
![Portfolio](https://img.shields.io/badge/Portfolio-Visit-orange?style=flat)
---
📄 License
MIT License — feel free to use, fork, or contribute.
