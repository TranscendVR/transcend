import React from 'react';
import { Link } from 'react-router';
import styles from './styles';

export default (props) => (
      <div style={styles.container}>
        <div>
          <Link to="signup" style={{'textDecoration': 'none'}}>
            <button key="signup" style={styles.signupButton}>Sign Up</button>
          </Link>
        </div>
        <div style={styles.orDividerLineDiv}>
          <div style={styles.orDividerLineBefore}></div>
          <p style={styles.orDivider}></p>
          <div style={styles.orDividerLineAfter}></div>
        </div>
        <form onSubmit={props.login}>
          <div className="form-group">
            <input
              key="name"
              name="email"
              type="email"
              placeholder="email"
              style={styles.formControl}
              required
            />
          </div>
          <div className="form-group">
            <input
              key="password"
              name="password"
              type="password"
              placeholder="password"
              style={styles.formControl}
              required
            />
          </div>
          <button style={styles.loginButton} type="submit">Log In</button>
        </form>
        <div style={styles.orDividerLineDiv}>
          <div style={styles.orDividerLineBefore}></div>
          <p style={styles.orDivider}>or</p>
          <div style={styles.orDividerLineAfter}></div>
        </div>
        <div>
        <a target="_self" href="/api/auth/google/login" style={styles.loginWithGoogle}>
          <span className="fa fa-google" style={styles.loginWithGoogleIcon}></span>
          Log in with Google
        </a>
        </div>
        <a href="#" onClick={props.logout} style={styles.logout}>Log Out</a>
      </div>
);
