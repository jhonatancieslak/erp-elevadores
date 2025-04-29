import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaCogs, FaBox, FaShippingFast, FaFileInvoiceDollar } from 'react-icons/fa';

const Sidebar = () => {
  const linkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    color: isActive ? '#fff' : '#ddd',
    background: isActive ? '#007bff' : 'transparent',
    textDecoration: 'none',
    borderRadius: '4px',
    marginBottom: '4px'
  });

  return (
    <nav style={{ width: 240, background: '#343a40', color: '#fff', padding: 16 }}>
      <h2 style={{ color: '#fff', marginBottom: 24, textAlign: 'center' }}>DW Elevadores</h2>
      <NavLink to="/dashboard" style={linkStyle} end>
        <FaTachometerAlt style={{ marginRight: 8 }} /> Dashboard
      </NavLink>
      <NavLink to="/users" style={linkStyle}>
        <FaUsers style={{ marginRight: 8 }} /> Usuários
      </NavLink>
      <NavLink to="/financeiro" style={linkStyle}>
        <FaFileInvoiceDollar style={{ marginRight: 8 }} /> Financeiro
      </NavLink>
      <NavLink to="/engenharia" style={linkStyle}>
        <FaCogs style={{ marginRight: 8 }} /> Engenharia
      </NavLink>
      <NavLink to="/almoxarifado" style={linkStyle}>
        <FaBox style={{ marginRight: 8 }} /> Almoxarifado
      </NavLink>
      <NavLink to="/expedicao" style={linkStyle}>
        <FaShippingFast style={{ marginRight: 8 }} /> Expedição
      </NavLink>
    </nav>
  );
};

export default Sidebar;
