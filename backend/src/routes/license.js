const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /license — retorna { valid: true, license } ou 403
router.get('/', async (req, res) => {
  const userId = req.user.id;
  const today = new Date().toISOString().slice(0, 10);
  try {
    const [rows] = await pool.query(
      'SELECT * FROM licenses WHERE user_id = ? AND active = 1 AND start_date <= ? AND end_date >= ?',
      [userId, today, today]
    );
    if (rows.length > 0) {
      return res.json({ valid: true, license: rows[0] });
    }
    res.status(403).json({ valid: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao validar licença' });
  }
});

module.exports = router;
