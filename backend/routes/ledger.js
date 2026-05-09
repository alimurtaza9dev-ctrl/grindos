const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:userId', (req, res) => {
  db.query('SELECT * FROM ledger WHERE user_id = ? ORDER BY date DESC',
    [req.params.userId], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
});

router.post('/', (req, res) => {
  const { user_id, type, amount, note } = req.body;
  const today = new Date().toISOString().split('T')[0];
  db.query('INSERT INTO ledger (user_id, type, amount, note, date) VALUES (?, ?, ?, ?, ?)',
    [user_id, type, amount, note, today], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM ledger WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

module.exports = router;
