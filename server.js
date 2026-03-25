const express = require('express');
const app = express();
const port = 3001;
let tasks = [];

app.use(express.static('public'));
app.use(express.json());

app.post('/tasks', (req, res) => {
  const task = req.body.task;
  if (task) {
    tasks.push({ text: task, id: Date.now(), createdAt: new Date() });
    res.status(201).send('Task added');
  } else {
    res.status(400).send('No task provided');
  }
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});