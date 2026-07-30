# 🐝 ChatBee

A modern real-time chat application built using the **MERN Stack** and **Socket.IO**. ChatBee provides secure authentication, instant messaging, and live online status with a clean and responsive user interface.

---

## ✨ Features

* 🔐 Secure authentication using JWT and HTTP-only cookies
* 👤 User registration and login
* 💬 One-to-one real-time messaging
* ⚡ Instant message delivery with Socket.IO
* 🟢 Live online/offline user status
* 📂 Conversation history
* 📱 Responsive user interface
* 🛡️ Protected routes for authenticated users

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Zustand
* Axios
* Socket.IO Client

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* JWT Authentication
* bcrypt

---

## 📂 Project Structure

```text
ChatBee/
├── frontend/
│   ├── src/
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Lokesh-kumar-4164/Chattie.git
cd Chattie
```

---

### 2. Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file inside the **backend** directory.

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT=http://localhost:5173
```

Create a `.env` file inside the **frontend** directory.

```env
VITE_BACKEND_URL=http://localhost:4000/api
```

---

### 4. Run the application

#### Backend

```bash
npm run dev
```

#### Frontend

```bash
npm run dev
```

---

## 📸 Screenshots

Add screenshots of:

* Login Page
* Register Page
* Chat Interface
* Online Status
* Real-Time Messaging

---

## 🔄 Real-Time Communication

ChatBee uses **Socket.IO** for real-time communication.

Current Socket.IO events include:

### Client → Server

* `join`

### Server → Client

* `receive-message`
* `online-users`

---

## 🔒 Authentication

* JWT-based authentication
* HTTP-only cookies for enhanced security
* Protected backend APIs
* Protected frontend routes

---

## 🌱 Future Improvements

* ✅ Message seen receipts
* ⌨️ Typing indicators
* 📎 File and image sharing
* 🔔 Push notifications
* 🟥 Redis caching
* 👥 Group chats
* 🌙 Dark mode

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and submit a pull request.

---


## 👨‍💻 Author

**Lokesh Kumar**

If you found this project helpful, consider giving it a ⭐ on GitHub!
