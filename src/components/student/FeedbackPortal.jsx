import React, { useState } from 'react';

const FeedbackPortal = ({ projects, user, onGiveFeedback }) => {
  const [inputs, setInputs] = useState({});
  return (
    <div className="content-card">
      <h2>Feedback Portal</h2>
      {projects.map(p => (
        <div key={p.id} style={{ marginBottom: '20px', borderBottom: '1px solid #eee' }}>
          <h4>{p.title}</h4>
          <div style={{ background: '#f9f9f9', padding: '10px' }}>
            {p.feedbacks?.map((f, i) => <div key={i}><strong>{f.user}:</strong> {f.text}</div>) || 'No feedback yet.'}
          </div>
          <div style={{display:'flex', gap:'10px', marginTop:'10px'}}>
            <input placeholder="Write feedback..." value={inputs[p.id]||''} onChange={e=>setInputs({...inputs, [p.id]:e.target.value})} />
            <button className="action-btn" onClick={() => { onGiveFeedback(p.id, inputs[p.id]); setInputs({...inputs, [p.id]:''}); }}>Post</button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default FeedbackPortal;