import express from "express";
import {
  bookSeat,
  getBookingDetails,
} from "../controllers/bookingController.js";

import authenticate from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticate, bookSeat);
router.get("/:bookingId", authenticate, getBookingDetails);

export default router;
