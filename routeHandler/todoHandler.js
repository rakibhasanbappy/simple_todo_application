const express = require("express");
const router = express.Router();

// GET all the todos
router.get("/", async (req, res) => {});

// GET a todo by id
router.get("/:id", async (req, res) => {});

// POST todo
router.post("/", async (req, res) => {});

// POST multiple todo
router.post("/all", async (req, res) => {});

// PUT todo
router.put("/:id", async (req, res) => {});

// DELETE todo
router.delete("/:id", async (req, res) => {});

module.exports = router;
