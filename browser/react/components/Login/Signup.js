import React from 'react';
import styles from './styles';

export default (props) => (
      <div style={styles.container}>
        <form onSubmit={props.signup}>
          <div className="form-group">
            <input
              key="name"
              name="name"
              type="name"
              placeholder="name"
              style={styles.formControl}
              required
            />
          </div>
          <div className="form-group">
            <input
              key="displayName"
              name="displayName"
              type="displayName"
              placeholder="display name"
              style={styles.formControl}
              required
            />
          </div>
          <div className="form-group">
            <input
              key="email"
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
          <button style={styles.loginButton} type="submit">Sign Up</button>
        </form>
      </div>
);

