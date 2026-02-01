🎓 Certificate Verification System

A secure full-stack web application that enables organizations to issue, manage, and verify certificates digitally using a unique certificate ID.

🚀 Built to prevent fake certificates and enable instant, trustworthy verification.


🔍 Overview

The Certificate Verification System allows admins to upload and manage certificate records, while users can instantly verify certificates by entering a unique Certificate ID. The system ensures authenticity, data integrity, and fast access to verified records.


✨ Key Features

🔐 Secure authentication using JWT

🆔 Certificate verification via unique Certificate ID

👨‍💼 Admin dashboard to manage certificate data

⚡ Real-time certificate display

📱 Responsive and user-friendly UI

🛠 Tech Stack

Frontend

React.js

HTML, CSS, JavaScript

Backend

Node.js

Express.js

Database

MongoDB

Authentication

JSON Web Tokens (JWT)

👥 User Roles
🔹 Admin

Upload and manage certificate data

Validate and maintain certificate records

🔹 User

Search certificates using Certificate ID

View verified certificate details instantly



⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/Vedika-Patidar/CertiVault.git

2️⃣ Install backend dependencies
cd server
npm install

3️⃣ Install frontend dependencies
cd client
npm install

4️⃣ Setup environment variables

Create a .env file inside server/ (not pushed to GitHub):

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

5️⃣ Run the application
# Backend
npm run dev

# Frontend
npm run dev

🎯 Project Purpose

This project demonstrates:

Full-stack MERN development

Secure authentication & authorization

Real-world certificate verification workflow

Clean API and database design

🚀 Future Enhancements

QR code–based certificate verification

Public verification without login

Certificate PDF download

Admin analytics dashboard
