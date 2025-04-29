import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';

// Layout protegido para rotas internas
const ProtectedLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, padding: '20px' }}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública de login */}
        <Route path="/" element={<Login />} />

        {/* Rotas protegidas */}
        <Route element={<ProtectedLayout />}>          
          <Route path="/dashboard" element={<Dashboard />} />
          {/* futuras rotas podem ser adicionadas aqui */}
        </Route>

        {/* redirecionamento para login se não encontrado */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
