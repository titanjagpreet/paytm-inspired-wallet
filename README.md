# 🚀 WalletX - Modern Digital Wallet Platform

<div align="center">

![WalletX Logo](https://img.shields.io/badge/WalletX-FinTech%20Platform-blue?style=for-the-badge&logo=wallet)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

**A sophisticated, full-stack digital wallet platform inspired by Paytm, built with modern technologies and enterprise-grade security.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Project-green?style=for-the-badge)](https://walletx-demo.com)
[![Documentation](https://img.shields.io/badge/Documentation-Read%20Docs-blue?style=for-the-badge)](https://docs.walletx.com)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 API Documentation](#-api-documentation)
- [🎨 UI/UX Features](#-uiux-features)
- [🔒 Security Features](#-security-features)
- [📊 Performance](#-performance)
- [🧪 Testing](#-testing)
- [📦 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 💳 Core Wallet Features
- **Instant Money Transfers** - Real-time peer-to-peer transactions
- **Secure Balance Management** - Bank-grade security with encrypted storage
- **Transaction History** - Comprehensive audit trail with search and filtering
- **Multi-Currency Support** - INR, USD, ETH, BTC (extensible framework)
- **Account Types** - Wallet, Savings, and Trading accounts

### 🔐 Security & Authentication
- **JWT-based Authentication** - Secure token-based session management
- **Password Hashing** - BCrypt encryption with salt rounds
- **Input Validation** - Zod schema validation for all user inputs
- **CORS Protection** - Cross-origin resource sharing security
- **Rate Limiting** - Protection against brute force attacks

### 🎨 Modern UI/UX
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark/Light Mode** - Theme switching with system preference detection
- **Smooth Animations** - Framer Motion powered micro-interactions
- **Real-time Updates** - Live balance and transaction updates
- **Accessibility** - WCAG 2.1 compliant components

### 📊 Analytics & Insights
- **Balance Trends** - Interactive charts with Recharts
- **Transaction Analytics** - Spending patterns and insights
- **Real-time Dashboard** - Live financial overview
- **Export Capabilities** - Transaction history export

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI Framework |
| **TypeScript** | 5.9.2 | Type Safety |
| **Vite** | 5.4.19 | Build Tool & Dev Server |
| **Tailwind CSS** | 3.4.17 | Utility-First CSS |
| **Framer Motion** | 12.23.12 | Animation Library |
| **React Router** | 6.30.1 | Client-side Routing |
| **Axios** | 1.11.0 | HTTP Client |
| **React Query** | 5.83.0 | Server State Management |
| **Radix UI** | Latest | Accessible Components |
| **Recharts** | 2.15.4 | Data Visualization |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | Runtime Environment |
| **Express.js** | 5.1.0 | Web Framework |
| **TypeScript** | 5.9.2 | Type Safety |
| **MongoDB** | 8.17.0 | NoSQL Database |
| **Mongoose** | 8.17.0 | ODM for MongoDB |
| **JWT** | 9.0.2 | Authentication |
| **BCrypt** | 6.0.0 | Password Hashing |
| **Zod** | 4.0.14 | Schema Validation |
| **CORS** | 2.8.5 | Cross-Origin Security |

### Development Tools
- **ESLint** - Code linting and formatting
- **Nodemon** - Development server with auto-reload
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React/TS)    │◄──►│   (Node/Express)│◄──►│   (MongoDB)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
    ┌────▼────┐            ┌─────▼─────┐            ┌────▼────┐
    │  Vite   │            │  Express  │            │ Mongoose│
    │  Dev    │            │  Server   │            │   ODM   │
    │ Server  │            │           │            │         │
    └─────────┘            └───────────┘            └─────────┘
```

### System Architecture Highlights
- **Microservices-Ready** - Modular design for easy scaling
- **RESTful API** - Standard HTTP methods and status codes
- **MVC Pattern** - Clear separation of concerns
- **Middleware Architecture** - Extensible request processing
- **Database Transactions** - ACID compliance for financial operations

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (v6.0 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/walletx.git
   cd walletx
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Backend (.env)
   cd backend
   cp .env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/walletx
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   ```

4. **Database Setup**
   ```bash
   # Start MongoDB (if not running)
   mongod
   
   # The application will automatically create collections
   ```

5. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000/api-docs

---

## 📁 Project Structure

```
walletx/
├── backend/                          # Backend API Server
│   ├── src/
│   │   ├── controller/              # Request handlers
│   │   │   ├── accountController.ts # Account operations
│   │   │   └── userController.ts    # User management
│   │   ├── middlewares/             # Express middlewares
│   │   │   ├── userValidation.ts    # Input validation
│   │   │   └── verifyJWT.ts         # JWT authentication
│   │   ├── models/                  # Database models
│   │   │   ├── db.ts               # Database connection
│   │   │   └── models.ts           # Mongoose schemas
│   │   ├── routes/                  # API routes
│   │   │   ├── accountRoutes.ts    # Account endpoints
│   │   │   └── userRoutes.ts       # User endpoints
│   │   ├── services/                # Business logic
│   │   │   └── transferFunds.ts    # Money transfer service
│   │   └── server.ts               # Express server setup
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                         # React Frontend
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── auth/               # Authentication components
│   │   │   ├── ui/                 # Base UI components
│   │   │   ├── FAQ.tsx            # FAQ section
│   │   │   ├── Features.tsx       # Features showcase
│   │   │   ├── Footer.tsx         # Footer component
│   │   │   ├── Hero.tsx           # Landing hero section
│   │   │   ├── HowItWorks.tsx     # How it works section
│   │   │   └── Navbar.tsx         # Navigation bar
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── lib/                    # Utility functions
│   │   ├── pages/                  # Page components
│   │   │   ├── Dashboard.tsx      # Main dashboard
│   │   │   ├── Index.tsx          # Landing page
│   │   │   ├── NotFound.tsx       # 404 page
│   │   │   ├── SignIn.tsx         # Login page
│   │   │   └── SignUp.tsx         # Registration page
│   │   ├── App.tsx                # Main app component
│   │   ├── index.css              # Global styles
│   │   └── main.tsx               # App entry point
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

## 🔧 API Documentation

### Authentication Endpoints

#### POST `/api/v1/users/signup`
Create a new user account.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "message": "User signed up! Welcome John"
}
```

#### POST `/api/v1/users/signin`
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "User logged in. Welcome John"
}
```

### Account Endpoints

#### GET `/api/v1/account/balance`
Get current account balance.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "message": "Balance fetch successful",
  "balance": 1500.50
}
```

#### GET `/api/v1/account/transactions`
Get transaction history.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "message": "Transactions fetched successfully",
  "transactions": [
    {
      "type": "sent",
      "user": "johndoe",
      "name": "John Doe",
      "amount": 100.00,
      "currency": "INR",
      "date": "2024-01-15T10:30:00Z",
      "status": "success",
      "note": "Payment for services"
    }
  ]
}
```

#### POST `/api/v1/account/transfer`
Transfer money to another user.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "receiverUsername": "janedoe",
  "amount": 100.00
}
```

**Response:**
```json
{
  "message": "Funds successfully transferred"
}
```

### User Profile Endpoints

#### GET `/api/v1/users/profile`
Get user profile information.

#### PUT `/api/v1/users/email`
Update user email address.

#### PUT `/api/v1/users/username`
Update username.

---

## 🎨 UI/UX Features

### Design System
- **Modern FinTech Aesthetic** - Professional, trustworthy design
- **Responsive Grid System** - Mobile-first responsive design
- **Consistent Color Palette** - Primary, secondary, and accent colors
- **Typography Scale** - Hierarchical text system
- **Component Library** - Reusable UI components

### Interactive Elements
- **Smooth Transitions** - CSS transitions and Framer Motion animations
- **Hover Effects** - Interactive feedback on user actions
- **Loading States** - Skeleton screens and loading spinners
- **Toast Notifications** - User feedback for actions
- **Form Validation** - Real-time input validation

### Accessibility
- **Keyboard Navigation** - Full keyboard accessibility
- **Screen Reader Support** - ARIA labels and semantic HTML
- **Color Contrast** - WCAG 2.1 AA compliance
- **Focus Management** - Proper focus indicators
- **Reduced Motion** - Respects user motion preferences

---

## 🔒 Security Features

### Authentication & Authorization
- **JWT Tokens** - Secure, stateless authentication
- **Token Expiration** - Automatic token refresh mechanism
- **Password Policies** - Strong password requirements
- **Account Lockout** - Protection against brute force attacks

### Data Protection
- **Input Sanitization** - XSS protection
- **SQL Injection Prevention** - Parameterized queries
- **CORS Configuration** - Controlled cross-origin access
- **Rate Limiting** - API abuse prevention

### Financial Security
- **Transaction Validation** - Multi-layer transaction verification
- **Balance Checks** - Real-time balance validation
- **Audit Trails** - Complete transaction logging
- **Fraud Detection** - Suspicious activity monitoring

---

## 📊 Performance

### Frontend Optimization
- **Code Splitting** - Dynamic imports for better loading
- **Lazy Loading** - Component-level code splitting
- **Image Optimization** - WebP format with fallbacks
- **Bundle Analysis** - Optimized bundle sizes
- **Caching Strategy** - Browser and CDN caching

### Backend Performance
- **Database Indexing** - Optimized query performance
- **Connection Pooling** - Efficient database connections
- **Response Caching** - Redis-based caching layer
- **Compression** - Gzip response compression
- **Load Balancing** - Horizontal scaling support

### Monitoring & Analytics
- **Performance Metrics** - Core Web Vitals tracking
- **Error Tracking** - Comprehensive error logging
- **User Analytics** - Usage pattern analysis
- **Health Checks** - System health monitoring

---

## 🧪 Testing

### Frontend Testing
```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

### Backend Testing
```bash
# Run unit tests
npm run test

# Run API tests
npm run test:api

# Run load tests
npm run test:load
```

### Test Coverage
- **Unit Tests** - Component and function testing
- **Integration Tests** - API endpoint testing
- **E2E Tests** - Full user journey testing
- **Performance Tests** - Load and stress testing

---

## 📦 Deployment

### Production Build
```bash
# Build frontend
cd frontend
npm run build

# Build backend
cd backend
npm run build
```

### Environment Variables
```env
# Production
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb://production-db:27017/walletx
JWT_SECRET=production-jwt-secret
CORS_ORIGIN=https://walletx.com
```

### Deployment Platforms
- **Frontend** - Vercel, Netlify, or AWS S3
- **Backend** - Heroku, AWS EC2, or Google Cloud
- **Database** - MongoDB Atlas or AWS DocumentDB
- **CDN** - Cloudflare or AWS CloudFront

### Docker Deployment
```bash
# Build and run with Docker
docker-compose up -d

# Or build individual containers
docker build -t walletx-frontend ./frontend
docker build -t walletx-backend ./backend
```

---

## 🤝 Contributing

We welcome contributions from the community! Please read our contributing guidelines.

### Development Workflow
1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** and add tests
4. **Commit your changes** (`git commit -m 'Add amazing feature'`)
5. **Push to the branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Code Standards
- **TypeScript** - Strict type checking enabled
- **ESLint** - Consistent code formatting
- **Prettier** - Automatic code formatting
- **Conventional Commits** - Standard commit message format

### Testing Requirements
- **Unit Tests** - Minimum 80% coverage
- **Integration Tests** - All API endpoints covered
- **E2E Tests** - Critical user flows tested

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Paytm** - Inspiration for the wallet concept
- **React Team** - Amazing frontend framework
- **Node.js Community** - Robust backend ecosystem
- **MongoDB** - Flexible NoSQL database
- **Tailwind CSS** - Utility-first CSS framework

---

## 📞 Support

- **Documentation** - [docs.walletx.com](https://docs.walletx.com)
- **Issues** - [GitHub Issues](https://github.com/yourusername/walletx/issues)
- **Discussions** - [GitHub Discussions](https://github.com/yourusername/walletx/discussions)
- **Email** - support@walletx.com

---

<div align="center">

**Made with ❤️ by Jagpreet **

[![GitHub stars](https://img.shields.io/github/stars/yourusername/walletx?style=social)](https://github.com/yourusername/walletx)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/walletx?style=social)](https://github.com/yourusername/walletx)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/walletx)](https://github.com/yourusername/walletx/issues)

</div>
