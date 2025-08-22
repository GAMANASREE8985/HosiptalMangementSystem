# Hospital Management System (MERN) - Starter
## Quick start (Docker)
1. Copy .env: `cp server/.env.example server/.env` and `cp web/.env.example web/.env`
2. Run: `docker compose up --build`
3. Open: Web http://localhost:5173, API http://localhost:4000/api, Mongo Express not included here.
## Local dev (without Docker)
- Server: `cd server && npm install && cp .env.example .env && npm run seed && npm run dev`
- Web: `cd web && npm install && cp .env.example .env && npm run dev`
