import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '600px' }}>
        <h1 style={{color: 'var(--deep-navy)'}}>FEDF-PS26</h1>
        <h2>Peer Review & Collaboration Platform</h2>
        <p style={{ lineHeight: '1.6', color: '#666' }}>
          Welcome to the student collaboration hub. Work together on projects, 
          review peer work, and provide constructive feedback.
        </p>
        <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
          <button className="btn" onClick={() => navigate('/login')}>Login</button>
          <button className="btn" style={{backgroundColor:'var(--pink)'}} onClick={() => navigate('/register')}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};
export default Home;