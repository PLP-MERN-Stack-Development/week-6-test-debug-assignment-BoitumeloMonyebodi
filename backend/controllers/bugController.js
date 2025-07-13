// backend/controllers/bugController.js
import Bug from "../models/Bug.js";

// Create a new bug
export const createBug = async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const newBug = new Bug({
      title,
      description,
      status: "open",
    });
    await newBug.save();
    res.status(201).json(newBug);
  } catch (error) {
    console.error("Bug creation error:", error.message);
    res.status(500).json({ message: "Failed to create bug" });
  }
};

// Get all bugs
export const getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.json(bugs);
  } catch (error) {
    console.error("Error fetching bugs:", error.message);
    res.status(500).json({ message: "Failed to fetch bugs" });
  }
};

// Delete a bug by ID
export const deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }
    await bug.remove();
    res.json({ message: "Bug deleted" });
  } catch (error) {
    console.error("Error deleting bug:", error.message);
    res.status(500).json({ message: "Failed to delete bug" });
  }
};