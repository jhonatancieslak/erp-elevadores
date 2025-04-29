import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

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

  const handleDelete = async id => {
    if (!window.confirm('Excluir este usuário?')) return;
    await api.delete(\`/users/\${id}\`);
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Gestão de Usuários</h1>
      <Link to="/users/new" style={{ marginBottom: 10, display: 'inline-block' }}>+ Novo Usuário</Link>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Nome</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Perfil</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{u.id}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{u.name}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{u.email}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{u.role}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>
                <Link to={\`/users/\${u.id}\`} style={{ marginRight: 8 }}>Editar</Link>
                <button onClick={() => handleDelete(u.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
