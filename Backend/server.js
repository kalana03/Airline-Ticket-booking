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

    var q = `
        SELECT *
        FROM routes r
        JOIN flights f ON r.route_id = f.route_id
        
    `;
    var values = [];
    var count = 1;

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
        console.log("QUERY PARAMS:", from, to);
        const result = await pool.query(q, values);
        console.log("DB RESULT:", result.rows);
        res.json(result.rows);

    } catch (err) {
        console.error("DB ERROR:", err.message);
        console.error(err);
        res.status(500).json({ error: err.message });
    }

});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
