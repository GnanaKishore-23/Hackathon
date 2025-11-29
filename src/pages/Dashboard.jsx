import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TeacherView from '../components/teacher/TeacherView';
import StudentView from '../components/student/StudentView';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [data, setData] = useState({ assignments: [], projects: [], submissions: [], users: [] });

  useEffect(() => {
    const u = localStorage.getItem('currentUser');
    if (!u) return navigate('/login');
    setUser(JSON.parse(u));
    setData({
      assignments: JSON.parse(localStorage.getItem('assignments')) || [],
      projects: JSON.parse(localStorage.getItem('projects')) || [],
      submissions: JSON.parse(localStorage.getItem('submissions')) || [],
      users: JSON.parse(localStorage.getItem('users')) || []
    });
  }, [navigate]);

  const updateDB = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
    setData(prev => ({ ...prev, [key]: val }));
  };

  const actions = {
    createAssign: (a) => updateDB('assignments', [...data.assignments, { id: Date.now(), ...a }]),
    gradeStudent: (email, aId, g, s) => {
      const subs = [...data.submissions];
      const idx = subs.findIndex(x => x.email === email && x.assignmentId === aId);
      const entry = { email, assignmentId: aId, grade: g, stars: s, status: 'Graded' };
      if (idx > -1) subs[idx] = { ...subs[idx], ...entry }; else subs.push(entry);
      updateDB('submissions', subs);
    },
    submitAssign: (aId) => {
      const subs = [...data.submissions];
      const idx = subs.findIndex(x => x.email === user.email && x.assignmentId === aId);
      if(idx > -1) subs[idx].status = 'Completed'; else subs.push({email: user.email, assignmentId: aId, status:'Completed', grade:'Pending'});
      updateDB('submissions', subs);
    },
    uploadProject: (p) => updateDB('projects', [...data.projects, { id: Date.now(), ...p, owner: user.email, ownerName: user.name, collaborators: [], feedbacks: [] }]),
    collaborate: (pId) => updateDB('projects', data.projects.map(p => p.id === pId ? { ...p, collaborators: [...p.collaborators, user.name] } : p)),
    giveFeedback: (pId, txt) => updateDB('projects', data.projects.map(p => p.id === pId ? { ...p, feedbacks: [...(p.feedbacks||[]), { user: user.name, text: txt }] } : p))
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <Sidebar user={user} onLogout={() => { localStorage.removeItem('currentUser'); navigate('/'); }} />
      <div className="main-content">
        {user.role === 'teacher' ? 
          <TeacherView assignments={data.assignments} submissions={data.submissions} allUsers={data.users} onCreateAssignment={actions.createAssign} onGradeStudent={actions.gradeStudent} /> : 
          <StudentView user={user} assignments={data.assignments} submissions={data.submissions} projects={data.projects} onSubmitAssignment={actions.submitAssign} onUploadProject={actions.uploadProject} onCollaborate={actions.collaborate} onGiveFeedback={actions.giveFeedback} />
        }
      </div>
    </div>
  );
};
export default Dashboard;