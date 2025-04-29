require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// rotas de autenticação
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

// rota de teste pública
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

// aqui você pode adicionar middleware JWT e rotas protegidas

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor rodando na porta ' + PORT);
});
