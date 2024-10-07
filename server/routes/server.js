require("dotenv").config();
import express, { json } from "express";
import cors from "cors";
import connectDB from "./config/db";


// Skapa Express-appen
const app = express();

// Anslut till databasen
connectDB();

// Middleware
app.use(cors());
app.use(json());






// Starta servern
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server körs på port ${PORT}`));
