const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

// GET ALL THE TODOS
router.get("/", async (req, res) => {
  
  try {
    const data = await Todo.find({ status: "active" });
    res.status(200).json({
      result: data,
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error",
    });
  }

});

// GET A TODOS BY ID
router.get("/:id", async (req, res) => {});

// POST A TODO
router.post("/", async (req, res) => {

  try {
    const newTodo = new Todo(req.body);
    const data = await newTodo.save();
    res.status(200).json({
      message: "Todo was inserted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error",
    });
  }

});

// POST MULTIPLE TODO
router.post("/all", async (req, res) => {

  try {
    const data = Todo.insertMany(req.body);
    res.status(200).json({
        message: "Todo was inserted Successfully",
      });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error",
    });
  }

});

// PUT TODO
router.put("/:id", async (req, res) => {
  try {
    const data = await Todo.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: "inactive",
      },
    });
    res.status(200).json({
      message: "Todo is Updated Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error",
    });
  }

});

// DELETE TODO
router.delete("/:id", async (req, res) => {
  try {
    const data = await Todo.deleteOne({_id:req.params.id});
    res.status(200).json({
            message: "Todo Deleted Successfully",
          });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error",
    });
  }
});

module.exports = router;
