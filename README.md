# Next.js Authentication System (JWT + Cookies + MongoDB)
This is a mini project built with Next.js App Router, MongoDB, and JWT authentication.
It implements a secure login/signup system with HttpOnly cookies, route protection, and logout functionality.

## 🚀 Features
- User **signup** with hashed passwords (bcrypt)
- User **login** with JWT token generation
- **HttpOnly cookies** for secure token storage
- **Protected route** (only accessible with valid token)
- **Logout** (clears cookie)
- Basic **frontend forms** (login, signup, protected page)
- Minimal UI with TailwindCSS


## 🛠️ Tech Stack
- Next.js (App Router)
- MongoDB + mongoose
- JWT (jsonwebtoken)
- bcrypt
- TailwindCSS

## ⚙️ Setup

**1.** Clone the repo:  
```
git clone https://github.com/D-Sync-Vivek/Auth-System.git
```
**2.** Install dependencies:
```
npm install
```
**3.** Create a .env.local file:
```
MONGO_URI=mongodb://localhost:27017/your-db-name
JWT_SECRET=your_super_secret_key
```
**4.** Run MongoDB locally or MongoDB Atlas
**5.** Start the dev server: 
```
npm run dev
```

## 🔑 Authentication Flow
**1. Signup** → user data stored in MongoDB with hashed password.  
**2. Login** → verifies credentials, generates JWT, sets in HttpOnly cookie.  
**3. Protected route** → checks cookie, verifies token before granting access.  
**4. Logout** → clears cookie.  

## 🚀 Deployment
- Deployed easily on Vercel.
- Add environment variables in Vercel dashboard (MONGO_URI, JWT_SECRET).
- No other code changes needed.

## 📸 Screenshots
### Home Page
![Home Page](public/home.png) 

### Sign Up Page
![Sign Up Page](public/signuppage.png)

### Login Page
![Login Page](public/loginpage.png)

### Protected Page
![Protected Page](public/protectedpage.png)


## 📌 Future Improvements
- Refresh tokens for smoother authentication.
- Better UI/UX.
- Role-based access (admin/user).
- Connect to MongoDB Atlas instead of local DB.

## 🧑‍💻 Author
Built by **Vivek Kumar** as part of learning Next.js Authentication.