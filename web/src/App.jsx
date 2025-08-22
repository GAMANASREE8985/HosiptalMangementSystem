import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Doctors from './pages/Doctors';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';

function Private({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="layout">
      <Header />
      <div className="body">
        <Sidebar />
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Private><Dashboard /></Private>} />
            <Route path="/doctors" element={<Private><Doctors /></Private>} />
            <Route path="/patients" element={<Private><Patients /></Private>} />
            <Route path="/appointments" element={<Private><Appointments /></Private>} />
            <Route path="*" element={<div style={{padding:24}}>Not Found</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
