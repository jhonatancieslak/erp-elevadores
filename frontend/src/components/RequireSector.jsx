import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RequireSector = ({ children }) => {
  const { sector: userSector } = useAuth();
  const { sector } = useParams();

  if (sector !== userSector) {
    // setor errado → redireciona ao dashboard do próprio setor
    return <Navigate to={`/${userSector}/dashboard`} replace />;
  }
  return children;
};

export default RequireSector;
