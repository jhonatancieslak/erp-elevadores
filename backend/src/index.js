require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// rotas de autenticação
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

// middleware de JWT
const verifyToken = require('./middleware/auth');

// rotas protegidas de usuários
const usersRouter = require('./routes/users');
app.use('/users', verifyToken, usersRouter);

// rota pública de teste
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor rodando na porta ' + PORT);
});
