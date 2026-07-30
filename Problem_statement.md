# Problem Statement

## 1. Title

Secure Cloth Rental Platform

---

## 2. Domain

E-Commerce / Rental Management / Cyber Security

---

## 3. Who is the user? (2-3 user types, with roles)

### Customer

- Register and log in to the platform.
- Browse available clothes.
- Rent clothes and make payments.
- View booking history.

### Vendor

- Add, edit, and remove clothes.
- Manage rental orders.
- View transaction details.

### Admin

- Manage users and vendors.
- Monitor transactions.
- Detect suspicious activities and booking manipulation.

---

## 4. What problem are we solving? (3-5 sentences, real-life example)

Many cloth rental platforms store user data and transaction details, which are vulnerable to cyber attacks such as data theft, fake bookings, and payment manipulation.

For example, a user may try to change the rental price using browser tools or create duplicate bookings.

The platform must protect sensitive user information, ensure secure transactions, and prevent unauthorized access.

This project aims to build a secure cloth rental system with proper authentication and security mechanisms.

---

## 5. Proposed Solution (what the application will do, feature-wise)

- User registration and login system.
- Secure password storage using encryption.
- Browse and search rental clothes.
- Book clothes online.
- Secure payment processing.
- Prevent duplicate bookings and order manipulation.
- Role-based access control for customers, vendors, and admins.
- Transaction history and booking management.
- Security logs for monitoring suspicious activities.

---

## 6. Core Entities / Database Tables (list all, minimum 5)

1. Users
2. Vendors
3. Clothes
4. Bookings
5. Payments
6. Transactions
7. AuditLogs

---

## 7. User Roles & Permissions (minimum 2 distinct roles)

### Customer

- Register and log in.
- View clothes.
- Book clothes.
- Make payments.

### Vendor

- Add and manage clothes.
- View orders.

### Admin

- Manage users and vendors.
- Monitor transactions.
- Block suspicious accounts.

---

## 8. Success Criteria

- A user should be able to register and log in within one minute.
- A user should be able to rent clothes successfully.
- Payments must be securely processed.
- Unauthorized users should not access protected data.
- Booking manipulation attempts should be detected and blocked.

---

## 9. Out of Scope (clearly list what you will NOT build)

- Real-time chat system.
- Delivery tracking.
- AI-based recommendation system.
- Mobile application.
- Social media integration.

---

## 10. Chosen Track

Python (FastAPI)