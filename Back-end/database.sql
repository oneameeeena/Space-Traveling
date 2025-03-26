-- Database schema for Space Travel Booking Platform

CREATE DATABASE IF NOT EXISTS space_travel;
USE space_travel;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    departure_date DATE NOT NULL,
    destination ENUM('iss', 'moon', 'mars', 'orbit') NOT NULL,
    seat_class ENUM('economy', 'business', 'first', 'vip') NOT NULL,
    status ENUM('confirmed', 'pending', 'cancelled') DEFAULT 'confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Accommodations table
CREATE TABLE IF NOT EXISTS accommodations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location ENUM('iss', 'moon', 'mars', 'orbit') NOT NULL,
    type ENUM('pod', 'suite', 'cabin') NOT NULL,
    price_per_night DECIMAL(10, 2) NOT NULL,
    capacity INT NOT NULL,
    description TEXT
);

-- Sample data
INSERT INTO users (name, email, password) VALUES 
('John Smith', 'john@example.com', 'hashed_password_123'),
('Sarah Johnson', 'sarah@example.com', 'hashed_password_456');

INSERT INTO bookings (user_id, departure_date, destination, seat_class) VALUES 
(1, '2024-06-15', 'iss', 'vip'),
(2, '2024-07-20', 'moon', 'business');

INSERT INTO accommodations (name, location, type, price_per_night, capacity, description) VALUES 
('Zero-G Luxury Pod', 'iss', 'pod', 25000.00, 1, 'Experience weightlessness in our premium pods'),
('Lunar View Suite', 'moon', 'suite', 18000.00, 2, 'Private suite with panoramic moon views'),
('Standard Orbital Cabin', 'orbit', 'cabin', 9500.00, 4, 'Comfortable accommodations for budget travelers');