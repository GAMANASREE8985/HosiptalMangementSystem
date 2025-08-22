import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="header">
      <h1 style={{margin:0}}>HMS</h1>
      <div className="spacer" />
      {user ? (
        <div className="userbox">
          <span>{user.name} ({user.role})</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div style={{color:'#9fb2d9'}}>Not signed in</div>
      )}
    </header>
  );
}
