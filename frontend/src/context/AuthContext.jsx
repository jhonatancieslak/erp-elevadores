import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({
  token: null,
  sector: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [token, setToken]   = useState(null);
  const [sector, setSector] = useState(null);
  const navigate            = useNavigate();

  // Ao montar, inicializa a partir do localStorage
  useEffect(() => {
    const t = localStorage.getItem('token');
    const s = localStorage.getItem('sector');
    if (t) setToken(t);
    if (s) setSector(s);
  }, []);

  const login = (newToken, newSector) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('sector', newSector);
    setToken(newToken);
    setSector(newSector);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('sector');
    setToken(null);
    setSector(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ token, sector, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook auxiliar
export const useAuth = () => useContext(AuthContext);
