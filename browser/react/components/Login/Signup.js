import React from 'react';

export default (props) => {
  console.log('PROPS', props);
  return (
    <div style={props.styles.signUpContainer}>
      <form onSubmit={props.signup}>
        <div className="form-group">
          <input
            key="name"
            name="name"
            type="name"
            placeholder="name"
            style={props.styles.formControl}
            required
          />
        </div>
        <div className="form-group">
          <input
            key="displayName"
            name="displayName"
            type="displayName"
            placeholder="display name"
            style={props.styles.formControl}
            required
          />
        </div>
        <div className="form-group">
          <input
            key="email"
            name="email"
            type="email"
            placeholder="email"
            style={props.styles.formControl}
            required
          />
        </div>
        <div className="form-group">
          <input
            key="password"
            name="password"
            type="password"
            placeholder="password"
            style={props.styles.formControl}
            required
          />
        </div>
        <button style={props.styles.loginButton} type="submit">Sign Up</button>
      </form>
    </div>
  );
};

