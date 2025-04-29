import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      background: '#f8f9fa',
      borderTop: '1px solid #ddd'
    }}>
      <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
        © 2025 DW Elevadores. Todos os direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;
