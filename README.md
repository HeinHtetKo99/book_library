## Live Demo
- Demo: https://book-store-52e12.web.app/

# Book Library 📚

A modern **Book Library web app** built with **React + Tailwind CSS + React Router + Firebase**.  
Users can **create their own books**, **browse/search**, and **write personal notes** for reading progress and ideas.

---

## ✨ Features

- 🔐 **Authentication** (Firebase Auth)
  - Register / Login / Logout
- 📚 **Book Management (CRUD)**
  - Create your own books
  - View book list / details
  - Edit / delete 
- 📝 **Notes**
  - Add notes for a book / user
  - Update and delete notes
- 🔎 **Search**
  - Search books by title 
- 🌗 **UI**
  - Responsive layout
  - Optional dark mode (if you added it)

---

## 🧰 Tech Stack

- **React** (Vite)
- **Tailwind CSS**
- **React Router**
- **Firebase**
  - Authentication
  - Firestore Database
  - (Optional) Storage
 

🚀 Getting Started
1) Clone & Install
git clone [https://github.com/HeinHtetKo99/book_library.git]
cd [YOUR_PROJECT_FOLDER]
npm install

2) Create .env

Create a .env file in the project root:

VITE_FIREBASE_API_KEY=YOUR_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
VITE_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID


✅ Important: Restart dev server after changing .env.

3) Run the App
npm run dev

