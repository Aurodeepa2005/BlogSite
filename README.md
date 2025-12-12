# 🌐 BlogNest – Modern React Blog Application

A clean, responsive, and interactive blogging platform built with **React, Vite, Tailwind CSS, Zod, and React Router**.  
Users can log in, create posts, edit posts, and delete posts — all stored locally using `localStorage`.  
This project focuses on beautiful UI, smooth UX, and simple client-side authentication.

---

## 🚀 Live Demo  
🔗 [View BlogNest Live](https://blogsite-byauro.netlify.app/)


---

## ⭐ Features

### 🔐 Authentication
- Login using **Name, Email, Password**
- Strong Zod validation rules:
  - Name ≥ 3 characters  
  - Valid email with `@` and ending in `.com`  
  - Password ≥ 6 characters + at least 1 special character  
- Alerts appear instantly when validation fails  
- Successful login popup  
- Protected routes (Create / Edit only when logged in)

---

### 📝 Blog Functionalities
- Create new blog posts  
- Edit existing posts  
- Delete posts  
- View detailed post page  
- Posts saved in `localStorage` permanently  
- Automatic sorting of latest posts  

---

### 🎨 UI / UX Highlights
- TailwindCSS **lavender theme**  
- Glassmorphism card design  
- Responsive layout (mobile → desktop)  
- Animated navbar & elements with Framer Motion  
- Clean grid layout for posts  
- Smooth modern UI  

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React** | UI Framework |
| **Vite** | Development & Build Tool |
| **Tailwind CSS** | Styling |
| **@tailwindcss/vite** | Tailwind integration plugin |
| **Zod** | Validation |
| **React Router DOM** | Routing |
| **localStorage** | Data persistence |
| **Framer Motion** | Animations |

---


