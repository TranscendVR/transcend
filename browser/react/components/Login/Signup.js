import React from 'react';

export default (props) => {
  return (
    <div style={props.styles.signUpContainer}>
      <form onSubmit={props.signup}>
        <div>
          <input
            key="name"
            name="name"
            placeholder="name"
            style={props.styles.formControl}
            required
          />
        </div>
        <div>
          <input
            key="displayName"
            name="displayName"
            placeholder="display name"
            maxLength="8"
            style={props.styles.formControl}
            required
          />
        </div>
        <div>
          <input
            key="email"
            name="email"
            type="email"
            placeholder="email"
            style={props.styles.formControl}
            required
          />
        </div>
        <div>
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

