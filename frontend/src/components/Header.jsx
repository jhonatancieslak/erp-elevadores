import React, { useState, useEffect } from 'react';
import { FaBell, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './Header.css';

const Header = ({ onToggleSidebar }) => {
  const { logout } = useAuth();
  const [daysLeft, setDaysLeft] = useState(null);

  useEffect(() => {
    api.get('/license')
      .then(res => {
        const end = new Date(res.data.license.end_date);
        const now = new Date();
        const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        setDaysLeft(diff >= 0 ? diff : 0);
      })
      .catch(() => setDaysLeft(null));
  }, []);

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="sidebar-toggle" onClick={onToggleSidebar}>
          <FaBars />
        </button>
        <h1 className="header-title">DW Elevadores</h1>
      </div>
      <div className="header-center">
        {daysLeft !== null && (
          <div className="license-countdown">
            Licença: {daysLeft} dia{daysLeft !== 1 ? 's' : ''} restantes
          </div>
        )}
      </div>
      <div className="header-actions">
        <FaBell className="header-icon" />
        <FaSignOutAlt className="header-icon" onClick={logout} />
      </div>
    </header>
  );
};

export default Header;
