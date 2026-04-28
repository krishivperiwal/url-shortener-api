# 🔗 URL Shortener API

A backend service that generates short URLs and efficiently redirects users to the original links.

---

## ❗ Problem

Long URLs are difficult to share, remember, and manage.

This API provides a scalable backend solution to generate short, unique links and redirect users efficiently.

---

## 🔗 Key Features

* Generate unique short URLs
* Redirect to original URLs
* Session-based authentication using cookies
* Protected routes for authenticated users
* Optimized lookup using MongoDB indexing
* Input validation and error handling
* RESTful API design

---

## ⚙️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)

---

## 🔐 Authentication

* Session-based authentication using cookies
* Protected routes using middleware (`protect`)
* User login and registration support

---

## 🏗 Architecture
* Middleware → Authentication & request handling
* Controllers → Business logic
* Models → Database schema
* Routes → API endpoints

---

## 📡 API Endpoints

* POST `/shorten`
* GET `/:shortId`

---

## 📦 Sample Flow

### Create Short URL

POST `/shorten`

```json
{
  "originalUrl": "https://example.com"
}
```

### Response

```json
{
  "shortUrl": "http://localhost:5000/abc123"
}
```

---

## 🛠 Run Locally

```bash
git clone <your-repo-link>
cd url-shortener-api
npm install
npm start
```

Create a `.env` file using `.env.example`

---

## 📸 Preview
A simple EJS-based interface is included to interact with the API.

### Analytics Dashboard
![Analytics Dashboard](preview/analytics.png)

### Login Page
![Login Page](preview/login.png)

### Authentication Page
![Signup Page](preview/signup.png)

### Dashboard Home
![Dashboard Home](preview/dashboard.png)

---

## 📌 Base URL

http://localhost:5000

---

## 👨‍💻 Author

Krishiv
