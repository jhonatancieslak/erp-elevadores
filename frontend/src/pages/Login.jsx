import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Erro no login');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
      <form onSubmit={handleSubmit} style={{ width: 300, padding: 20, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Login</h2>
        {error && <p style={{ color: 'red', marginBottom: 15 }}>{error}</p>}
        <div style={{ marginBottom: 15 }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginTop: 5, boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginTop: 5, boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: 10 }}>Entrar</button>
      </form>
    </div>
  );
};

export default Login;
