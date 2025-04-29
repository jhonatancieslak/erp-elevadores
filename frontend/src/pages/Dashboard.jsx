import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [license, setLicense] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1) busca licença
        const licRes = await api.get('/license');
        setLicense(licRes.data.license);

        // 2) busca usuários
        const usersRes = await api.get('/users');
        setUsers(usersRes.data);
      } catch (err) {
        console.error(err);
        // erro 401/403 em qualquer chamada, volta ao login
        localStorage.removeItem('token');
        navigate('/');
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      {license && (
        <p>
          Licença válida até: <strong>{new Date(license.end_date).toLocaleDateString()}</strong>
        </p>
      )}
      <h2>Usuários Cadastrados</h2>
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
