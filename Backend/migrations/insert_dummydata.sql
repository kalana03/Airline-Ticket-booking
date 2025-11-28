/*INSERT INTO aircrafts (aircraft_id, model, manufacturer, seating_capacity, economy_seats, business_seats)
VALUES
('DL-A220', 'Airbus A220-100', 'Airbus', 109, 97, 12),
('DL-A321', 'Airbus A321neo', 'Airbus', 194, 176, 18),
('DL-B737', 'Boeing 737-900ER', 'Boeing', 180, 165, 15),
('DL-B767', 'Boeing 767-300ER', 'Boeing', 211, 181, 30),
('DL-A350', 'Airbus A350-900', 'Airbus', 306, 266, 40);

INSERT INTO routes (route_type, departure, destination, distance_km)
VALUES
('International', 'Atlanta (ATL)', 'Tokyo (HND)', 10860),
('Domestic', 'New York (JFK)', 'Los Angeles (LAX)', 3974),
('Domestic', 'Seattle (SEA)', 'Salt Lake City (SLC)', 1630),
('Domestic', 'Detroit (DTW)', 'Orlando (MCO)', 1860),
('International', 'Atlanta (ATL)', 'Paris (CDG)', 6740);*/
/*
INSERT INTO flights (route_id, aircraft_id, departure_date, departure_time, economy_class_price, business_class_price)
VALUES
(1, 'DL-A350', '2025-02-15', '10:30:00', 850.00, 3450.00),
(2, 'DL-A321', '2025-02-16', '08:00:00', 280.00, 1150.00),
(3, 'DL-B737', '2025-02-16', '14:45:00', 145.00, 490.00),
(4, 'DL-A220', '2025-02-17', '06:20:00', 190.00, 620.00),
(5, 'DL-B767', '2025-02-18', '17:10:00', 740.00, 2980.00);

INSERT INTO passengers (first_name, last_name, email, contact_number)
VALUES
('Michael', 'Turner', 'michael.turner@example.com', '+1-404-555-9384'),
('Sophia', 'Kim', 'sophia.kim@example.com', '+1-718-555-2299'),
('Daniel', 'Rodriguez', 'daniel.rod@example.com', '+1-313-555-6411'),
('Emma', 'Parker', 'emma.parker@example.com', '+1-206-555-8820'),
('Liam', 'Johnson', 'liam.johnson@example.com', '+1-801-555-3302');*/

INSERT INTO airports (airport_code, airport_name, city, country)
VALUES
('ATL', 'Hartsfield–Jackson Atlanta International Airport', 'Atlanta', 'USA'),
('DTW', 'Detroit Metropolitan Wayne County Airport', 'Detroit', 'USA'),
('JFK', 'John F. Kennedy International Airport', 'New York', 'USA'),
('LAX', 'Los Angeles International Airport', 'Los Angeles', 'USA'),
('SEA', 'Seattle–Tacoma International Airport', 'Seattle', 'USA'),
('AMS', 'Amsterdam Airport Schiphol', 'Amsterdam', 'Netherlands'),
('CDG', 'Charles de Gaulle Airport', 'Paris', 'France'),
('NRT', 'Narita International Airport', 'Tokyo', 'Japan'),
('LHR', 'Heathrow Airport', 'London', 'United Kingdom'),
('SLC', 'Salt Lake City International Airport', 'Salt Lake City', 'USA');

INSERT INTO routes (route_type, departure, destination, distance_km)
VALUES
('Domestic', 'ATL', 'JFK', 1220),
('Domestic', 'ATL', 'LAX', 3110),
('Domestic', 'SEA', 'JFK', 3880),
('Domestic', 'DTW', 'LAX', 3360),
('Domestic', 'SLC', 'SEA', 1800),
('International', 'ATL', 'AMS', 6670),
('International', 'JFK', 'CDG', 5830),
('International', 'LAX', 'NRT', 8810),
('International', 'ATL', 'LHR', 6740),
('International', 'SEA', 'NRT', 7700);


