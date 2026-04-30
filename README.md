# 🚀 MERN Portfolio Platform

A dynamic, full-stack personal portfolio and resume builder.

## 🏗️ Architecture
- **Frontend**: Next.js (App Router), Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT (JSON Web Tokens)

---

## 🛠️ Local Development

### 1. Backend Setup
1. Navigate to the server directory: `cd server`
2. Create your environment file: `cp .env.example .env`
3. Fill in your credentials in `.env` (MongoDB URI, JWT Secret, Admin Login).
4. Install dependencies: `npm install`
5. Start the development server: `npm run dev`

### 2. Frontend Setup
1. Navigate to the client directory: `cd client`
2. Create your environment file: `cp .env.example .env.local`
3. Update `NEXT_PUBLIC_API_URL` if your backend is running on a different port.
4. Install dependencies: `npm install`
5. Start the development server: `npm run dev`

---

## 🌐 Deployment

### Backend (Render / Railway)
1. Set the **Root Directory** to `server`.
2. **Build Command**: `npm install && npm run build`
3. **Start Command**: `npm start`
4. Add environment variables from `server/.env.example`.

### Frontend (Vercel)
1. Set the **Root Directory** to `client`.
2. Vercel will auto-detect Next.js.
3. Add `NEXT_PUBLIC_API_URL` pointing to your deployed backend.

---

## ✨ Features
- 📄 **Dynamic Resume**: JSON-based resume modeling for easy updates.
- 🔐 **Admin Dashboard**: Secure JWT-protected area to manage projects and skills.
- 🎨 **Premium UI**: Responsive design with dark mode and smooth Framer Motion animations.
- 🚀 **REST API**: Clean Express-based API for data management.
