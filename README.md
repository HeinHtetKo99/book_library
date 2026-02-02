## 🌐 Live Demo
- Demo: https://book-store-52e12.web.app/
- Repository: https://github.com/HeinHtetKo99/book_library.git

# 📚 Book Library

A modern **Book Library web application** built with **React, Tailwind CSS, React Router, and Firebase**.  
Users can **create and manage their own books**, **search through their library**, and **write personal notes**.

This project is designed as a **portfolio project** to demonstrate real-world frontend development skills with authentication and a cloud database.

---

## ✨ Features

### 🔐 Authentication
- User registration
- Login / Logout
- Firebase Email & Password authentication

### 📚 Book Management (CRUD)
- Create your own books
- View book list and book details
- Edit and delete books

### 📝 Notes
- Create notes for books
- Update and delete notes
- Notes are user-specific

### 🔎 Search
- Search books by title (client-side filtering)

### 📱 Responsive UI
- Mobile-friendly
- Clean and modern layout using Tailwind CSS

---

## 🧰 Tech Stack

- **React** (Vite)
- **Tailwind CSS**
- **React Router**
- **Firebase**
  - Authentication
  - Firestore Database

---

## 🚀 Getting Started

### 1) Clone the Repository

```bash
git clone https://github.com/HeinHtetKo99/book_library.git
cd book_library
2) Install Dependencies
npm install
3) Create .env File
Create a file named .env in the project root and add your Firebase configuration:

VITE_FIREBASE_API_KEY=YOUR_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
VITE_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
✅ Important: Restart the dev server after creating or updating .env.

4) Run the App
npm run dev
The app will run locally at:

http://localhost:5173
