import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

// const style = { width: '100%', height: '100%', backgroundColor: '#7AC9F1', backgroundImage: 'url(/images/background.png)', display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' };
const style = { width: '100%', height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' };

export default class LoadingSpinner extends React.Component {

  render () {
    return (
      <div style={style}>
        <CircularProgress size={200} thickness={40} color="#286CB5" />
      </div>
    );
  }
}
