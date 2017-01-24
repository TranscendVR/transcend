import React from 'react';

const App = props => {
  return (
    <div id="main">
      {props.children && React.cloneElement(props.children, props)}
    </div>
  );
};

export default App;
