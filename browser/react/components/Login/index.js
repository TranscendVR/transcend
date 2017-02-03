import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import { login, logout } from '../../../redux/reducers/auth';
import styles from './styles';

/* ----------------- COMPONENT ------------------ */

@Radium
class Login extends React.Component {
  // Set the background style & size for just this component
  componentDidMount () {
    document.body.style.background = 'url(/images/background.png) no-repeat top center fixed';
    document.body.style.backgroundSize = 'cover';
  }

  // Remove background style & size when this component unmounts
  componentWillUnmount () {
    document.body.style.background = '';
    document.body.style.backgroundSize = '';
  }

  render () {
    return (
      <div style={styles.container}>
        <form onSubmit={this.props.login}>
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
        <a href="#" onClick={this.props.logout} style={styles.logout}>Log Out</a>
      </div>
    );
  }
}

/* ----------------- CONTAINER ------------------ */

const mapDispatch = dispatch => ({
  login (event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    dispatch(login(email, password));
  },
  logout () {
    dispatch(logout());
  }
});

export default connect(null, mapDispatch)(Login);
