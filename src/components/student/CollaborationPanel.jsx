import React, { useState } from 'react';
import BondMeter from '../BondMeter';

const CollaborationPanel = ({ user, projects, onUpload, onCollaborate }) => {
  const [newProject, setNewProject] = useState({ title: '', desc: '' });
  const getBondScore = (other) => {
    let score = 0;
    projects.forEach(p => { if ((p.owner === user.email || p.collaborators.includes(user.name)) && (p.ownerName === other || p.collaborators.includes(other))) score += 20; });
    return Math.min(score, 100);
  };

  return (
    <div>
      <div className="content-card">
        <h3>Upload Project</h3>
        <div className="grid-2">
          <input placeholder="Title" value={newProject.title} onChange={(e) => setNewProject({...newProject, title:e.target.value})} />
          <input placeholder="Desc" value={newProject.desc} onChange={(e) => setNewProject({...newProject, desc:e.target.value})} />
        </div>
        <button className="action-btn" onClick={() => { onUpload(newProject); setNewProject({title:'', desc:''}); }}>Publish</button>
      </div>
      <div className="grid-2">
        {projects.map(p => (
          <div key={p.id} className="content-card" style={{borderLeftColor:'var(--pink)'}}>
            <h4>{p.title} <small>by {p.ownerName}</small></h4>
            {p.owner !== user.email && <BondMeter score={getBondScore(p.ownerName)} otherUser={p.ownerName} />}
            <p>{p.desc}</p>
            <p><strong>Collaborators:</strong> {p.collaborators.join(', ') || 'None'}</p>
            {p.owner !== user.email && (
              <button className="action-btn" disabled={p.collaborators.includes(user.name)} onClick={() => onCollaborate(p.id)}>
                {p.collaborators.includes(user.name) ? 'Collaborating' : 'Collaborate'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default CollaborationPanel;