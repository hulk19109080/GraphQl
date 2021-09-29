const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./Modal/User");
const Todo = require("./Modal/Todos");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
  "mongodb+srv://rish:rish@cluster0.597ea.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
      user: "aryan",
      password: "aryan",
    },
  },
  () => console.log("db is connected")
);

app.get("/", (req, res, next) => {
  res.send("hello world");
});

app.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).exec();
    if (user) {
      res.status(404);
      res.json({ message: "user already taken" });
      return;
    }
    await User.create({ username, password });
    res.status(200);
    res.json({
      message: "success",
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).exec();
    if (!user || user.password !== password) {
      res.status(404);
      res.json({ message: "Invalid Login" });
      return;
    }
    await User.create({ username, password });
    res.status(200);
    res.json({
      message: "success",
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/todos", async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  const [username, password] = authorization.split(":");
  const todosItems = req.body;

  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(404);
    res.json({ message: "Invalid access" });
    return;
  }
  const todos = await Todo.findOne({ userId: user._id }).exec();
  if (!todos) {
    await Todo.create({
      userId: user._id,
      todos: todosItems,
    });
  } else {
    todos.todos = todosItems;
    await todos.save();
  }
  res.json(todosItems);
});

app.get("/todos", async (req, res, next) => {
  const { authorization } = req.headers;
  const [username, password] = authorization.split(":");

  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(404);
    res.json({ message: "Invalid access" });
    return;
  }
  const { todos } = await Todo.findOne({ userId: user._id }).exec();
  console.log(todos);
  res.json(todos);
});

app.listen(4000, () => console.log("server is running!"));
