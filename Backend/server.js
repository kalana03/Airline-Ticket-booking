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
    console.log("Requested flights from", from, "to", to, "on", date);

    var q = "SELECT r.departure, r.destination, f.departure_date, f.departure_time";
    q += " FROM flights f, routes r JOIN airports a1 ON a1.airport_code = r.departure JOIN airports a2 ON a2.airport_code = r.destination";
    q += " WHERE f.route_id = r.route_id AND f.departure_date >= CURRENT_DATE";

    let params =[];
    let count = 1;

    if (from != null && from !== "") {
        q += ` AND r.departure = $${count}`;
        params.push(from);
        count++;

    }
    if (to != null && to !== "") {
        q += ` AND r.destination = $${count}`;
        params.push(to);
        count++;
    }
    if (date != null && date !== "") {
        q += ` AND f.departure_date = $${count}`;
        params.push(date);
        count++;
    }

    q += " ORDER BY f.departure_date, f.departure_time";

    try {
        const flights = await pool.query(q, params);
        res.json(flights.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
