import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RequireAuth = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    // não está logado → volta ao login
    return <Navigate to="/" replace />;
  }
  return children;
};

export default RequireAuth;
