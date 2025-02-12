import express from "express";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes.js";
import trainRoutes from "./routes/trainRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/trains", trainRoutes);
app.use("/api/v1/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
