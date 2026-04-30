# MERN Portfolio Platform

A dynamic, full-stack personal portfolio and resume builder based on the B.L.A.S.T protocol.

## Architecture
- **Frontend**: Next.js (App Router), Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT

## Running Locally

### Backend
1. `cd server`
2. Create a `.env` file with `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
3. `npm install`
4. `npm run dev`

### Frontend
1. `cd client`
2. Create a `.env.local` file with `NEXT_PUBLIC_API_URL=http://localhost:5000/api`
3. `npm install`
4. `npm run dev`

## Deployment Instructions

### Phase 5: Trigger (Deployment)

#### 1. Backend (Render / Railway)
1. Push your code to GitHub.
2. Sign up on [Render](https://render.com) or [Railway](https://railway.app).
3. Create a new "Web Service" and connect your GitHub repository.
4. Set the Root Directory to `server`.
5. Set the Build Command to `npm install && npx tsc`.
6. Set the Start Command to `node dist/index.js` or `npm start`.
7. Add Environment Variables:
   - `MONGO_URI` (From MongoDB Atlas)
   - `JWT_SECRET` (A strong random string)
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
8. Deploy!

#### 2. Frontend (Vercel)
1. Sign up on [Vercel](https://vercel.com).
2. Create a new Project and select your GitHub repository.
3. Set the Framework Preset to Next.js.
4. Set the Root Directory to `client`.
5. Add Environment Variables:
   - `NEXT_PUBLIC_API_URL`: Use the deployed Render/Railway backend URL (e.g., `https://your-api.onrender.com/api`).
6. Deploy! Vercel will automatically build and deploy the application.
7. Add custom domain support via Vercel Settings -> Domains.

## Features Included
- Dynamic JSON-based resume modeling
- MongoDB integration with Express REST API
- Protected Admin Dashboard via JWT
- Responsive Next.js Frontend with dark mode / tailwind support
- Framer Motion animations
