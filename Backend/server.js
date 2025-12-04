const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend working!");
});

app.get("/airports", async (req, res) => {
    try{
        const airports = await pool.query("SELECT airport_code, city FROM airports ORDER BY city ASC");
        res.json(airports.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

app.post("/bookFlight", async (req, res) => {

  try{

    await pool.query("BEGIN");

    const {passenger_info, seats, flightID} = req.body;

    const q1 = 'SELECT * FROM passengers WHERE passport_id = $1';
    const v1 = [passenger_info.passport_id]
    
    let result1;
    try {
      result1 = await pool.query(q1, v1);
    } catch (err) {
      console.error("DB ERROR:", err.message);
      res.status(500).json({ error: err.message });
    }

    if (!result1 || result1.length === 0){
      const q2 = 'INSERT INTO passengers VALUES ($1, $2, $3, $4, $5)';
      const v2 = [passenger_info.passport_id, passenger_info.first_name, passenger_info.last_name, passenger_info.email, passenger_info.contact_number];

      try{
        const result2 = await pool.query(q2, v2);
      }catch (err){
        console.error("DB ERROR:", err.message);
        res.status(500).json({ error: err.message });
      }
    }

    const q3 = 'INSERT INTO bookings (flight_id, passport_id) VALUES ($1, $2)';
    const v3 = [flightID, passenger_info.passport_id]

    try {
      const result3 = await pool.query(q3, v3);
    } catch (err) {
      console.error("DB ERROR:", err.message);
      res.status(500).json({ error: err.message });
    }

    const q4 = "SELECT booking_id FROM bookings WHERE passport_id = $1 ORDER BY booking_id DESC LIMIT 1";
    const v4 =[passenger_info.passport_id];
    let result4;
    try {
      result4 = await pool.query(q4, v4);
    } catch (err) {
      console.error("DB ERROR:", err.message);
      res.status(500).json({ error: err.message });
    }

    const booking_id = result4.rows[0].booking_id; // get the latest booking id
      for (const seat of seats) {
      const q5 = 'INSERT INTO tickets (booking_id, flight_id, seat_number, ticket_class, price) VALUES ($1, $2, $3, $4, $5)';
      const v5 = [booking_id, flightID, seat.seatNumber, seat.classType, seat.price];
      await pool.query(q5, v5);
    }



  }
  
  catch (err) {
    await pool.query("ROLLBACK");
    console.error("ERROR:", err);
    res.status(500).json({ error: err.message })
  }
});

app.post("/searchFlights", async (req, res) => {
  const { from, to, date } = req.body;

  let q = `
    SELECT f.flight_id, r.departure, r.destination, a1.airport_name AS dep_airport, a2.airport_name AS dest_airport, f.departure_date, f.departure_time, f.aircraft_id
    FROM routes r
    JOIN flights f ON r.route_id = f.route_id
    JOIN airports a1 ON r.departure = a1.airport_code
    JOIN airports a2 ON r.destination = a2.airport_code
    WHERE 1=1
  `;

  const values = [];
  let count = 1;

  if (from) {
    q += ` AND r.departure = $${count}`;
    values.push(from);
    count++;
  }

  if (to) {
    q += ` AND r.destination = $${count}`;
    values.push(to);
    count++;
  }

  if (date) {
    q += ` AND f.departure_date = $${count}`;
    values.push(date);
    count++;
  }

  q += ` ORDER BY f.departure_date, f.departure_time ASC`;

  console.log("FINAL SQL:", q);
  console.log("VALUES:", values);

  try {
    const result = await pool.query(q, values);
    console.log("DB RESULT:", result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error("DB ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("/flightDetails", async (req, res) => {
  // 1️⃣ Get the flight_id from query string
  const { flight_id } = req.query;

  try {
    // 2️⃣ Prepare SQL query with parameter
    const query = `
    SELECT 
        f.*,
        a.*,
        r.*,
        ap1.airport_code AS dep_ap,
        ap2.airport_code AS des_ap,
        ap1.city AS dep_city,
        ap2.city AS des_city
      FROM flights f
      JOIN aircrafts a ON f.aircraft_id = a.aircraft_id
      JOIN routes r ON f.route_id = r.route_id
      JOIN airports ap1 ON r.departure = ap1.airport_code
      JOIN airports ap2 ON r.destination = ap2.airport_code
      WHERE f.flight_id = $1;

    `;

    // 3️⃣ Execute query with parameter
    const result = await pool.query(query, [flight_id]);

    // 4️⃣ Send JSON response
    res.json(result.rows[0] || null); // return one row or null
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
