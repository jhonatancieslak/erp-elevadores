import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaSearch } from 'react-icons/fa';
import api from '../services/api';
import './Users.css';

const Users = () => {
  const [users, setUsers]     = useState([]);
  const [search, setSearch]   = useState('');
  const navigate              = useNavigate();

  // Carrega usuários
  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/users');
        setUsers(res.data);
      } catch {
        navigate('/');
      }
    };
    load();
  }, [navigate]);

  // Exclui usuário
  const handleDelete = async id => {
    if (!window.confirm('Excluir este usuário?')) return;
    try {
      await api.delete('/users/' + id);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      console.error('Erro ao excluir:', err);
      alert('Falha ao excluir usuário.');
    }
  };

  // Filtra pelo nome ou e-mail
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="users-page">
      <h1>Gestão de Usuários</h1>

      <div className="users-controls">
        <div className="search-box">
          <FaSearch className="icon" />
          <input
            type="text"
            placeholder="Buscar usuário..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className="btn-new" onClick={() => navigate('/users/new')}>
          + Novo Usuário
        </button>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Perfil</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td className="actions">
                <button
                  className="action-btn edit"
                  onClick={() => navigate(`/users/${u.id}`)}
                >
                  <FaEdit />
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => handleDelete(u.id)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
);

};

export default Users;
