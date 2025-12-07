# 🎵 1BeatClub – Real-Time Collaborative Music App

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-blue?logo=prisma)](https://www.prisma.io/)
[![WebSockets](https://img.shields.io/badge/WebSockets-Live-green?logo=websocket)](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
[![Zustand](https://img.shields.io/badge/Zustand-State%20Store-orange)](https://zustand-demo.pmnd.rs/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

✨ **A real-time music platform** where users can create clubs, add songs, and vote to decide what plays next — built using **Next.js + WebSockets + Prisma + Clerk**.

---

## 🎧 What is 1BeatClub?

1BeatClub lets anyone create a collaborative “music club” where users join, add music, vote songs, and enjoy a shared playlist—completely live.

Perfect for:

- 🔥 Parties
- 🏋️ Gyms
- 👨‍💻 Office working sessions
- 💍 Events
- 🎂 Birthday gatherings

Bring your group together with music everyone chooses ❤️

---

## 🎚️ Key Features

- 🎵 Create music clubs
- 🎧 Add songs from YouTube
- 🚀 Vote what plays next
- 🔁 Live real-time playback updates
- 🎟 Join via QR Code or invite link
- ⚡ Optimistic updates (instant button feedback)
- 📱 Fully responsive (mobile-first)
- 🎨 Modern UI

---

## 📦 Tech Stack

- ⚡ **Next.js 15** – App router, fast builds with Turbopack
- ⚛️ **React 19** – Latest React features
- 🎨 **Tailwind CSS 4** – Utility-first styling
- ❄️ **Websocket** – Enabling Realtime updates
- ✨ **Lucide / Tabler Icons** – Beautiful icon sets
- 🌀 **Motion** – Smooth animations

---

## 🖼️ Preview

![App Screenshot](https://lokesh-singh.vercel.app/_next/image?url=%2Fprojects%2F1beatclub%2Fimg1.png&w=640&q=75)
![App Screenshot](https://lokesh-singh.vercel.app/_next/image?url=%2Fprojects%2F1beatclub%2Fimg11.png&w=640&q=75)
![App Screenshot](https://lokesh-singh.vercel.app/_next/image?url=%2Fprojects%2F1beatclub%2Fimg2.png&w=640&q=75)
![App Screenshot](https://lokesh-singh.vercel.app/_next/image?url=%2Fprojects%2F1beatclub%2Fimg3.png&w=640&q=75)
![App Screenshot](https://lokesh-singh.vercel.app/_next/image?url=%2Fprojects%2F1beatclub%2Fimg6.png&w=640&q=75)
![App Screenshot](https://lokesh-singh.vercel.app/_next/image?url=%2Fprojects%2F1beatclub%2Fimg7.png&w=640&q=75)

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/LokeshXs/1BeatClub.git
cd 1beatclub
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Environment variables in .env file from .env.example file

```bash
cp .env.example .env
```

### Then open .env and fill the values:

```bash
DATABASE_URL=<your-postgres-url>
CLERK_SECRET_KEY=<your-clerk-secret-key>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-public-key>
GOOGLE_API_KEY=<your-google-api-key>
```

### 4. Make sure your .env contains a valid DATABASE_URL and then run to create the tables in DB:

```bash
npx prisma migrate dev
```

### 5️. Setup the WebSocket server

1. Clone and run the WebSocket server from the repository below 👇

👉 https://github.com/LokeshXs/1beatclub-ws-server.git

2. Follow the instructions in that repository to start the WebSocket server locally.

3. After starting it, come back to this project and update the WebSocket endpoint inside:

```ts
// /lib/config.ts

export const WEBSOCKET_SERVER_URL = "ws://localhost:8080";
```

### 6. Run the development server

```bash
npm run dev

```

### 6. Run the development server

After the server starts successfully, open your browser and visit:

```bash
http://localhost:3000
```

If everything is setup correctly, you should now see the 1BeatClub app running locally 🎉

---

✨ **Why I built this**

Because music brings people together — and every gathering deserves a shared playlist based on what everyone loves, not just the DJ 😄

---

## 🧑‍💻 Author

**Lokesh Singh**  
🔗 Portfolio — https://lokesh-singh.vercel.app/
