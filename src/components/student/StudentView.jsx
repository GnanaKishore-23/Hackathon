import React, { useState } from 'react';
import { FileText, Users, MessageSquare } from 'lucide-react';
import PeerAssignments from './PeerAssignments';
import CollaborationPanel from './CollaborationPanel';
import FeedbackPortal from './FeedbackPortal';

const StudentView = (props) => {
  const [activeTab, setActiveTab] = useState('peer-review');
  return (
    <>
      <div className="nav-tabs">
        <button className={`tab-btn ${activeTab==='peer-review'?'active':''}`} onClick={()=>setActiveTab('peer-review')}><FileText/> Peer Reviews</button>
        <button className={`tab-btn ${activeTab==='collaboration'?'active':''}`} onClick={()=>setActiveTab('collaboration')}><Users/> Collaboration</button>
        <button className={`tab-btn ${activeTab==='feedback'?'active':''}`} onClick={()=>setActiveTab('feedback')}><MessageSquare/> Feedback</button>
      </div>
      {activeTab === 'peer-review' && <PeerAssignments {...props} onSubmit={props.onSubmitAssignment} />}
      {activeTab === 'collaboration' && <CollaborationPanel {...props} onUpload={props.onUploadProject} onCollaborate={props.onCollaborate} />}
      {activeTab === 'feedback' && <FeedbackPortal {...props} onGiveFeedback={props.onGiveFeedback} />}
    </>
  );
};
export default StudentView;