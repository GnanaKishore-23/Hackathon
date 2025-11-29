import React, { useState } from 'react';
import { FileText, Activity } from 'lucide-react';
import MonitoringPanel from './MonitoringPanel';

const TeacherView = ({ assignments, submissions, allUsers, onCreateAssignment, onGradeStudent }) => {
  const [activeTab, setActiveTab] = useState('assignments');
  const [newAssignment, setNewAssignment] = useState({ title: '', desc: '' });

  return (
    <>
      <div className="nav-tabs">
        <button className={`tab-btn ${activeTab === 'assignments' ? 'active' : ''}`} onClick={() => setActiveTab('assignments')}><FileText size={18}/> Assignments</button>
        <button className={`tab-btn ${activeTab === 'monitoring' ? 'active' : ''}`} onClick={() => setActiveTab('monitoring')}><Activity size={18}/> Monitoring</button>
      </div>
      {activeTab === 'assignments' && (
        <div className="content-card">
          <h2>Create Assignment</h2>
          <input placeholder="Title" value={newAssignment.title} onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })} />
          <textarea placeholder="Description" value={newAssignment.desc} onChange={(e) => setNewAssignment({ ...newAssignment, desc: e.target.value })} />
          <button className="action-btn" onClick={() => { onCreateAssignment(newAssignment); setNewAssignment({title:'', desc:''}); }}>Upload</button>
          <h3>Active List</h3>
          {assignments.map(a => <div key={a.id} style={{borderBottom:'1px solid #eee', padding:'10px'}}><strong>{a.title}</strong>: {a.desc}</div>)}
        </div>
      )}
      {activeTab === 'monitoring' && <MonitoringPanel assignments={assignments} submissions={submissions} allUsers={allUsers} onGrade={onGradeStudent} />}
    </>
  );
};
export default TeacherView;