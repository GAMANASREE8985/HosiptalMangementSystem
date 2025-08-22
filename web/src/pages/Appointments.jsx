import React, { useEffect, useState } from 'react';
import { api } from '../api';
import DataTable from '../components/DataTable';

export default function Appointments() {
  const [rows, setRows] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ patient:'', doctor:'', time:'', reason:'' });

  async function load(){ 
    try {
      const [a,d,p] = await Promise.all([api.appointments.list(), api.doctors.list(), api.patients.list()]);
      setRows(a); setDoctors(d); setPatients(p);
    } catch(e) { console.error(e); }
  }
  useEffect(()=>{ load(); },[]);
  async function create(e){ e.preventDefault(); await api.appointments.create({ ...form, time: new Date(form.time) }); setForm({ patient:'', doctor:'', time:'', reason:'' }); await load(); }
  async function remove(id){ if(!confirm('Delete appointment?')) return; await api.appointments.remove(id); await load(); }

  const columns = [
    { key:'patient', label:'Patient', render: (_v,r) => r.patient?.name },
    { key:'doctor', label:'Doctor', render: (_v,r) => r.doctor?.name },
    { key:'time', label:'Time', render: (v) => v ? new Date(v).toLocaleString() : '' },
    { key:'reason', label:'Reason' },
    { key:'status', label:'Status' },
    { key:'actions', label:'', render: (_v,r) => <button onClick={()=>remove(r._id)}>Delete</button> }
  ];

  return (
    <div>
      <h2>Appointments</h2>
      <form className="row" onSubmit={create}>
        <select value={form.patient} onChange={e=>setForm({...form,patient:e.target.value})}>
          <option value="">Select Patient</option>
          {patients.map(p=> <option key={p._id} value={p._id}>{p.name}</option>)}
        </select>
        <select value={form.doctor} onChange={e=>setForm({...form,doctor:e.target.value})}>
          <option value="">Select Doctor</option>
          {doctors.map(d=> <option key={d._id} value={d._id}>{d.name}</option>)}
        </select>
        <input type="datetime-local" value={form.time} onChange={e=>setForm({...form,time:e.target.value})} />
        <input placeholder="reason" value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})} />
        <button>Schedule</button>
      </form>
      <DataTable columns={columns} rows={rows} />
    </div>
  );
}
