import React from 'react';
import { NavLink } from 'react-router-dom';

const cls = ({ isActive }) => (isActive ? 'active' : undefined);

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink className={cls} to="/">Dashboard</NavLink>
      <NavLink className={cls} to="/patients">Patients</NavLink>
      <NavLink className={cls} to="/doctors">Doctors</NavLink>
      <NavLink className={cls} to="/appointments">Appointments</NavLink>
    </aside>
  );
}
