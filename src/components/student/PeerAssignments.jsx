import React from 'react';
import { FileText, Star } from 'lucide-react';

const PeerAssignments = ({ assignments, submissions, user, onSubmit }) => (
  <div className="content-card">
    <h2><FileText size={20} /> Peer Review Assignments</h2>
    {assignments.map(assign => {
      const mySub = submissions.find(s => s.assignmentId === assign.id && s.email === user.email);
      return (
        <div key={assign.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom:'10px' }}>
          <h3>{assign.title}</h3>
          <p>{assign.desc}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            {mySub ? (
              <span>
                <span className="badge badge-completed">{mySub.status}</span>
                {mySub.status === 'Graded' && <span style={{color:'var(--pink)', marginLeft:'10px', fontWeight:'bold'}}> Grade: {mySub.grade} | {mySub.stars} <Star size={12}/></span>}
              </span>
            ) : <button className="action-btn" onClick={() => onSubmit(assign.id)}>Submit Assignment</button>}
          </div>
        </div>
      );
    })}
  </div>
);
export default PeerAssignments;