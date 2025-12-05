CREATE TABLE aircrafts (
    aircraft_id VARCHAR(10) PRIMARY KEY,
    model VARCHAR(50) NOT NULL,
    manufacturer VARCHAR(50) NOT NULL,
    economy_rows INT NOT NULL,
    economy_layout VARCHAR(50) NOT NULL,
    business_rows INT NOT NULL,
    business_layout VARCHAR(50) NOT NULL
);


CREATE TABLE IF NOT EXISTS flights (
    flight_id SERIAL PRIMARY KEY,
    route_id VARCHAR(10) NOT NULL,
    aircraft_id VARCHAR(10) REFERENCES aircrafts(aircraft_id),
    departure_date DATE NOT NULL,
    departure_time TIMESTAMP NOT NULL,
    economy_class_price DECIMAL(10, 2) NOT NULL,
    business_class_price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS passengers (
    passport_id VARCHAR(50) PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contact_number VARCHAR(15)
);

CREATE TABLE IF NOT EXISTS bookings (
    booking_id SERIAL PRIMARY KEY,
    flight_id INT REFERENCES flights(flight_id),
    passport_id INT REFERENCES passengers(passport_id),
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF EXISTS tickets (
    ticket_id SERIAL PRIMARY KEY,
    booking_id INT REFERENCES bookings(booking_id),
    flight_id INT REFERENCES flights(flight_id),
    seat_number VARCHAR(10) NOT NULL,
    ticket_class VARCHAR(20) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    issue_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payments (
    payment_id SERIAL PRIMARY KEY,
    booking_id INT REFERENCES bookings(booking_id),
    amount DECIMAL(10, 2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS routes (
    route_id SERIAL PRIMARY KEY,
    route_type VARCHAR(20) NOT NULL,
    departure VARCHAR(10) NOT NULL,
    destination VARCHAR(10) NOT NULL,
    distance_km INT NOT NULL
);

CREATE TABLE IF NOT EXISTS airports (
    airport_code VARCHAR(10) PRIMARY KEY,
    airport_name VARCHAR(200) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL
);