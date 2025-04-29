// backend/src/routes/sectors.js
const express = require('express');
const router  = express.Router();
const pool    = require('../db');
const auth    = require('../middleware/auth');

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name FROM sectors ORDER BY name');
    res.json(rows);
  } catch (err) {
    console.error('Erro /sectors:', err.code, err.sqlMessage);
    res.status(500).json({ error: 'Erro ao listar setores' });
  }
});

module.exports = router;
