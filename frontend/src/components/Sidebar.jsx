import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUsers,
  FaFileInvoiceDollar,
  FaCogs,
  FaBox,
  FaShippingFast,
  FaPhone,
  FaLifeRing,
  FaSave,
  FaSearch
} from 'react-icons/fa';
import api from '../services/api';

const defaultMenu = [
  { key: 'dashboard',    label: 'Dashboard',       icon: <FaTachometerAlt />, path: '/dashboard' },
  {
    key: 'usuarios',
    label: 'Usuários',
    icon: <FaUsers />,
    children: [
      { key: 'list', label: 'Listar Usuários', path: '/users' },
      { key: 'new',  label: 'Novo Usuário',    path: '/users/new' }
    ]
  },
  {
    key: 'gestao',
    label: 'Gestão',
    icon: <FaCogs />,
    children: [
      { key: 'financeiro', label: 'Financeiro',   path: '/financeiro' },
      { key: 'engenharia', label: 'Engenharia',    path: '/engenharia' },
      { key: 'almox',      label: 'Almoxarifado',  path: '/almoxarifado' },
      { key: 'exped',      label: 'Expedição',     path: '/expedicao' }
    ]
  },
  { key: 'sac',        label: 'SAC',         icon: <FaPhone />,      path: '/sac' },
  { key: 'assistencia', label: 'Assistência', icon: <FaLifeRing />,  path: '/assistencia' },
];

const Sidebar = () => {
  const [search, setSearch]     = useState('');
  const [expanded, setExpanded] = useState({});
  const [order, setOrder]       = useState(defaultMenu.map(i => i.key));

  // carrega preferências
  useEffect(() => {
    api.get('/preferences/menu')
      .then(res => {
        setExpanded(res.data.expandedKeys || {});
        if (res.data.order?.length) setOrder(res.data.order);
      })
      .catch(() => {});  // ignora erros
  }, []);

  const savePrefs = () => {
    api.post('/preferences/menu', { expandedKeys: expanded, order });
    alert('Preferências salvas');
  };

  // filtra e reordena
  const filtered = defaultMenu
    .filter(i => i.label.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));

  const toggle = key => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <nav style={{ width: 260, padding: 16, background: '#343a40', color: '#fff' }}>
      <div style={{ marginBottom: 16, display: 'flex' }}>
        <FaSearch style={{ marginRight: 8 }} />
        <input
          placeholder="Pesquisar..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, padding: 6, borderRadius: 4 }}
        />
      </div>

      {filtered.map(item => (
        <div key={item.key} style={{ marginBottom: 8 }}>
          {item.children ? (
            <>
              <div
                onClick={() => toggle(item.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  padding: '8px',
                  background: expanded[item.key] ? '#007bff' : 'transparent',
                  borderRadius: 4
                }}
              >
                {item.icon && <span style={{ marginRight: 8 }}>{item.icon}</span>}
                <span>{item.label}</span>
              </div>
              {expanded[item.key] && (
                <div style={{ marginLeft: 24, marginTop: 4 }}>
                  {item.children.map(sub => (
                    <NavLink
                      key={sub.key}
                      to={sub.path}
                      style={({ isActive }) => ({
                        display: 'block',
                        padding: '6px 8px',
                        color: isActive ? '#fff' : '#ddd',
                        textDecoration: 'none'
                      })}
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </>
          ) : (
            <NavLink
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                padding: '8px',
                color: isActive ? '#fff' : '#ddd',
                background: isActive ? '#007bff' : 'transparent',
                borderRadius: 4,
                textDecoration: 'none'
              })}
            >
              {item.icon && <span style={{ marginRight: 8 }}>{item.icon}</span>}
              <span>{item.label}</span>
            </NavLink>
          )}
        </div>
      ))}

      <button
        onClick={savePrefs}
        style={{
          marginTop: 24,
          width: '100%',
          padding: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <FaSave style={{ marginRight: 8 }} /> Salvar Menu
      </button>
    </nav>
  );
};

export default Sidebar;
