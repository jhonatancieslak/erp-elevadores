import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (err) {
        console.error(err);
        // Se der 401/403, volta para login
        navigate('/');
      }
    };
    fetchUsers();
  }, [navigate]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Usuários Cadastrados</h1>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.name} — {u.email} ({u.role})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
