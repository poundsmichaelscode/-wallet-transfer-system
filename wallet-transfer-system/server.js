// server.js
require("dotenv").config();
const express = require("express");
const connectDB = require("./config");
const walletRoutes = require("./routes/walletRoutes");

const app = express();
app.use(express.json());
app.use('/api/wallets', walletRoutes);

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
