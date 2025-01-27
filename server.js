import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";

// Load environment variables
dotenv.config();

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Connect to Database
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.get("/", (req, res) => {
  res.send("API working");
});

// Start the server
app.listen(port, () => console.log("Server started on Port :" + port));
