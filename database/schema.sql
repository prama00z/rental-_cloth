CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    phone VARCHAR(15),
    role VARCHAR(20),
    created_at DATETIME
);
CREATE TABLE vendors (
    vendor_id INT PRIMARY KEY AUTO_INCREMENT,
    vendor_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15),
    address VARCHAR(255),
    created_at DATETIME
);
CREATE TABLE clothes (
    cloth_id INT PRIMARY KEY AUTO_INCREMENT,
    vendor_id INT,
    cloth_name VARCHAR(100),
    category VARCHAR(50),
    size VARCHAR(20),
    price INT,
    availability VARCHAR(20),
    description VARCHAR(255),
    FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id)
);
CREATE TABLE bookings (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    cloth_id INT,
    booking_date DATE,
    return_date DATE,
    status VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (cloth_id) REFERENCES clothes(cloth_id)
);
CREATE TABLE transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    status VARCHAR(20),
    transaction_type VARCHAR(50),
    created_at DATETIME
);
CREATE TABLE payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT,
    amount INT,
    payment_status VARCHAR(20),
    transaction_id INT,
    payment_date DATETIME,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id),
    FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id)
);
CREATE TABLE auditlogs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(100),
    ip_address VARCHAR(50),
    timestamp DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);