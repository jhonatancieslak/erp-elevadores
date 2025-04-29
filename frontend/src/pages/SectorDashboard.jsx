import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUsers,
  FaFileInvoiceDollar,
  FaCogs,
  FaBox,
  FaShippingFast,
  FaPhone,
  FaLifeRing
} from 'react-icons/fa';
import './SectorDashboard.css';

const moduleMap = {
  admin: [
    { label: 'Dashboard Geral', path: '/dashboard', icon: <FaTachometerAlt /> },
    { label: 'Usuários',       path: '/users',       icon: <FaUsers /> },
    { label: 'Financeiro',     path: '/financeiro',  icon: <FaFileInvoiceDollar /> },
    { label: 'Engenharia',     path: '/engenharia',  icon: <FaCogs /> },
    { label: 'Almoxarifado',   path: '/almoxarifado',icon: <FaBox /> },
    { label: 'Expedição',      path: '/expedicao',   icon: <FaShippingFast /> },
    { label: 'SAC',            path: '/sac',         icon: <FaPhone /> },
    { label: 'Assistência',    path: '/assistencia', icon: <FaLifeRing /> }
  ],
  engenharia: [
    { label: 'Dashboard Eng.', path: '/engenharia/dashboard', icon: <FaCogs /> },
    { label: 'Projetos',       path: '/engenharia',           icon: <FaCogs /> }
  ],
  financeiro: [
    { label: 'Dashboard Fin.', path: '/financeiro/dashboard', icon: <FaFileInvoiceDollar /> },
    { label: 'Contas a Pagar', path: '/financeiro',          icon: <FaFileInvoiceDollar /> }
  ]
  // adicione outros setores conforme necessário
};

const SectorDashboard = () => {
  const { sector } = useParams();
  const modules    = moduleMap[sector] || [];

  return (
    <div className="dashboard-page">
      <h1>Bem-vindo ao painel de <span className="sector-name">{sector}</span></h1>
      <div className="dashboard-cards">
        {modules.map(m => (
          <Link key={m.path} to={m.path} className="dashboard-card">
            <div className="card-icon">{m.icon}</div>
            <div className="card-label">{m.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SectorDashboard;
