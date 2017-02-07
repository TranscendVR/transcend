import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default function LoadingSpinner (props) {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#7AC9F1', backgroundImage: 'url(/images/background.png)', display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
      <CircularProgress size={200} thickness={40} color="#286CB5"/>
    </div>
  );
}
