const express = require("express");
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);
const router = express.Router();

// GET all the todos
router.get("/", async (req, res) => {
  try {
    const data = await Todo.find();
    // const data = await Todo.find({ status: "active" });
    res.status(200).json({
      result: data,
      message: "Query executed successfully!!",
    });
  } catch (err) {
    res.status(500).json({
      message: "There was a server side error!!",
    });
  }
});

// GET a todo by id
router.get("/:id", async (req, res) => {
  try {
    const data = await Todo.findById({ _id: req.params.id });
    res.status(200).json({
      result: data,
      message: "Query executed successfully!!",
    });
  } catch (err) {
    res.status(500).json({
      message: "There was a server side error!!",
    });
  }
});

// POST a todo
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(200).json({
      message: "Todo was inserted successfully!",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error! " + err,
    });
  }
});

// POST multiple todo
router.post("/all", async (req, res) => {
  try {
    await Todo.insertMany(req.body);
    res.status(200).json({
      message: "Todos were inserted successfully!",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!!" + err,
    });
  }
});

// PUT todo
router.put("/:id", async (req, res) => {
  try {
    await Todo.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: req.body.status,
        },
      }
    );
    res.status(200).json({
      message: "Update Successfull!!",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!" + err,
    });
  }
});

// DELETE todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "Todo was deleted successfully!!",
    });
  } catch (err) {
    res.status(500).json({
      message: "There was a server side error!!",
    });
  }
});

module.exports = router;
