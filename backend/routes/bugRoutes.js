// backend/routes/bugRoutes.js
import express from "express";
import { createBug, getBugs, deleteBug } from "../controllers/bugController.js";

const router = express.Router();

router.post("/", createBug);      // ← THIS ONE
router.get("/", getBugs);
router.delete("/:id", deleteBug);

export default router;