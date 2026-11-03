const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const db = require("./config/db");

require("dotenv").config();

const app = express();

app.use(helmet());

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Helpdesk API is running"
    });
});

app.get("/api/health/db", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT 1 AS result");

        res.json({
            success: true,
            message: "Database connection successful",
            database: rows[0].result === 1
        });

    } catch (error) {
        console.error("Database error:", error.message);

        res.status(500).json({
            success: false,
            message: "Database connection failed"
        });
    }
});

module.exports = app;
