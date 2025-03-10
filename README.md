# IRCTC Backend

## Overview

This project is a Railway Management System API similar to IRCTC, built using **Node.js** and **MySQL**. The API allows users to check train availability between two stations, view seat availability, book seats, and manage bookings. It also includes role-based access control with two types of users: **Admin** and **Logged-in Users**.

The API is designed to handle real-time traffic and race conditions during seat bookings. It ensures that only one user can book a seat at a time when multiple users attempt to book simultaneously.

---

## Features

1. **User Registration**: Users can register on the platform.
2. **User Login**: Users can log in to their accounts and receive an authorization token.
3. **Admin Access**: Admins can add new train details.
4. **Train Availability**: Users can check train availability between two stations.
5. **Seat Booking**: Users can book seats on available trains.
6. **Booking Details**: Users can fetch details of their bookings.
7. **Role-Based Access Control**:
   - Admin: Can add trains.
   - Logged-in Users: Can check availability, book seats, and view booking details.
8. **API Security**:
   - Admin endpoints are protected with an API key.
   - User-specific endpoints require an authorization token.

---

## Tech Stack

- **Backend**: Node.js (Express.js)
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **API Security**: API Key for admin endpoints, JWT for user endpoints

---

## Setup Instructions

### Prerequisites

1. **Node.js**: Install Node.js from [here](https://nodejs.org/).
2. **MySQL**: Install MySQL from [here](https://dev.mysql.com/downloads/installer/).
3. **Git**: Install Git from [here](https://git-scm.com/).

### Steps to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Shaurya045/IRCTC_Backend-WorkIndia-.git
   cd IRCTC_Backend-WorkIndia-
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up the Database**:
   Execute the following SQL commands in MySQL to create the database and tables:
   ```sql
   CREATE DATABASE irctc;
   USE irctc;

   CREATE TABLE Users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       role ENUM('admin', 'user') NOT NULL
   );

   CREATE TABLE Trains (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       source VARCHAR(255) NOT NULL,
       destination VARCHAR(255) NOT NULL,
       total_seats INT NOT NULL
   );

   CREATE TABLE Bookings (
       id INT AUTO_INCREMENT PRIMARY KEY,
       user_id INT NOT NULL,
       train_id INT NOT NULL,
       seats_booked INT NOT NULL,
       booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (user_id) REFERENCES Users(id),
       FOREIGN KEY (train_id) REFERENCES Trains(id)
   );
   ```

4. **Set Up Environment Variables**:
   Create a `.env` file in the project root and add the following:
   ```env
   DB_HOST=127.0.0.1
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=irctc
   JWT_SECRET=your_jwt_secret
   ADMIN_API_KEY=your_admin_api_key
   PORT=3000
   ```

5. **Run the Server**:
   ```bash
   npm run dev
   ```

---

## API Endpoints for Testing in POSTMAN

### 1. **User Registration**
   **Endpoint:** `POST /api/v1/auth/register`
   
   **Request Body (JSON):**
   ```json
   {
       "username": "userA",
       "password": "password123",
       "role": "user"
   }
   ```
   
   **For Admin:**
   ```json
   {
       "username": "adminA",
       "password": "password123",
       "role": "admin"
   }
   ```

### 2. **User Login**
   **Endpoint:** `POST /api/v1/auth/login`
   
   **Request Body (JSON):**
   ```json
   {
       "username": "userA",
       "password": "password123"
   }
   ```
   
   **For Admin:**
   ```json
   {
       "username": "adminA",
       "password": "password123"
   }
   ```

### 3. **Add a New Train (Admin Only)**
   **Endpoint:** `POST /api/v1/trains`
   
   **Headers:**
   ```
   Authorization: your_admin_api_key
   ```
   
   **Request Body (JSON):**
   ```json
   {
       "name": "Express 123",
       "source": "Station Z",
       "destination": "Station Y",
       "total_seats": 70
   }
   ```

### 4. **Get Train Availability**
   **Endpoint:** `GET /api/v1/trains/available?source=Station Z&destination=Station Y`

### 5. **Book a Seat**
   **Endpoint:** `POST /api/v1/bookings`
   
   **Headers:**
   ```
   Authorization: Bearer user_jwt_token
   ```
   
   **Request Body (JSON):**
   ```json
   {
       "trainId": 1,
       "seats": 5
   }
   ```

### 6. **Get Booking Details**
   **Endpoint:** `GET /api/v1/bookings/:bookingId`
   
   **Headers:**
   ```
   Authorization: Bearer user_jwt_token
   ```
