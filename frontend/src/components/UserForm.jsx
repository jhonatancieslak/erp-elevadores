// src/components/UserForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import api from '../services/api';
import './UserForm.css';

const UserForm = () => {
  const [form, setForm] = useState({
    role_id:   1,
    sector_id: '',
    name:      '',
    email:     '',
    password:  ''
  });
  const [sectors, setSectors] = useState([]);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState('');
  const navigate              = useNavigate();
  const { id }                = useParams();

  // Busca lista de setores
  useEffect(() => {
    api.get('/sectors')
      .then(res => setSectors(res.data))
      .catch(() => {});
  }, []);

  // Se estiver editando, busca dados do usuário
  useEffect(() => {
    if (!id) return;
    api.get(`/users/${id}`)
      .then(res => {
        const { role_id, sector_id, name, email } = res.data;
        setForm({ role_id, sector_id, name, email, password: '' });
      })
      .catch(() => navigate('/users'));
  }, [id, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'role_id' || name === 'sector_id' ? Number(value) : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/users/${id}`, form);
        setSuccess('Usuário atualizado com sucesso');
      } else {
        await api.post('/users', form);
        setSuccess('Usuário criado com sucesso');
      }
      setTimeout(() => {
        setSuccess('');
        navigate('/users');
      }, 1500);
    } catch (err) {
      const msg = err.response?.data?.error || 'Falha ao salvar usuário';
      setError(msg);
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="userform-page">
      <div className="userform-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Voltar
        </button>
        <h2>{id ? 'Editar Usuário' : 'Novo Usuário'}</h2>
      </div>

      {error && <div className="userform-error">{error}</div>}
      {success && <div className="userform-success">{success}</div>}

      <form className="userform-form" onSubmit={handleSubmit}>
        <label>
          Perfil (ID)
          <input
            name="role_id"
            type="number"
            value={form.role_id}
            min={1}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Setor
          <select
            name="sector_id"
            value={form.sector_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            {sectors.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </label>

        <label>
          Nome
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Senha {id && <small>(deixe em branco para manter)</small>}
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder={id ? '••••••••' : ''}
            {...(!id ? { required: true } : {})}
          />
        </label>

        <button type="submit" className="userform-button">
          <FaSave className="icon-save" /> {id ? 'Atualizar' : 'Criar'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
