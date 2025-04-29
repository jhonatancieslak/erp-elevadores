import React from 'react';
import { FaBell, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const handleLogout = () => {
    // TODO: limpar sessão e redirecionar para login
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px',
      height: 60,
      background: '#fff',
      borderBottom: '1px solid #ddd'
    }}>
      <h1 style={{ margin: 0, fontSize: '1.25rem' }}>DW Elevadores</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FaBell style={{ fontSize: '1.25rem', marginRight: 20, cursor: 'pointer' }} />
        <FaSignOutAlt 
          style={{ fontSize: '1.25rem', cursor: 'pointer' }} 
          onClick={handleLogout} 
        />
      </div>
    </header>
  );
};

export default Header;
