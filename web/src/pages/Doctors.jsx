import React, { useEffect, useState } from 'react';
import { api } from '../api';
import DataTable from '../components/DataTable';
import { useAuth } from '../context/AuthContext';

export default function Doctors() {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ name:'', specialization:'', email:'', phone:'', room:'' });
  async function load(){ try { setRows(await api.doctors.list()); } catch(e){ console.error(e); } }
  useEffect(()=>{ load(); },[]);
  async function create(e){ e.preventDefault(); await api.doctors.create(form); setForm({name:'',specialization:'',email:'',phone:'',room:''}); await load(); }
  async function remove(id){ if(!confirm('Delete doctor?')) return; await api.doctors.remove(id); await load(); }

  const columns = [
    { key:'name', label:'Name' },
    { key:'specialization', label:'Specialization' },
    { key:'email', label:'Email' },
    { key:'phone', label:'Phone' },
    { key:'room', label:'Room' },
    { key:'actions', label:'', render: (_v,r) => <button onClick={()=>remove(r._id)}>Delete</button> }
  ];

  return (
    <div>
      <h2>Doctors</h2>
      {user?.role === 'admin' && (
        <form className="row" onSubmit={create}>
          <input placeholder="name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input placeholder="specialization" value={form.specialization} onChange={e=>setForm({...form,specialization:e.target.value})} />
          <input placeholder="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          <input placeholder="phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
          <input placeholder="room" value={form.room} onChange={e=>setForm({...form,room:e.target.value})} />
          <button>Add</button>
        </form>
      )}
      <DataTable columns={columns} rows={rows} />
    </div>
  );
}
