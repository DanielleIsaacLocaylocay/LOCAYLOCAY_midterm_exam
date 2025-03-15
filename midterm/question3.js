const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for tasks
let tasks = [];
let nextId = 1;

// Create a new task
app.post('/tasks', (req, res) => {
const { name, description } = req.body;
if (!name || !description) {
return res.status(400).json({ error: 'Name and description are required.' });
}
const newTask = {
id: nextId++,
name,
description,
};
tasks.push(newTask);
res.status(201).json(newTask);
});

// Read all tasks
app.get('/tasks', (req, res) => {
res.json(tasks);
});

// Read a single task by id
app.get('/tasks/:id', (req, res) => {
const id = parseInt(req.params.id, 10);
const task = tasks.find(t => t.id === id);
if (!task) {
return res.status(404).json({ error: 'Task not found.' });
}
res.json(task);
});

// Update a task by id
app.put('/tasks/:id', (req, res) => {
const id = parseInt(req.params.id, 10);
const { name, description } = req.body;
const task = tasks.find(t => t.id === id);
if (!task) {
return res.status(404).json({ error: 'Task not found.' });
}
if (name) task.name = name;
if (description) task.description = description;
res.json(task);
});

// Delete a task by id
app.delete('/tasks/:id', (req, res) => {
const id = parseInt(req.params.id, 10);
const index = tasks.findIndex(t => t.id === id);
if (index === -1) {
return res.status(404).json({ error: 'Task not found.' });
}
const deletedTask = tasks.splice(index, 1);
res.json(deletedTask[0]);
});

// Start the server
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});