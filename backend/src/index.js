// backend/src/index.js

require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const app = express();

// Habilita CORS e parsing de JSON
app.use(cors());
app.use(express.json());

// Rotas públicas
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

// Middleware JWT para proteger as próximas rotas
const verifyToken = require('./middleware/auth');
app.use(verifyToken);

// Rota protegida: valida licença de uso
const licenseRouter = require('./routes/license');
app.use('/license', licenseRouter);

// Rota protegida: lista setores para o dropdown
const sectorsRouter = require('./routes/sectors');
app.use('/sectors', sectorsRouter);

// Rota protegida: CRUD de usuários
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// Rota protegida: preferências de menu
const preferencesRouter = require('./routes/preferences');
app.use('/preferences', preferencesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
