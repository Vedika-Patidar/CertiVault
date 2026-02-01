const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const certificateRoutes = require("./routes/certificateRoutes")

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/certificates", certificateRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // ⬅️ WAIT for MongoDB
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
  }
};

startServer();
