const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:userId', (req, res) => {
  db.query('SELECT * FROM gigs WHERE user_id = ? ORDER BY created_at DESC',
    [req.params.userId], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
});

router.post('/', (req, res) => {
  const { user_id, title, client, amount, status, deadline } = req.body;
  const sql = 'INSERT INTO gigs (user_id, title, client, amount, status, deadline) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [user_id, title, client, amount, status, deadline], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, gigId: result.insertId });
  });
});

router.put('/:id', (req, res) => {
  const { status } = req.body;
  db.query('UPDATE gigs SET status = ? WHERE id = ?', [status, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM gigs WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

module.exports = router;