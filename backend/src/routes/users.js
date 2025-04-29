const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT u.id, r.name AS role, u.name, u.email, u.created_at ' +
      'FROM users u ' +
      'JOIN roles r ON u.role_id = r.id'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

module.exports = router;
