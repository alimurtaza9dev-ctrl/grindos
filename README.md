# ⚡ GrindOS — Personal Hustle Command Center

> A React Native mobile application for freelancers and students to manage gigs, daily tasks, income, and track weekly performance through a unique Hustle Score algorithm.

![Platform](https://img.shields.io/badge/Platform-Android-green)
![React Native](https://img.shields.io/badge/React_Native-Expo-blue)
![Database](https://img.shields.io/badge/Database-MySQL-orange)
![Backend](https://img.shields.io/badge/Backend-Node.js-brightgreen)

---

## 📱 App Screens

| Login | Home | Gigs |
|---|---|---|
| Secure login with MySQL | Hustle Score dashboard | Track freelance gigs |

| Tasks | Ledger |
|---|---|
| Daily to-do list | Income & expense tracker |

---

## 🚀 Features

- 🔐 **Login System** — Secure user authentication connected to MySQL database
- 💼 **Gig Tracker** — Add, manage and track freelance gigs with 3 status types (Active / Completed / Unpaid)
- ✅ **Daily Grind** — Daily task list that resets every midnight — no excuses
- 💰 **Money Ledger** — Track every rupee of income and expenses with real-time profit calculation
- 🔥 **Hustle Score** — Unique algorithm that scores your weekly performance out of 100
- 📈 **Streak System** — Daily login streak that rewards consistency — miss a day and it resets

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Mobile App | React Native (Expo) |
| Backend API | Node.js + Express |
| Database | MySQL |
| Database Manager | MySQL Workbench |
| APK Build | EAS Build (Expo) |

---

## 🗄️ Database Schema

```sql
-- 5 Tables
users        → User profiles, weekly goals, streaks
gigs         → Freelance projects and their status
tasks        → Daily to-do items (date based)
ledger       → Income and expense entries
hustle_scores → Weekly performance scores
```

---

## ⚡ Hustle Score Algorithm (Unique Feature)

The Hustle Score (0–100) is calculated every week based on real performance:

| Factor | Max Points | How |
|---|---|---|
| ✅ Tasks completed | 40 pts | % of daily tasks done |
| 💼 Gigs closed | 30 pts | 10pts per closed gig |
| 💰 Income vs goal | 20 pts | Earned ÷ weekly goal × 20 |
| 🔥 Daily streak | 10 pts | 1pt per streak day |

---

## 📁 Project Structure

grindos/
├── backend/                  ← Node.js + Express REST API
│   ├── server.js             ← Main server entry point
│   ├── db.js                 ← MySQL connection
│   └── routes/
│       ├── users.js          ← Auth + streak logic
│       ├── gigs.js           ← Gig CRUD operations
│       ├── tasks.js          ← Task CRUD operations
│       ├── ledger.js         ← Income/expense operations
│       └── hustle.js         ← Hustle Score algorithm
└── mobile/                   ← React Native Expo App
├── App.js                ← Navigation + auth state
├── api.js                ← Axios API configuration
└── screens/
├── LoginScreen.js    ← User login
├── HomeScreen.js     ← Hustle Score dashboard
├── GigsScreen.js     ← Gig management
├── TasksScreen.js    ← Daily task list
└── LedgerScreen.js   ← Money tracker

---

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v18+)
- MySQL Workbench
- Expo Go app (on Android phone)

### 1. Database Setup
Open MySQL Workbench and run:
```sql
CREATE DATABASE grindos;
USE grindos;
-- Run the full schema from backend/db_schema.sql
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=1234
DB_NAME=grindos
PORT=5000

Run backend:
```bash
node server.js
```

### 3. Mobile Setup
```bash
cd mobile
npm install
```

Update `api.js` with your PC's IP address:
```javascript
const BASE_URL = 'http://YOUR_IP:5000/api';
```

Run app:
```bash
npx expo start
```

Scan QR code with **Expo Go** app on your phone.

---

## 📦 APK File

Download the APK here: *(link will be added after build)*

---

## 👥 Group Members

| Name | Role |
|---|---|
| Ali Murtaza | Full Stack Developer |
| M.Salman Iqbal | [Frontend Developer] |
| M.Abdullah Tariq | [API and Database Management] |

---

## 📚 Course Information

- **Course:** Mobile Application Development
- **Assignment:** #2 — React Native App with Database
- **University:** [Government College University Faisalabad]
