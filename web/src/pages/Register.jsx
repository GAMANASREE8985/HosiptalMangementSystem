import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'reception' });
  const [err, setErr] = useState('');
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setErr('');
    try {
      await register(form);
      nav('/login');
    } catch (e) {
      setErr(e.message || 'Register failed');
    }
  }

  return (
    <div className="auth">
      <form onSubmit={submit} className="card">
        <h2>Register</h2>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
          <option value="reception">Reception</option>
          <option value="doctor">Doctor</option>
        </select>
        {err && <div className="error">{err}</div>}
        <button>Register</button>
      </form>
    </div>
  );
}
