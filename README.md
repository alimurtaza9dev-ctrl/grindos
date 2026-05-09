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
