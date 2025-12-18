# Expense Tracker - Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CLIENT SIDE (Port 3000)                         │
│                                                                           │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    React + Vite Frontend                          │   │
│  │                                                                    │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │   │
│  │  │  App.jsx     │  │ Components   │  │   Hooks      │           │   │
│  │  │  - Expenses  │  │  - Forms     │  │  - useState  │           │   │
│  │  │  - Category  │  │  - List      │  │  - useEffect │           │   │
│  │  │  - Filter    │  │  - Stats     │  │  - Context   │           │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘           │   │
│  │         │                    │                 │                 │   │
│  │         └────────────────────┴─────────────────┘                 │   │
│  │                        │                                         │   │
│  │                   Axios/Fetch                                    │   │
│  └────────────────────────┼─────────────────────────────────────────┘   │
│                           │                                               │
│                    API Calls (CORS)                                      │
│                           │                                               │
└───────────────────────────┼───────────────────────────────────────────────┘
                            │
                            │ HTTP/REST
                            │
┌───────────────────────────┼───────────────────────────────────────────────┐
│                    BACKEND SIDE (Port 8080)                               │
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │              Spring Boot REST API Layer                             │  │
│  │                                                                     │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │  │
│  │  │ Controllers  │  │ Controllers  │  │ Controllers  │            │  │
│  │  ├──────────────┤  ├──────────────┤  ├──────────────┤            │  │
│  │  │ AuthCtrl     │  │ ExpenseCtrl  │  │ CategoryCtrl  │            │  │
│  │  │              │  │              │  │              │            │  │
│  │  │ POST /register│  │ GET /all    │  │ GET /all     │            │  │
│  │  │ POST /login  │  │ POST /create │  │ POST /create │            │  │
│  │  │ POST /logout │  │ PUT /update  │  │ PUT /update  │            │  │
│  │  │              │  │ DELETE /     │  │ DELETE /     │            │  │
│  │  │              │  │ GET /stats   │  │              │            │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘            │  │
│  │         │                 │                   │                  │  │
│  └─────────┼─────────────────┼───────────────────┼──────────────────┘  │
│            │                 │                   │                      │
│  ┌─────────┼─────────────────┼───────────────────┼──────────────────┐  │
│  │ Security & Filters                                              │  │
│  │                                                                 │  │
│  │  ┌──────────────────┐  ┌──────────────────────────────────┐    │  │
│  │  │ JWT Token Filter │  │ CORS Configuration              │    │  │
│  │  │ - Validates JWT  │  │ - Allow frontend origin         │    │  │
│  │  │ - Extracts User  │  │ - Set allowed methods           │    │  │
│  │  └──────────────────┘  └──────────────────────────────────┘    │  │
│  │         │                                                        │  │
│  └─────────┼────────────────────────────────────────────────────────┘  │
│            │                                                            │
│  ┌─────────┼────────────────────────────────────────────────────────┐  │
│  │          Service Layer (Business Logic)                         │  │
│  │                                                                  │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │  │
│  │  │ UserService  │  │ExpenseService│  │CategoryService│         │  │
│  │  │              │  │              │  │              │          │  │
│  │  │ - Register   │  │ - Add        │  │ - Create     │          │  │
│  │  │ - Login      │  │ - Update     │  │ - Fetch all  │          │  │
│  │  │ - Validate   │  │ - Delete     │  │ - Update     │          │  │
│  │  │ - JWT Gen    │  │ - Get by cat │  │ - Delete     │          │  │
│  │  │              │  │ - Analytics  │  │              │          │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘          │  │
│  │         │                 │                   │                 │  │
│  └─────────┼─────────────────┼───────────────────┼─────────────────┘  │
│            │                 │                   │                     │
│  ┌─────────┼─────────────────┼───────────────────┼─────────────────┐  │
│  │          Repository Layer (Data Access)                        │  │
│  │                                                                 │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │  │
│  │  │UserRepository│  │ExpenseRepository│ CategoryRepository│    │  │
│  │  │              │  │              │  │              │         │  │
│  │  │Spring Data   │  │Spring Data   │  │Spring Data   │         │  │
│  │  │JPA           │  │JPA           │  │JPA           │         │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘         │  │
│  │         │                 │                   │                │  │
│  └─────────┼─────────────────┼───────────────────┼────────────────┘  │
│            │                 │                   │                    │
└────────────┼─────────────────┼───────────────────┼────────────────────┘
             │                 │                   │
             └─────────────────┴───────────────────┘
                        │
                   JDBC/SQL
                        │
┌───────────────────────┴───────────────────────────────────────────────┐
│                                                                         │
│                    DATABASE (MySQL)                                    │
│                                                                         │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐           │
│  │  users         │  │  categories    │  │  expenses      │           │
│  ├────────────────┤  ├────────────────┤  ├────────────────┤           │
│  │ id (PK)        │  │ id (PK)        │  │ id (PK)        │           │
│  │ username       │  │ name           │  │ title          │           │
│  │ email          │  │ user_id (FK)   │  │ amount         │           │
│  │ password       │  │ created_at     │  │ category_id(FK)│           │
│  │ created_at     │  │ updated_at     │  │ user_id (FK)   │           │
│  │ updated_at     │  │                │  │ expense_date   │           │
│  │                │  │                │  │ description    │           │
│  │                │  │                │  │ created_at     │           │
│  │                │  │                │  │ updated_at     │           │
│  └────────────────┘  └────────────────┘  └────────────────┘           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Component Interaction Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER INTERACTIONS                             │
└─────────────────────────────────────────────────────────────────┘

1. USER REGISTRATION/LOGIN
   ┌──────────┐         ┌──────────┐         ┌──────────┐
   │ Frontend │─POST──▶ │ Backend  │─────▶   │ Database │
   │ Form     │/register│ Auth Ctrl│ Store   │ Users    │
   └──────────┘         └──────────┘ User    └──────────┘
       ▲                     │
       │                     │ Generate JWT Token
       └─────────────────────┘
                JWT stored in localStorage

2. CREATE EXPENSE
   ┌──────────┐         ┌──────────┐         ┌──────────┐
   │ Frontend │─POST──▶ │ Backend  │─────▶   │ Database │
   │ Form     │/expenses│ Service  │ Save    │ Expenses │
   └──────────┘ (JWT)   └──────────┘ Expense └──────────┘
       ▲                     │
       │                     │ Return saved expense
       └─────────────────────┘

3. FETCH EXPENSES
   ┌──────────┐         ┌──────────┐         ┌──────────┐
   │ Frontend │─GET───▶ │ Backend  │─────▶   │ Database │
   │ Display  │/expenses│ Service  │ Query   │ Expenses │
   └──────────┘ (JWT)   └──────────┘ & User  └──────────┘
       ▲                     │
       │                     │ Return all user expenses
       └─────────────────────┘

4. UPDATE/DELETE EXPENSE
   ┌──────────┐         ┌──────────┐         ┌──────────┐
   │ Frontend │─PUT/──▶ │ Backend  │─────▶   │ Database │
   │ Forms    │DELETE   │ Service  │ Update/ │ Expenses │
   └──────────┘ (JWT)   └──────────┘ Delete  └──────────┘
       ▲                     │
       │                     │ Return status
       └─────────────────────┘
```

---

## Authentication Flow (JWT)

```
┌─────────────────────────────────────────────────────────┐
│               JWT AUTHENTICATION FLOW                    │
└─────────────────────────────────────────────────────────┘

1. LOGIN
   Frontend                Backend           Database
      │                      │                   │
      │ POST /login ────────▶ │                   │
      │ (username, password)  │ Query User ─────▶ │
      │                       │ Find & Verify     │
      │                       │ ◀─── User found ──│
      │                       │                   │
      │                       │ Generate JWT Token
      │                       │ (Header.Payload.Signature)
      │                       │
      │ ◀─────JWT Token ──────│
      │ Store in localStorage │
      │                       │

2. REQUEST WITH JWT
   Frontend                Backend
      │                      │
      │ GET /expenses ──────▶ │
      │ Headers:             │
      │ Authorization:       │ Validate JWT
      │ Bearer <JWT>         │ ◀─────────────
      │                      │ ✓ Valid & Not Expired
      │                      │
      │                      │ Extract User ID
      │                      │ Fetch User's Expenses
      │                      │
      │ ◀─ Expenses Data ─────│
      │                       │

3. INVALID/EXPIRED TOKEN
   Frontend                Backend
      │                      │
      │ GET /expenses ──────▶ │
      │ Bearer <EXPIRED_JWT>  │ Validate JWT
      │                       │ ◀─────────────
      │                       │ ✗ Token Expired
      │                       │
      │ ◀─ 401 Unauthorized ──│
      │ Redirect to Login     │
```

---

## Security Architecture

```
┌──────────────────────────────────────────────────────────┐
│                  SECURITY LAYERS                         │
└──────────────────────────────────────────────────────────┘

Request from Frontend
        │
        ▼
┌──────────────────────────┐
│  1. CORS Filter          │
│  - Check Origin          │
│  - Validate Methods      │
│  - Check Credentials     │
└──────────────────────────┘
        │
        ▼
┌──────────────────────────┐
│  2. JWT Auth Filter      │
│  - Extract Token         │
│  - Validate Signature    │
│  - Check Expiration      │
│  - Get User Claims       │
└──────────────────────────┘
        │
        ▼
┌──────────────────────────┐
│  3. Spring Security      │
│  - User Authentication   │
│  - Role-based Access     │
│  - Resource Authorization│
└──────────────────────────┘
        │
        ▼
┌──────────────────────────┐
│  4. Controller           │
│  - Route Request         │
│  - Call Service          │
└──────────────────────────┘
        │
        ▼
┌──────────────────────────┐
│  5. Service Layer        │
│  - Business Logic        │
│  - Validation            │
│  - Exception Handling    │
└──────────────────────────┘
        │
        ▼
┌──────────────────────────┐
│  6. Database Query       │
│  - Access Data           │
│  - Return Results        │
└──────────────────────────┘
```

---

## Deployment Architecture (Optional)

```
┌─────────────────────────────────────────────────────────┐
│         PRODUCTION DEPLOYMENT SETUP                      │
└─────────────────────────────────────────────────────────┘

Internet
   │
   ▼
┌─────────────────────┐
│  Domain / DNS       │
│  (example.com)      │
└─────────────────────┘
   │
   ├──────────────────────┐
   │                      │
   ▼                      ▼
┌──────────────┐    ┌──────────────┐
│ Frontend     │    │ Backend      │
│ (Vercel)     │    │ (Heroku/AWS) │
│ Port 3000    │    │ Port 8080    │
│ React App    │    │ Spring Boot  │
└──────────────┘    └──────────────┘
   │                      │
   └──────────────────────┘
                │
                ▼
         ┌──────────────┐
         │  Database    │
         │  (AWS RDS)   │
         │  MySQL       │
         └──────────────┘
```

---

## Technology Stack Summary

```
┌─────────────────────────────────────────────┐
│  FRONTEND                                    │
├─────────────────────────────────────────────┤
│ Framework:  React 18 + Vite                 │
│ Styling:   Tailwind CSS                     │
│ Icons:     Lucide React                     │
│ Port:      3000                             │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  BACKEND                                     │
├─────────────────────────────────────────────┤
│ Framework:  Spring Boot 3.x                 │
│ Language:   Java 17+                        │
│ Security:   JWT + Spring Security           │
│ API:        RESTful                         │
│ Port:       8080                            │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  DATABASE                                    │
├─────────────────────────────────────────────┤
│ Database:  MySQL 8.0+                       │
│ ORM:       JPA/Hibernate                    │
│ Query:     JDBC                             │
└─────────────────────────────────────────────┘
```
