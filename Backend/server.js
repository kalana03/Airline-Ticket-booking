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
      SELECT * 
      FROM flights f
      JOIN aircrafts a ON f.aircraft_id = a.aircraft_id
      WHERE f.flight_id = $1
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
