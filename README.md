# ⚡ GrindOS — Personal Hustle Command Center

> A React Native mobile application for freelancers and students to manage gigs, daily tasks, income, and track weekly performance through a unique Hustle Score algorithm.

![Platform](https://img.shields.io/badge/Platform-Android-green)
![React Native](https://img.shields.io/badge/React_Native-Expo-blue)
![Database](https://img.shields.io/badge/Database-MySQL-orange)
![Backend](https://img.shields.io/badge/Backend-Node.js-brightgreen)
![University](https://img.shields.io/badge/University-GCUF-red)

---

## 👥 Group Members

| Name | Roll No. | Role |
|---|---|---|
| Ali Murtaza | 240478 | Frontend Management |
| M. Salman Iqbal | 240432 | Database Management |
| M. Abdullah Tariq | 240475 | Backend Management |

**University:** Government College University Faisalabad
**Course:** Mobile Application Development — Assignment #2

---

## 📱 Features

- 🔐 **Login System** — Secure authentication with MySQL database
- 👆 **Fingerprint Login** — Biometric authentication via expo-local-authentication
- 💼 **Gig Tracker** — Manage freelance projects with Active/Completed/Unpaid status
- ✅ **Daily Grind** — Daily task list that resets every midnight
- 💰 **Money Ledger** — Track income and expenses with real-time profit calculation
- 🔥 **Hustle Score** — Unique algorithm scoring weekly performance out of 100
- 📈 **Streak System** — Daily login streak rewarding consistency

---

## ⚡ Hustle Score Algorithm (Unique Feature)

| Factor | Max Points | Formula |
|---|---|---|
| Tasks completed | 40 pts | (done ÷ total) × 40 |
| Gigs closed | 30 pts | gigs × 10 (max 30) |
| Income vs goal | 20 pts | (earned ÷ goal) × 20 |
| Daily streak | 10 pts | 1pt per streak day |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Mobile App | React Native (Expo) |
| Backend API | Node.js + Express |
| Database | MySQL (MySQL Workbench) |
| Tunneling | ngrok |
| Biometrics | expo-local-authentication |
| APK Build | EAS Build |

> **Note:** MySQL was used instead of Firebase/SQLite as it is a professional-grade relational database demonstrating the same connectivity and CRUD concepts, approved by the instructor.

---

## 🗄️ Database Schema

```sql
users        → User profiles, goals, streaks
gigs         → Freelance projects and status
tasks        → Daily to-do items (date based)
ledger       → Income and expense entries
hustle_scores → Weekly performance scores
```

---

## 🔧 Setup Instructions

### Backend
```bash
cd backend
npm install
# Create .env with MySQL credentials
node server.js
```

### Mobile
```bash
cd mobile
npm install
# Update api.js with your ngrok URL
npx expo start
```

---

## 📦 APK Download
[Download APK](https://expo.dev/artifacts/eas/dvjc2EE5uNDiHjaK5vz5kv.apk)

---

## 📁 Project Structure

```
grindos/
├── backend/
│   ├── server.js
│   ├── db.js
│   └── routes/
│       ├── users.js
│       ├── gigs.js
│       ├── tasks.js
│       ├── ledger.js
│       └── hustle.js
└── mobile/
    ├── App.js
    ├── api.js
    └── screens/
        ├── LoginScreen.js
        ├── HomeScreen.js
        ├── GigsScreen.js
        ├── TasksScreen.js
        └── LedgerScreen.js
```
