require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authController = require("./authController");
const verifyToken = require("./authMiddleware");

// Skapa Express-appen
const app = express();

// Anslut till databasen
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Autentiseringsrutter
app.post("/api/auth/register", authController.register);
app.post("/api/auth/login", authController.login);

// Skyddade rutter
app.use("/api/chat", verifyToken, require("./routes/chat"));



// Starta servern
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server körs på port ${PORT}`));
