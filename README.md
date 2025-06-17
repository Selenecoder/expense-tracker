# 🪙 **VYAYSIGH** – SMART EXPENSE TRACKER APP
                   “Track every rupee like it matters — because it does.” – VYAYSIGH
> Take control of your finances with **VYAYSIGH** – a clean, powerful, and intelligent expense management solution for modern users.

---

## ✨ Overview

**VYAYSIGH** is a full-stack expense tracking platform built to help users manage their **income**, **expenses**, **savings**, and **goals** through an elegant dashboard, insightful analytics, and smart notifications. Whether you're planning your budget or reviewing your spending habits, **VYAYSIGH** delivers personalized financial clarity in just a few clicks.

---

## 🔑 Key Features

### 🔐 Authentication & Access Control
- Email/Password Signup & Login
- Google OAuth 2.0 login
- JWT-secured sessions
- Role-based access: `Admin`, `User`

### 📊 Real-Time Dashboard
- Monthly & yearly financial summaries
- Dynamic charts & graphs (Recharts)
- Visual analytics to track spending patterns

### 💸 Transactions Management
- Add, edit, delete transactions
- Filter by category, date, or amount
- Recurring transaction support

### 🧮 Savings & Budget Tools
- Live savings goal progress
- **EMI Calculator** with dynamic bank interest rates
- Budget limit alerts and reminders

### 📈 Reports & Exports
- Download reports in CSV or PDF format
- Tag-based spending insights
- Budget vs. actual analytics

### 🧩 Modular Architecture
- Clean separation of concerns: **Frontend + Backend**
- Scalable, extensible codebase with layered structure

---

## 🛠️ Tech Stack

| Layer       | Tech Used                         |
|-------------|-----------------------------------|
| **Frontend**| React (Vite), React Bootstrap, Recharts |
| **Backend** | Spring Boot (Java 23), REST APIs, JWT |
| **Database**|  MySQL  |
| **Dev Tools** | VS Code, Postman, GitHub, Maven |

---

## 🗂️ Project Structure

```bash
vyaysigh/
├── frontend/              # React + Vite frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
├── backend/               # Spring Boot backend
│   └── src/
│       └── main/
│           └── java/
│               └── com/vyaysigh/
│                   ├── controller/
│                   ├── model/
│                   ├── repository/
│                   └── service/
└── README.md
