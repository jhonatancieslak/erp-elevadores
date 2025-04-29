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
import './Sidebar.css';

const defaultMenu = [
  { key: 'dashboard', label: 'Dashboard', icon: <FaTachometerAlt />, path: '/dashboard' },
  {
    key: 'usuarios', label: 'Usuários', icon: <FaUsers />, children: [
      { key: 'list', label: 'Listar Usuários', path: '/users' },
      { key: 'new', label: 'Novo Usuário', path: '/users/new' }
    ]
  },
  {
    key: 'gestao', label: 'Gestão', icon: <FaCogs />, children: [
      { key: 'financeiro', label: 'Financeiro', path: '/financeiro' },
      { key: 'engenharia', label: 'Engenharia', path: '/engenharia' },
      { key: 'almox', label: 'Almoxarifado', path: '/almoxarifado' },
      { key: 'exped', label: 'Expedição', path: '/expedicao' }
    ]
  },
  { key: 'sac', label: 'SAC', icon: <FaPhone />, path: '/sac' },
  { key: 'assistencia', label: 'Assistência', icon: <FaLifeRing />, path: '/assistencia' }
];

const Sidebar = ({ collapsed }) => {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState({});
  const [order, setOrder] = useState(defaultMenu.map(i => i.key));

  useEffect(() => {
    api.get('/preferences/menu')
      .then(res => {
        setExpanded(res.data.expandedKeys || {});
        if (res.data.order?.length) setOrder(res.data.order);
      })
      .catch(() => {});
  }, []);

  const savePrefs = () => {
    api.post('/preferences/menu', { expandedKeys: expanded, order })
      .then(() => alert('Preferências salvas'))
      .catch(() => alert('Falha ao salvar'));
  };

  const filtered = defaultMenu
    .filter(item => item.label.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));

  const toggle = key => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <nav className={collapsed ? 'sidebar collapsed' : 'sidebar'}>
      <div className="sidebar-search">
        {!collapsed && (
          <>
            <FaSearch />
            <input
              placeholder="Pesquisar..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </>
        )}
      </div>

      <div className="menu-list">
        {filtered.map(item => (
          <div key={item.key} className="menu-item">
            {item.children ? (
              <>
                <div
                  onClick={() => toggle(item.key)}
                  className={`menu-link ${expanded[item.key] ? 'open' : ''}`}
                >
                  {item.icon}
                  {!collapsed && <span className="label-text">{item.label}</span>}
                </div>
                {expanded[item.key] && !collapsed && (
                  <div className="submenu">
                    {item.children.map(sub => (
                      <NavLink
                        key={sub.key}
                        to={sub.path}
                        className="submenu-link"
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <NavLink to={item.path} className="menu-link">
                {item.icon}
                {!collapsed && <span className="label-text">{item.label}</span>}
              </NavLink>
            )}
          </div>
        ))}
      </div>

      {!collapsed && (
        <button className="save-button" onClick={savePrefs}>
          <FaSave /> Salvar Menu
        </button>
      )}
    </nav>
  );
};

export default Sidebar;
