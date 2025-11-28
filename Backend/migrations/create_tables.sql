CREATE TABLE IF NOT EXISTS aircrafts (
    aircraft_id SERIAL PRIMARY KEY,
    model VARCHAR(50) NOT NULL,
    manufacturer VARCHAR(50) NOT NULL,
    seating_capacity INT NOT NULL,
    economy_seats INT,
    business_seats INT
);

CREATE TABLE IF NOT EXISTS flights (
    flight_id SERIAL PRIMARY KEY,
    flight_number VARCHAR(10) NOT NULL,
    aircraft_id INT REFERENCES aircrafts(aircraft_id),
    departure VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    departure_date DATE NOT NULL,
    departure_time TIMESTAMP NOT NULL,
    economy_class_price DECIMAL(10, 2) NOT NULL,
    business_class_price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS passengers (
    passport_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contact_number VARCHAR(15)
);

CREATE TABLE IF NOT EXISTS bookings (
    booking_id SERIAL PRIMARY KEY,
    flight_id INT REFERENCES flights(flight_id),
    passport_id INT REFERENCES passengers(passport_id),
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    seat_numbers VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS payments (
    payment_id SERIAL PRIMARY KEY,
    booking_id INT REFERENCES bookings(booking_id),
    amount DECIMAL(10, 2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS tickets (
    ticket_id SERIAL PRIMARY KEY,
    booking_id INT REFERENCES bookings(booking_id),
    flight_id INT REFERENCES flights(flight_id),
    ticket_class VARCHAR(20) NOT NULL,
    seat_numbers VARCHAR(10) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    issue_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

