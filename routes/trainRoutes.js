import express from "express";
import { addTrain, getTrains } from "../controllers/trainController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/", adminAuth, addTrain);
router.get("/available", getTrains);

export default router;
