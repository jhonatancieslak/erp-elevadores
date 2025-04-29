// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // 1) Chama a API de login
      const response = await api.post('/auth/login', { email, password });
      console.log('Resposta /auth/login:', response.data);

      const { token, sector } = response.data;

      // 2) Valida se o setor veio
      if (!sector) {
        throw new Error('Nenhum setor associado ao usuário');
      }

      // 3) Usa o contexto para armazenar token e setor
      login(token, sector);

      // 4) Redireciona para painel setorial
      navigate(`/${sector}/dashboard`);
    } catch (err) {
      console.error('Erro no login:', err);
      const msg = err.response?.data?.error || err.message || 'Usuário ou senha inválidos';
      setError(msg);
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <img src="/logo.png" alt="Logo" className="login-logo" />

          {error && <div className="login-toast">{error}</div>}

          <div className="login-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="login-field">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="login-button" type="submit">
            Entrar
          </button>
        </form>
        <footer className="login-footer">
          Desenvolvimento: Jhonatan Cieslak
        </footer>
      </div>
    </div>
  );
};

export default Login;
