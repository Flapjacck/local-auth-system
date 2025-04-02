# local-auth-system

A sleek full-stack web app with secure user authentication built using:

- **Frontend**: React + TypeScript + Vite + Tailwind CSS  
- **Backend**: Express.js (JavaScript) + SQLite (local database)

---

## ⚙️ Features

✅ **Signup** – Users can create an account with hashed passwords  
✅ **Login** – Secure login with bcrypt hash verification  
✅ **Local SQLite Storage** – Lightweight, no setup needed  
✅ **Tailwind UI** – Modern, responsive, and minimal   

---

## Libraries Used

### Backend

| Library        | Purpose                                      |
|----------------|----------------------------------------------|
| express        | Web server to handle HTTP routes             |
| cors           | Enable cross-origin requests from frontend   |
| body-parser    | Parse incoming JSON request bodies           |
| bcrypt         | Secure password hashing and comparison       |
| sqlite3        | Local database for user storage              |
| nodemon (dev)  | Auto-reloads server during development       |
| express-rate-limit | Adds rate limiting to prevent brute forcing |

### Frontend

| Library         | Purpose                                       |
|------------------|-----------------------------------------------|
| react + react-dom | Building UI components                       |
| typescript        | Type-safe code for fewer bugs                |
| vite              | Lightning-fast dev server and bundler        |
| tailwindcss       | Utility-first modern CSS                     |

---

## How Password Security Works

- **Signup**
  - User enters a password
  - Backend hashes it with `bcrypt.hash(password, 10)`
  - Hashed password is stored in the database

- **Login**
  - User submits credentials
  - Backend retrieves stored hash
  - Compares using `bcrypt.compare(password, hash)`

> 🔒 Bcrypt is one-way — hashes can’t be reversed. Each hash is salted for extra protection.

---

## Deployment Instructions

### Clone the Repository

1. Clone the project to desired location:

```bash
  git clone https://github.com/Flapjacck/local-auth-system.git
```

2. Change directory to inside "\local-auth-system\\" folder:

```bash
  cd local-auth-system
```

### Start Backend

```bash
cd backend
npm install
npm run dev
```

### Start Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Screenshots

![Login Page](https://i.imgur.com/Xo8u5dl.png)
![Signup Page](https://i.imgur.com/Hc1DMhs.png)

---

## Author

- [Spencer Kelly](https://SpencerKelly.tech/)
