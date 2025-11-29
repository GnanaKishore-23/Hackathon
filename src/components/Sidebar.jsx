import React from 'react';
import { User, LogOut } from 'lucide-react';

const Sidebar = ({ user, onLogout }) => {
  return (
    <div className="sidebar">
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '100px', height: '100px', backgroundColor: 'var(--pro-blue)', 
          borderRadius: '50%', margin: '0 auto 1rem', display: 'flex', 
          alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', 
          border: '4px solid var(--pink)'
        }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h3>{user.name}</h3>
        <p><User size={14} /> {user.role.toUpperCase()}</p>
        <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>{user.email}</p>
      </div>
      <button onClick={onLogout} style={{ background: 'var(--light-red)', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px' }}>
        <LogOut size={16} /> Logout
      </button>
    </div>
  );
};
export default Sidebar;