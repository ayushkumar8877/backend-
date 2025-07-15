import express from "express";
import { getUserFriends } from "../controllers/friendController.js";

const router = express.Router();

router.get("/:userId", getUserFriends); // ✅ fix ho gaya

export default router;
