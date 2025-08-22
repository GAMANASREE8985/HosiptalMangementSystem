import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@hms.local');
  const [password, setPassword] = useState('Admin@123');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setErr('');
    try {
      await login(email, password);
      nav('/');
    } catch (e) {
      setErr(e.message || 'Login failed');
    }
  }

  return (
    <div className="auth">
      <form onSubmit={submit} className="card">
        <h2>Sign in</h2>
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <div className="error">{err}</div>}
        <div style={{display:'flex', gap:8}}>
          <button>Sign In</button>
          <Link to="/register" style={{alignSelf:'center'}}>Register</Link>
        </div>
      </form>
    </div>
  );
}
