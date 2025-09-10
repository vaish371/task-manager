const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = []; // in-memory storage

app.get("/tasks", (req, res) => res.json(tasks));

app.post("/tasks", (req, res) => {
  const task = { id: Date.now(), title: req.body.title };
  tasks.push(task);
  res.json(task);
});

app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.title = req.body.title;
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.json({ success: true });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
