import React from 'react';
import { TrendingUp } from 'lucide-react';

const BondMeter = ({ score, otherUser }) => (
  <div style={{ marginBottom: '10px' }}>
    <small style={{display:'flex', alignItems:'center', gap:'5px', color:'var(--deep-navy)'}}>
      <TrendingUp size={12} /> Bond with {otherUser}
    </small>
    <div className="bond-meter-container">
      <div className="bond-fill" style={{ width: `${score}%` }}></div>
    </div>
  </div>
);
export default BondMeter;