import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [creds, setCreds] = useState({ email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const validUser = users.find(u => u.email === creds.email && u.password === creds.password);

    if (validUser) {
      localStorage.setItem('currentUser', JSON.stringify({ ...validUser, role }));
      navigate('/dashboard');
    } else {
      alert('Wrong credentials. Please check email/password.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>System Login</h2>
        <div className="switch-container">
          <div className={`switch-opt ${role === 'student' ? 'active' : ''}`} onClick={() => setRole('student')}>Student</div>
          <div className={`switch-opt ${role === 'teacher' ? 'active' : ''}`} onClick={() => setRole('teacher')}>Teacher</div>
        </div>
        <form onSubmit={handleLogin}>
          <input required type="email" placeholder="Email" onChange={(e) => setCreds({...creds, email: e.target.value})} />
          <input required type="password" placeholder="Password" onChange={(e) => setCreds({...creds, password: e.target.value})} />
          <button type="submit" className="btn">Login as {role}</button>
        </form>
        <p onClick={() => navigate('/register')} style={{cursor:'pointer', color:'var(--pro-blue)', marginTop:'10px'}}>Register first</p>
      </div>
    </div>
  );
};
export default Login;