# 🏪 SmartBiz — Smart Small Business Management Web Application

<div align="center">

![SmartBiz Banner](https://img.shields.io/badge/SmartBiz-Business%20Management%20System-1a3c5e?style=for-the-badge&logo=spring&logoColor=white)

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20App-smartbizi.netlify.app-2e86ab?style=for-the-badge)](https://smartbizi.netlify.app/index.html)
[![Backend API](https://img.shields.io/badge/⚙️%20Backend%20API-Render-27ae60?style=for-the-badge)](https://smart-small-businessmanagement-backend-2.onrender.com)
[![Demo Video](https://img.shields.io/badge/▶️%20Demo%20Video-YouTube-FF0000?style=for-the-badge&logo=youtube)](https://youtu.be/ZV68jqSLxlc)
[![GitHub](https://img.shields.io/badge/📂%20Source%20Code-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/K-Shalom/Smart-Small-BusinessManagement-Backend)

</div>
---
- **Prepared by:** Shalom KUBWIMBABAZI
- **Reg No:** 24RP00257
- **Institution:** Rwanda Polytechnic – Karongi College
- **Trainer:** Mr. NISHIMWE Gabriel
- **Year:** 2026

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Live Links](#-live-links)
- [Demo Video](#-demo-video)
- [Test Credentials](#-test-credentials)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Database Schema](#-database-schema)
- [User Roles & Access](#-user-roles--access)
- [Core Features](#-core-features)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [How to Run Locally](#-how-to-run-locally)
- [Development Phases](#-development-phases)
- [Business Logic](#-business-logic)
- [Security](#-security)
- [Known Lessons Learned](#-known-lessons-learned)
- [Future Plans (Version 2.0)](#-future-plans-version-20)

---

## 📖 Project Overview

**SmartBiz** is a full-stack, secure web-based system designed to help small and medium enterprises manage their daily business operations digitally.

The system enables business owners and staff to:

- ✅ Manage users with role-based access (**Admin**, **Cashier**)
- ✅ Manage products (with real-time stock tracking) and services
- ✅ Record and track sales and expenses
- ✅ Automatically calculate net profit
- ✅ Generate professional business reports in **PDF format**
- ✅ Secure login with **JWT authentication** and **BCrypt** password hashing

---

## 🌐 Live Links

| Resource | URL |
|----------|-----|
| 🌐 **Frontend (Live App)** | https://smartbizi.netlify.app/index.html |
| ⚙️ **Backend API (Render)** | https://smart-small-businessmanagement-backend-2.onrender.com |
| 📂 **GitHub Repository** | https://github.com/K-Shalom/Smart-Small-BusinessManagement-Backend |
| ▶️ **Demo Video (YouTube)** | https://youtu.be/ZV68jqSLxlc |

> **Note:** The backend is hosted on Render's free tier. On first request, it may take **30–60 seconds** to wake up (cold start). Please wait if the login takes a moment.

---

## ▶️ Demo Video

Watch the full system demonstration on YouTube:

**🎬 https://youtu.be/ZV68jqSLxlc**

The video covers:
- Login flow for Admin and Cashier
- Product and Service management
- Recording a sale with automatic stock deduction
- Expense recording
- PDF report generation
- User management

---

## 🔑 Test Credentials

Use the following accounts to log in and test all system features.  
Go to: **https://smartbizi.netlify.app/index.html**

### 👤 Admin Account — Full Access

| Field | Value |
|-------|-------|
| **Username** | `shalom` |
| **Password** | `Admin@1234` |
| **Role** | `ADMIN` |
| **Email** | shalommbabazi250@gmail.com |
| **Access** | Full system access — all modules |

### 👤 Cashier Account — Limited Access

| Field | Value |
|-------|-------|
| **Username** | `joel` |
| **Password** | `Shalx@123` |
| **Role** | `CASHIER` |
| **Email** | joe@gmail.com |
| **Access** | Sales recording + limited dashboard |

> **Security Note:** Passwords above are plain-text login values. They are stored in the database as **BCrypt hashes** — never in plain text.

### Access Flow

**Admin Login:**
1. Go to https://smartbizi.netlify.app/index.html
2. Enter username: `shalom` | Password: `Admin@1234`
3. Click **Login** → credentials sent via `POST /api/auth/login`
4. JWT token stored in `localStorage` → redirected to `dashboard-admin`
5. Full access: Dashboard, Products, Services, Clients, Sales, Expenses, Reports, Users

**Cashier Login:**
1. Go to https://smartbizi.netlify.app/index.html
2. Enter username: `joel` | Password: `Shalx@123`
3. Click **Login** → JWT token stored → redirected to `dashboard-cashier`
4. Limited access: Record Sales, View Products/Services/Clients (read-only)
5. Accessing admin pages (e.g. `/users`) returns **HTTP 403** → frontend redirects to dashboard

---

## 🛠️ Technology Stack

### Backend
| Technology | Details |
|-----------|---------|
| **Java** | Java 21 |
| **Spring Boot** | 3.5.0 |
| **Spring Security** | 6.x — Role-based access control |
| **Spring Data JPA** | Hibernate ORM |
| **MySQL** | 8.0+ via XAMPP (local) / Render (deployed) |
| **Maven** | 3.8+ — Build tool |
| **Lombok** | Boilerplate reduction |
| **JWT** | jjwt 0.12.6 — Stateless authentication |
| **iText** | 5.5.13.3 — Server-side PDF generation |

### Frontend
| Technology | Details |
|-----------|---------|
| **HTML5 / CSS3** | Markup and styling |
| **Bootstrap** | Responsive layout |
| **Vanilla JavaScript** | DOM manipulation and logic |
| **Fetch API** | REST API communication |
| **Chart.js** | Dashboard charts and visualizations |

### Deployment
| Layer | Platform |
|-------|---------|
| **Frontend** | Netlify (https://smartbizi.netlify.app) |
| **Backend** | Render (https://smart-small-businessmanagement-backend-2.onrender.com) |
| **Database** | MySQL on Render |

---

## 🏗️ Architecture

The system follows the **MVC (Model–View–Controller)** architectural pattern with a fully separated frontend and backend communicating through **REST APIs**.

```
┌─────────────────────────────────────────────────┐
│            Client Layer (Browser)               │
│      https://smartbizi.netlify.app              │
└──────────────────┬──────────────────────────────┘
                   │ HTTP / REST API (JSON)
┌──────────────────▼──────────────────────────────┐
│         Presentation Layer                      │
│    HTML · CSS · Bootstrap · JavaScript          │
│          Fetch API · Chart.js                   │
└──────────────────┬──────────────────────────────┘
                   │ JWT Bearer Token
┌──────────────────▼──────────────────────────────┐
│         Controller Layer                        │
│      Spring Boot REST Controllers               │
│  https://smart-small-businessmanagement-        │
│         backend-2.onrender.com/api              │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│       Business Logic Layer                      │
│            Service Classes                      │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│       Data Access Layer                         │
│         JPA Repositories                        │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│          Database Layer                         │
│              MySQL 8                            │
└─────────────────────────────────────────────────┘
```

### Backend Package Structure

```
com.smartbusiness
 ├── controller/       ← REST API endpoints
 ├── service/          ← Business logic
 ├── repository/       ← JPA data access
 ├── model/            ← Entity classes (JPA)
 ├── dto/              ← Data Transfer Objects
 ├── config/           ← SecurityConfig, CORS
 └── security/         ← JwtUtil, JwtAuthFilter
```

---

## 🗄️ Database Schema

| Table | Description |
|-------|-------------|
| `users` | System users (Admin, Cashier) |
| `client` | Business clients / customers |
| `product` | Products with stock management |
| `service` | Services offered by the business |
| `sale` | Sales transactions (header) |
| `sale_detail` | Line items per sale (products/services) |
| `expense` | Business expenses |
| `report` | Generated business reports |

**Constraints:**
- All primary keys use `BIGINT` (mapped to `Long` in Java)
- Foreign keys link `sale_detail → sale`, `sale_detail → product/service`, `sale → client`
- `DECIMAL(10,2)` used for all monetary values (prices, totals, expenses)
- `UNIQUE` constraints on `users.username` and `users.email`

---

## 👥 User Roles & Access

| Feature / Module | Admin | Cashier |
|-----------------|-------|---------|
| Login / Logout | ✅ Yes | ✅ Yes |
| Admin Dashboard | ✅ Yes | ❌ No |
| Cashier Dashboard | ❌ No | ✅ Yes |
| View Products / Services / Clients | ✅ Yes | ✅ Read-only |
| Add / Edit / Delete Products | ✅ Yes | ❌ No |
| Add / Edit / Delete Services | ✅ Yes | ❌ No |
| Add / Edit / Delete Clients | ✅ Yes | ❌ No |
| Record Sales | ✅ Yes | ✅ Yes |
| View Sales | ✅ All sales | ✅ Own only |
| Add / View Expenses | ✅ Yes | ❌ No |
| Generate PDF Reports | ✅ Yes | ❌ No |
| User Management (CRUD) | ✅ Yes | ❌ No |
| View Profit Summary | ✅ Yes | ❌ No |

---

## ⚡ Core Features

1. **Secure Login** — JWT authentication with BCrypt password hashing
2. **Role-Based Dashboards** — Separate dashboards for Admin and Cashier
3. **Product Management** — Full CRUD with real-time stock tracking
4. **Service Management** — Full CRUD for intangible business offerings
5. **Client Management** — Customer records with Quick Add from Sales form
6. **Sales Recording** — Multi-item sales with automatic stock deduction; insufficient stock validation
7. **Expense Tracking** — Record and categorize all business expenses
8. **Profit Calculation** — Automatic: `Net Profit = Total Sales − Total Expenses`
9. **PDF Reports** — Professional reports generated server-side with iText 5
10. **User Management** — Admin can create/edit/delete user accounts with roles
11. **Dashboard Analytics** — Chart.js bar charts for Sales vs Expenses trends
12. **Secure Logout** — JWT cleared from localStorage; session invalidated

---

## 🔌 API Endpoints

**Base URL (Production):** `https://smart-small-businessmanagement-backend-2.onrender.com/api`  
**Base URL (Local):** `http://localhost:8080/api`

**Authentication Header:** `Authorization: Bearer <JWT_TOKEN>`

### Auth
```
POST   /api/auth/login              → Authenticate user, returns JWT token
```

### Users (Admin only)
```
GET    /api/users                   → Get all users
POST   /api/users                   → Create new user (password auto-hashed)
PUT    /api/users/{id}              → Update user
DELETE /api/users/{id}              → Delete user
```

### Products
```
GET    /api/products                → Get all products (Admin + Cashier)
POST   /api/products                → Create product (Admin only)
PUT    /api/products/{id}           → Update product (Admin only)
DELETE /api/products/{id}           → Delete product (Admin only)
```

### Services
```
GET    /api/services                → Get all services (Admin + Cashier)
POST   /api/services                → Create service (Admin only)
PUT    /api/services/{id}           → Update service (Admin only)
DELETE /api/services/{id}           → Delete service (Admin only)
```

### Clients
```
GET    /api/clients                 → Get all clients (Admin + Cashier)
POST   /api/clients                 → Create client (Admin + Cashier)
PUT    /api/clients/{id}            → Update client (Admin only)
DELETE /api/clients/{id}            → Delete client (Admin only)
```

### Sales
```
GET    /api/sales                   → Get all sales (Admin + Cashier)
GET    /api/sales/{id}              → Get sale with details
POST   /api/sales                   → Record new sale — auto-decrements stock
DELETE /api/sales/{id}              → Delete sale (Admin only)
```

### Expenses (Admin only)
```
GET    /api/expenses                → Get all expenses
POST   /api/expenses                → Record expense
DELETE /api/expenses/{id}           → Delete expense
```

### Reports (Admin only)
```
GET    /api/reports/summary         → Financial summary (sales, expenses, profit)
GET    /api/reports/pdf             → Download PDF report (all time)
GET    /api/reports/pdf?type=daily  → Download daily PDF report
GET    /api/reports/pdf?type=monthly → Download monthly PDF report
```

### Dashboard
```
GET    /api/dashboard/summary       → KPI totals for dashboard cards
```

---

## 📁 Project Structure

```
Smart-Small-BusinessManagement-Backend/
├── src/
│   └── main/
│       ├── java/com/smartbusiness/
│       │   ├── controller/
│       │   │   ├── AuthController.java
│       │   │   ├── UserController.java
│       │   │   ├── ProductController.java
│       │   │   ├── ServiceController.java
│       │   │   ├── ClientController.java
│       │   │   ├── SaleController.java
│       │   │   ├── ExpenseController.java
│       │   │   ├── ReportController.java
│       │   │   └── DashboardController.java
│       │   ├── service/
│       │   │   ├── UserService.java
│       │   │   ├── ProductService.java
│       │   │   ├── ServiceService.java
│       │   │   ├── ClientService.java
│       │   │   ├── SaleService.java
│       │   │   ├── ExpenseService.java
│       │   │   └── ReportService.java
│       │   ├── repository/
│       │   │   ├── UserRepository.java
│       │   │   ├── ProductRepository.java
│       │   │   ├── ServiceRepository.java
│       │   │   ├── ClientRepository.java
│       │   │   ├── SaleRepository.java
│       │   │   ├── SaleDetailRepository.java
│       │   │   └── ExpenseRepository.java
│       │   ├── model/
│       │   │   ├── User.java
│       │   │   ├── Product.java
│       │   │   ├── Service.java
│       │   │   ├── Client.java
│       │   │   ├── Sale.java
│       │   │   ├── SaleDetail.java
│       │   │   └── Expense.java
│       │   ├── dto/
│       │   │   ├── LoginRequest.java
│       │   │   ├── LoginResponse.java
│       │   │   ├── UserDTO.java
│       │   │   ├── ProductDTO.java
│       │   │   ├── SaleDTO.java
│       │   │   └── ...
│       │   ├── config/
│       │   │   └── SecurityConfig.java
│       │   └── security/
│       │       ├── JwtUtil.java
│       │       └── JwtAuthFilter.java
│       └── resources/
│           └── application.properties
├── pom.xml
└── README.md
```

---

## 🚀 How to Run Locally

### Prerequisites
- Java 21+
- Maven 3.8+
- MySQL 8.0+ (XAMPP recommended)
- VS Code with Live Server extension (for frontend)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/K-Shalom/Smart-Small-BusinessManagement-Backend.git
cd Smart-Small-BusinessManagement-Backend
```

### 2. Create the Database

Open XAMPP → Start **Apache** and **MySQL** → Open phpMyAdmin:

```sql
CREATE DATABASE smartbusiness;
```

### 3. Configure `application.properties`

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/smartbusiness
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
jwt.secret=your_jwt_secret_key_here
```

### 4. Run the Backend

```bash
mvn spring-boot:run
```

Backend starts at: **http://localhost:8080**

### 5. Run the Frontend

```bash
# Open the frontend folder in VS Code
# Right-click on login.html (or index.html)
# Click "Open with Live Server"
```

Frontend runs at: **http://127.0.0.1:5500**

### 6. Test with Postman

Login:
```
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "username": "shalom",
  "password": "Admin@1234"
}
```

Copy the returned JWT token and use it as:
```
Authorization: Bearer <token>
```

---

## 📅 Development Phases

| Phase | Dates | Description | Status |
|-------|-------|-------------|--------|
| 1 | 19–30 Jan 2026 | Project Definition & Planning | ✅ COMPLETED |
| 2 | 31 Jan–06 Feb 2026 | Requirements Analysis | ✅ COMPLETED |
| 3 | 07–13 Feb 2026 | System & Architecture Design | ✅ COMPLETED |
| 4 | 14–20 Feb 2026 | Database Design | ✅ COMPLETED |
| 5 | 21–27 Feb 2026 | Backend Project Setup | ✅ COMPLETED |
| 6 | 28 Feb–13 Mar 2026 | Core API Development (CRUD) | ✅ COMPLETED |
| 7 | 14–20 Mar 2026 | Authentication & Security (JWT) | ✅ COMPLETED |
| 8 | 21 Mar–03 Apr 2026 | Advanced Features & Business Logic | ✅ COMPLETED |
| 9 | 04–10 Apr 2026 | Frontend Integration | ✅ COMPLETED |
| 10 | 11–17 Apr 2026 | Testing & Debugging | ✅ COMPLETED |
| 11 | 18–24 Apr 2026 | Deployment & Finalization | ✅ COMPLETED |

---

## 💡 Business Logic

| Rule | Description |
|------|-------------|
| **Stock Deduction** | When a sale is recorded, product stock quantity decreases automatically by the sold amount |
| **Insufficient Stock** | If sale quantity exceeds available stock, the backend rejects the request with a validation error |
| **Low Stock Alert** | When stock falls below `minimumStock`, the product is flagged as "Low Stock" |
| **Out of Stock** | When stock reaches 0, product is marked "Out of Stock" |
| **Sale Total** | `Sale Total = Σ (Unit Price × Quantity)` — calculated by the backend |
| **Discount** | Optional discount applied: `Final Amount = Subtotal − Discount` |
| **Net Profit** | `Net Profit = Total Sales − Total Expenses` — calculated in real time |
| **PDF Reports** | Generated server-side using iText 5.5.13.3, returned as downloadable file |

---

## 🔒 Security

| Aspect | Implementation |
|--------|---------------|
| **Password Storage** | BCrypt hashing — plain text never stored |
| **Authentication** | JWT (jjwt 0.12.6) — stateless tokens |
| **Token Storage** | Browser `localStorage` |
| **Request Auth** | `Authorization: Bearer <token>` header on every API call |
| **Authorization** | Spring Security with `hasAuthority("ROLE_ADMIN")` and `hasAuthority("ROLE_CASHIER")` |
| **Unauthorized** | HTTP 401 → Frontend redirects to login |
| **Forbidden** | HTTP 403 → Frontend redirects to dashboard |
| **CORS** | Configured in `SecurityConfig` to allow frontend origin |
| **Session** | Stateless — no server-side sessions; JWT expiry handles timeout |

---

## 📚 Known Lessons Learned

| Issue | Solution Applied |
|-------|-----------------|
| `hasRole("ADMIN")` prepends `ROLE_` automatically → double prefix bug | Use `hasAuthority("ROLE_ADMIN")` instead |
| Entity ID type mismatch (`Long` in Java vs `INT` in MySQL) → widespread failures | Standardized all IDs to `Long` in models, DTOs, repositories, services, and controllers |
| `LazyInitializationException` when accessing `SaleDetails` | Added `@Transactional(readOnly = true)` on `getAll()` in SaleService |
| Frontend field name mismatch with backend DTO → HTTP 400 errors | Aligned all frontend JSON field names with backend DTO field names exactly |
| Browser caching old JavaScript after fixes | Use `Ctrl + Shift + R` (hard reload) to clear cached scripts |
| `hasRole` vs `hasAuthority` mismatch in Spring Security 6 | Always use `hasAuthority("ROLE_ADMIN")` — never `hasRole()` |

---

## 🔮 Future Plans (Version 2.0)

Version 2.0 will introduce a **three-role architecture** with multi-business support:

| Role | Responsibilities |
|------|-----------------|
| **ADMIN** | Manages the entire platform — all businesses and all users |
| **BUSINESS OWNER** | Registers their own business, manages their own cashiers, views only their own business data |
| **CASHIER** | Records sales for the specific business they belong to |

Additional planned features:
- Business Owner self-registration flow
- Cashier account creation scoped to a business
- Data isolation per business (multi-tenant)
- Business Owner dashboard with business-specific analytics

---

## 📄 License

This project was developed as a **summative assessment** at **Rwanda Polytechnic – Karongi College**.

All rights reserved © 2026 **Shalom KUBWIMBABAZI** (Reg: 24RP00257)

---

<div align="center">

**SmartBiz** · Built with ❤️ by Shalom KUBWIMBABAZI · Rwanda Polytechnic, Karongi College · 2026

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20App-Visit%20Now-2e86ab?style=for-the-badge)](https://smartbizi.netlify.app/index.html)
[![Demo Video](https://img.shields.io/badge/▶️%20Watch%20Demo-YouTube-FF0000?style=for-the-badge&logo=youtube)](https://youtu.be/ZV68jqSLxlc)

</div>