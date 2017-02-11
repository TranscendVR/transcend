import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const style = { width: '100%', height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' };

export default function LoadingSpinner (props) {
  return (
    <div style={style}>
      <CircularProgress size={200} thickness={40} color="#286CB5" />
    </div>
  );
}
