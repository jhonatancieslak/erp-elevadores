const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();

// login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // busca usuário
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    if (users.length === 0) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    // busca nome do perfil (role)
    const [roles] = await pool.query(
      'SELECT name FROM roles WHERE id = ?',
      [user.role_id]
    );
    const roleName = roles.length ? roles[0].name.toLowerCase() : null;

    // busca nome do setor
    const [sectors] = await pool.query(
      'SELECT name FROM sectors WHERE id = ?',
      [user.sector_id]
    );
    const sectorName = sectors.length ? sectors[0].name.toLowerCase() : null;

    // gera JWT incluindo role e sector
    const token = jwt.sign(
      {
        id: user.id,
        role: roleName,
        sector: sectorName,
        email: user.email
      },
      process.env.JWT_SECRET || 'seusegredo',
      { expiresIn: '1h' }
    );

    // devolve token e infos de role/sector
    res.json({ token, role: roleName, sector: sectorName });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no login' });
  }
});

module.exports = router;