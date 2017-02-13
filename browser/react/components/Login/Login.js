import React from 'react';
import { Link } from 'react-router';

export default (props) => (
  <div style={props.styles.container}>
    <div>
      <Link to="signup" style={props.styles.signupLink}>
        <button key="signup" style={props.styles.signupButton}>Sign Up</button>
      </Link>
    </div>
    <div style={props.styles.orDividerLineDiv}>
      <div style={props.styles.orDividerLineBefore}></div>
      <p style={props.styles.orDivider}>or</p>
      <div style={props.styles.orDividerLineAfter}></div>
    </div>
    <form onSubmit={props.login}>
      <div>
        <input
          key="name"
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
      <button style={props.styles.loginButton} type="submit">Log In</button>
    </form>
    <div style={props.styles.orDividerLineDiv}>
      <div style={props.styles.orDividerLineBefore}></div>
      <p style={props.styles.orDivider}>or</p>
      <div style={props.styles.orDividerLineAfter}></div>
    </div>
    <div>
      <a target="_self" href="/api/auth/google/login" style={props.styles.loginWithGoogle}>
        <span className="fa fa-google" style={props.styles.loginWithGoogleIcon}></span>
        Log in with Google
        </a>
    </div>
  </div>
);

