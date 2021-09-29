const mongoose = require("mongoose");
const todoSchema = mongoose.Schema({
userId:String,
  todos: [{
    checked:Boolean,
    text:String,
  }]

});
const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
