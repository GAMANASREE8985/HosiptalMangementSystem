import React, { useEffect, useState } from 'react';
import { api } from '../api';
import DataTable from '../components/DataTable';

export default function Patients() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ name:'', age:'', gender:'Male', phone:'', address:'' });
  async function load(){ try{ setRows(await api.patients.list()); }catch(e){} }
  useEffect(()=>{ load(); },[]);
  async function create(e){ e.preventDefault(); await api.patients.create({ ...form, age: Number(form.age)||undefined }); setForm({ name:'', age:'', gender:'Male', phone:'', address:''}); await load(); }
  async function remove(id){ if(!confirm('Delete patient?')) return; await api.patients.remove(id); await load(); }

  const columns = [
    { key:'name', label:'Name' },
    { key:'age', label:'Age' },
    { key:'gender', label:'Gender' },
    { key:'phone', label:'Phone' },
    { key:'address', label:'Address' },
    { key:'actions', label:'', render: (_v,r) => <button onClick={()=>remove(r._id)}>Delete</button> }
  ];

  return (
    <div>
      <h2>Patients</h2>
      <form className="row" onSubmit={create}>
        <input placeholder="name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input placeholder="age" value={form.age} onChange={e=>setForm({...form,age:e.target.value})} />
        <select value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})}>
          <option>Male</option><option>Female</option><option>Other</option>
        </select>
        <input placeholder="phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
        <input placeholder="address" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} />
        <button>Add</button>
      </form>
      <DataTable columns={columns} rows={rows} />
    </div>
  );
}
