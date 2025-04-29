// backend/src/routes/users.js
const express = require('express');
const router  = express.Router();
const pool    = require('../db');
const bcrypt  = require('bcrypt');
const auth    = require('../middleware/auth');

// Todas as rotas abaixo exigem token válido
router.use(auth);

/**
 * Listar todos os usuários
 */
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.id,
             r.name AS role,
             u.name,
             u.email,
             u.created_at
      FROM users u
      JOIN roles r ON u.role_id = r.id
      ORDER BY u.id
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

/**
 * Buscar um usuário por ID
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`
      SELECT u.id,
             u.role_id AS role,
             u.name,
             u.email,
             u.created_at
      FROM users u
      WHERE u.id = ?
    `, [id]);
    if (!rows.length) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

/**
 * Criar novo usuário
 */
router.post('/', async (req, res) => {
  const { role_id, name, email, password } = req.body;
  if (!role_id || !name || !email || !password) {
    return res.status(400).json({ error: 'role_id, name, email e password são obrigatórios' });
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(`
      INSERT INTO users (role_id, name, email, password)
      VALUES (?, ?, ?, ?)
    `, [role_id, name, email, hash]);

    // result.insertId é a próxima ID no auto-increment
    const newId = result.insertId;
    // Buscar o registro completo logo após a criação
    const [rows] = await pool.query(`
      SELECT u.id,
             r.name AS role,
             u.name,
             u.email,
             u.created_at
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.id = ?
    `, [newId]);

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

/**
 * Atualizar usuário existente
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { role_id, name, email, password } = req.body;

  if (!role_id || !name || !email) {
    return res.status(400).json({ error: 'role_id, name e email são obrigatórios' });
  }

  try {
    // Monta sentença SQL dinamicamente
    let sql    = 'UPDATE users SET role_id = ?, name = ?, email = ?';
    const params = [role_id, name, email];

    if (password) {
      const hash = await bcrypt.hash(password, 10);
      sql += ', password = ?';
      params.push(hash);
    }

    sql += ' WHERE id = ?';
    params.push(id);

    await pool.query(sql, params);
    res.json({ message: 'Usuário atualizado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

/**
 * Excluir usuário
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'Usuário excluído' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao excluir usuário' });
  }
});

module.exports = router;
