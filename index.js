const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./route/todoRoute");

const port = process.env.port || 5000;
const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/todos")
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

app.use("/todo", todoHandler)


app.listen(port, ()=>{
    console.log(`app listening at port ${port}`);
})

