const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:userId', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  db.query('SELECT * FROM tasks WHERE user_id = ? AND date = ?',
    [req.params.userId, today], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
});

router.post('/', (req, res) => {
  const { user_id, title } = req.body;
  const today = new Date().toISOString().split('T')[0];
  db.query('INSERT INTO tasks (user_id, title, date) VALUES (?, ?, ?)',
    [user_id, title, today], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, taskId: result.insertId });
    });
});

router.put('/:id', (req, res) => {
  const { is_done } = req.body;
  db.query('UPDATE tasks SET is_done = ? WHERE id = ?', [is_done, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

module.exports = router;
