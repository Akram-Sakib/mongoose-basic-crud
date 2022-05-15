const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

// GET ALL THE TODOS
router.get("/", async (req, res) => {
  await Todo.find({ status: "active" }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "success",
      });
    }
  }).clone();
});

// GET A TODOS BY ID
router.get("/:id", async (req, res) => {});

// POST A TODO
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error",
      });
    } else {
      res.status(200).json({
        message: "Todo was inserted Successfully",
      });
    }
  });
});

// POST MULTIPLE TODO
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error",
      });
    } else {
      res.status(200).json({
        message: "Todo was inserted Successfully",
      });
    }
  });
});

// PUT TODO
router.put("/:id", async (req, res) => {
  await Todo.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: "active",
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error",
        });
      } else {
        res.status(200).json({
          message: "Todo was Updated Successfully",
        });
      }
    }
  ).clone();
});

// DELETE TODO
router.delete("/:id", async (req, res) => {
    await Todo.deleteOne({_id:req.params.id}, (err)=>{
        if (err) {
          res.status(500).json({
            error: "There was a server side error",
          });
        } else {
          res.status(200).json({
            message: "Todo Deleted Successfully",
          });
        }
    }).clone()
});

module.exports = router;
