import React, { useEffect, useState } from 'react';
import { api } from '../api';
export default function Dashboard() {
  const [stats, setStats] = useState({ patients:0, doctors:0, appointments:0 });
  useEffect(()=>{
    async function load(){ 
      try {
        const [p,d,a] = await Promise.all([api.patients.list(), api.doctors.list(), api.appointments.list()]);
        setStats({ patients: p.length, doctors: d.length, appointments: a.length });
      } catch(e) {}
    }
    load();
  },[]);
  return (
    <div className="grid">
      <div className="kpi card"><h3>Patients</h3><strong>{stats.patients}</strong></div>
      <div className="kpi card"><h3>Doctors</h3><strong>{stats.doctors}</strong></div>
      <div className="kpi card"><h3>Appointments</h3><strong>{stats.appointments}</strong></div>
    </div>
  );
}
