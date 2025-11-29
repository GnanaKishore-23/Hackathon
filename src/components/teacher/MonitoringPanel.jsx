import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';

const MonitoringPanel = ({ assignments, submissions, allUsers, onGrade }) => {
  const COLORS = ['#0088FE', '#FF8042'];
  const getPieData = () => {
    const completed = submissions.filter(s => s.status === 'Completed' || s.status === 'Graded').length;
    const totalTasks = allUsers.filter(u => u.role === 'student').length * assignments.length;
    return [{ name: 'Completed', value: completed }, { name: 'Pending', value: Math.max(0, totalTasks - completed) }];
  };
  const getBarData = () => assignments.map(a => {
    const subs = submissions.filter(s => s.assignmentId === a.id && s.grade && s.grade !== 'Pending');
    const avg = subs.length ? subs.reduce((acc, curr) => acc + parseInt(curr.grade || 0), 0) / subs.length : 0;
    return { name: a.title, avgGrade: avg };
  });

  return (
    <div>
      <div className="grid-3">
        <div className="chart-container">
          <h4>Submission Status</h4>
          <PieChart width={200} height={200}>
            <Pie data={getPieData()} cx="50%" cy="50%" outerRadius={60} fill="#8884d8" dataKey="value">
              {getPieData().map((e, i) => <Cell key={`c-${i}`} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className="chart-container">
          <h4>Avg Grade per Assignment</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={getBarData()}><XAxis dataKey="name" hide /><YAxis /><Tooltip /><Bar dataKey="avgGrade" fill="#82ca9d" /></BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-container">
          <h4>Activity Trends</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={[{name:'W1', v:2}, {name:'W2', v:5}, {name:'W3', v:submissions.length}]}><XAxis dataKey="name"/><YAxis/><Line type="monotone" dataKey="v" stroke="#8884d8" /></LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="content-card" style={{ marginTop: '20px' }}>
        <h3>Grading Portal</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{textAlign:'left'}}><th>Student</th><th>Task</th><th>Status</th><th>Grade</th><th>Stars</th><th>Save</th></tr></thead>
          <tbody>
            {submissions.map((sub, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{padding:'10px'}}>{sub.email}</td>
                <td>{assignments.find(a => a.id === sub.assignmentId)?.title}</td>
                <td><span className={`badge ${sub.status.includes('Completed') || sub.status === 'Graded' ? 'badge-completed' : ''}`}>{sub.status}</span></td>
                <td><input type="number" id={`g-${idx}`} defaultValue={sub.grade === 'Pending' ? '' : sub.grade} style={{width:'50px'}} /></td>
                <td><select id={`s-${idx}`} defaultValue={sub.stars}><option value="1">1</option><option value="5">5</option></select></td>
                <td><button className="action-btn" onClick={() => onGrade(sub.email, sub.assignmentId, document.getElementById(`g-${idx}`).value, document.getElementById(`s-${idx}`).value)}>Save</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default MonitoringPanel;