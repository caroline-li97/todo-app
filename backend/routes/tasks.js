// backend/routes/tasks.js
const express = require('express');
const db = require('../db.js');
const router = express.Router();

//get all tasks
router.get('/', (req, res) => {
    db.all('SELECT * FROM tasks', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message});
            return;
        }
        res.json(rows);
    })
})

//add tasks
router.post('/', (req, res) => {
    const {task} = req.body;
    if(!task) {
        res.status(400).json({ error: 'Task content is required'});
        return;
    }

    db.run('INSERT INTO tasks (task) VALUES (?)', [task], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID }); // return id for new task
  });
});

//delete task
router.delete('/:id', (req, res) => {
    const { id } = req.params; // get id from URL
    db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Task deleted' });
    });
  });
  
  module.exports = router;
  