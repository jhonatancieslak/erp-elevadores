// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import Login           from './pages/Login';
import Dashboard       from './pages/Dashboard';
import SectorDashboard from './pages/SectorDashboard';
import Users           from './pages/Users';
import UserForm        from './components/UserForm';
import Financeiro      from './pages/Financeiro';
import Engenharia      from './pages/Engenharia';
import Almoxarifado    from './pages/Almoxarifado';
import Expedicao       from './pages/Expedicao';
import SAC             from './pages/Sac';
import Assistencia     from './pages/Assistencia';

import Sidebar         from './components/Sidebar';
import Header          from './components/Header';
import Footer          from './components/Footer';
import RequireAuth     from './components/RequireAuth';
import RequireSector   from './components/RequireSector';
import './App.css';

const ProtectedLayout = ({ collapsed, onToggle }) => (
  <div className="app-container">
    <Sidebar collapsed={collapsed} />
    <div className="main-area">
      <Header onToggleSidebar={onToggle} />
      <main className="content-area">
        <Outlet />
      </main>
      <Footer />
    </div>
  </div>
);

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Routes>
      {/* Rota pública */}
      <Route path="/" element={<Login />} />

      {/* Rotas protegidas */}
      <Route
        element={
          <RequireAuth>
            <ProtectedLayout
              collapsed={collapsed}
              onToggle={() => setCollapsed(c => !c)}
            />
          </RequireAuth>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/:sector/dashboard"
          element={
            <RequireSector>
              <SectorDashboard />
            </RequireSector>
          }
        />

        <Route path="/users" element={<Users />} />
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/users/:id" element={<UserForm />} />

        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/engenharia" element={<Engenharia />} />
        <Route path="/almoxarifado" element={<Almoxarifado />} />
        <Route path="/expedicao" element={<Expedicao />} />
        <Route path="/sac" element={<SAC />} />
        <Route path="/assistencia" element={<Assistencia />} />
      </Route>

      {/* Catch-all: redireciona ao login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
