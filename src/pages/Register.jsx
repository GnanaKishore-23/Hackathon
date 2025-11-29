import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', idNo: '', phone: '', altEmail: '', email: '', password: '' });

  const handleRegister = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (existingUsers.find(user => user.email === formData.email)) {
      alert('Credentials already available. Please Login.');
    } else {
      localStorage.setItem('users', JSON.stringify([...existingUsers, formData]));
      alert('Registration Successful! Redirecting to Login...');
      navigate('/login');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>First Registration</h2>
        <form onSubmit={handleRegister}>
          <input required type="text" placeholder="Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input required type="text" placeholder="Student ID" onChange={(e) => setFormData({...formData, idNo: e.target.value})} />
          <input required type="tel" placeholder="Phone" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          <hr />
          <input required type="email" placeholder="Email (Login ID)" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input required type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
          <button type="submit" className="btn">Register Credentials</button>
        </form>
        <p onClick={() => navigate('/login')} style={{cursor:'pointer', color:'var(--pro-blue)', marginTop:'10px'}}>Login here</p>
      </div>
    </div>
  );
};
export default Register;