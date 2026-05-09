const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/register', (req, res) => {
  const { name, email, password, weekly_income_goal } = req.body;
  const sql = 'INSERT INTO users (name, email, password, weekly_income_goal) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, password, weekly_income_goal], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, userId: result.insertId });
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = results[0];
    const today = new Date().toISOString().split('T')[0];
    const lastActive = user.last_active ? user.last_active.toISOString().split('T')[0] : null;

    let newStreak = user.streak || 0;

    if (lastActive === null) {
      // First login ever
      newStreak = 1;
    } else if (lastActive === today) {
      // Already logged in today, keep streak
      newStreak = user.streak;
    } else {
      // Check if yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (lastActive === yesterdayStr) {
        // Logged in yesterday, increase streak
        newStreak = user.streak + 1;
      } else {
        // Missed a day, reset streak
        newStreak = 1;
      }
    }

    // Update streak and last_active
    db.query(
      'UPDATE users SET streak = ?, last_active = ? WHERE id = ?',
      [newStreak, today, user.id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        user.streak = newStreak;
        user.last_active = today;
        res.json({ success: true, user });
      }
    );
  });
});

router.get('/:id', (req, res) => {
  db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

module.exports = router;