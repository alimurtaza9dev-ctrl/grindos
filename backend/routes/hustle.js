const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const weekStartStr = weekStart.toISOString().split('T')[0];

  db.query(
    'SELECT COUNT(*) as total, SUM(is_done) as done FROM tasks WHERE user_id = ? AND date >= ?',
    [userId, weekStartStr],
    (err, taskResults) => {
      if (err) return res.status(500).json({ error: err.message });
      db.query(
        'SELECT COUNT(*) as closed FROM gigs WHERE user_id = ? AND status = "completed" AND created_at >= ?',
        [userId, weekStartStr],
        (err, gigResults) => {
          if (err) return res.status(500).json({ error: err.message });
          db.query(
            'SELECT SUM(amount) as earned FROM ledger WHERE user_id = ? AND type = "income" AND date >= ?',
            [userId, weekStartStr],
            (err, ledgerResults) => {
              if (err) return res.status(500).json({ error: err.message });
              db.query('SELECT weekly_income_goal, streak FROM users WHERE id = ?', [userId],
                (err, userResults) => {
                  if (err) return res.status(500).json({ error: err.message });

                  const total = taskResults[0].total || 1;
                  const done = taskResults[0].done || 0;
                  const taskScore = Math.round((done / total) * 40);
                  const gigs = gigResults[0].closed || 0;
                  const gigScore = Math.min(gigs * 10, 30);
                  const earned = ledgerResults[0].earned || 0;
                  const goal = userResults[0].weekly_income_goal || 1;
                  const incomeScore = Math.min(Math.round((earned / goal) * 20), 20);
                  const streak = userResults[0].streak || 0;
                  const streakScore = Math.min(streak, 10);
                  const totalScore = taskScore + gigScore + incomeScore + streakScore;

                  res.json({
                    score: totalScore,
                    breakdown: {
                      tasks: { done, total, points: taskScore },
                      gigs: { closed: gigs, points: gigScore },
                      income: { earned, goal, points: incomeScore },
                      streak: { days: streak, points: streakScore }
                    }
                  });
                });
            });
        });
    });
});

module.exports = router;
