# URL Shortener

A simple and efficient URL shortening service built with **Express.js**, **MongoDB**, and **Node.js**. Create short, memorable URLs and track click analytics in real-time.

## Features

- 🔐 **User Authentication** - Secure signup and login with bcrypt password hashing
- 🔗 **URL Shortening** - Convert long URLs into short, shareable links
- 📊 **Analytics** - Track visit history and click counts for each short URL
- 🍪 **Session Management** - Persistent user sessions with JWT-like tokens
- 📱 **Responsive UI** - Clean and intuitive user interface with EJS templates

## Tech Stack

- **Backend**: Express.js 5.2.1
- **Database**: MongoDB 9.2.1
- **Authentication**: JWT & Cookie-based sessions
- **Password Security**: bcryptjs
- **Frontend Templates**: EJS
- **ID Generation**: shortid, nanoid, uuid

## Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (running locally or remote connection string)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and update:
   - `MongoDB_URL` - Your MongoDB connection string (default: `mongodb://127.0.0.1:27017/short-url`)
   - `PORT` - Server port (default: 5000)
   - `BASE_URL` - Public app URL used for short link generation (optional)
   - `NODE_ENV` - Environment (development/production)

4. **Start MongoDB**
   ```bash
   mongod
   ```

5. **Start the server**
   ```bash
   npm start
   ```
   
   The server will run on `http://localhost:5000`

## Usage

### User Registration
- Navigate to `http://localhost:5000/signup`
- Enter your name, email, and password
- Click signup to create your account

### User Login
- Go to `http://localhost:5000/login`
- Enter your credentials
- After login, you'll be redirected to your dashboard

### Create Short URL
- From the dashboard, paste your long URL
- Click "Shorten" to generate a short URL
- Share your short URL

### View Analytics
- Click on the short URL to view visit history
- See total clicks and timestamp of each visit

### Access Short URL
- Visit `http://localhost:5000/{shortId}` to redirect to the original URL
- Each visit is recorded in the analytics

## API Endpoints

### User Routes
- `POST /user` - Register a new user
- `POST /user/login` - Login user

### URL Routes (Protected)
- `POST /url` - Create a short URL
- `GET /url/analytics/:shortId` - Get analytics for a short URL

### Static Routes
- `GET /` - Home/Dashboard (user URLs)
- `GET /signup` - Signup page
- `GET /login` - Login page

### Redirect Route
- `GET /:shortId` - Redirect to original URL

## Project Structure

```
.
├── server.js                    # Server bootstrap
├── src/
│   ├── app.js                   # Express app setup
│   ├── config/
│   │   └── db.js                # Database connection helper
│   ├── controllers/
│   │   ├── authController.js
│   │   └── urlController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── user.js
│   │   └── url.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── pageRoutes.js
│   │   └── urlRoutes.js
│   ├── utils/
│   │   └── sessionStore.js
│   └── views/
│       ├── analytics.ejs
│       ├── home.ejs
│       ├── login.ejs
│       └── signup.ejs
├── package.json
└── .env
```

## Security Features

- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ Session-based authentication
- ✅ Cookie-based token storage
- ✅ Environment variables for sensitive data
- ✅ Input validation on signup/login

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URL=mongodb://127.0.0.1:27017/short-url
BASE_URL=http://localhost:5000
NODE_ENV=development
```

See `.env.example` for reference.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URL in `.env` file
- Verify MongoDB is accessible on specified port

### Port Already in Use
- Change PORT in `.env` file
- Or kill process using the port

### Session Lost After Server Restart
- Sessions are stored in memory
- For production, consider using MongoDB sessions or Redis

## Future Enhancements

- [ ] User-friendly dashboard with URL management
- [ ] QR code generation for short URLs
- [ ] Export analytics to CSV
- [ ] Custom short URL slugs
- [ ] URL expiration settings
- [ ] Rate limiting for URL creation

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Support

For issues or questions, please open an issue on GitHub or contact the maintainer.

---

**Made with ❤️ by URL Shortener Team**
