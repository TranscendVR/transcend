import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import { signup } from '../../redux/reducers/auth';
import styles from './Login/styles';

/* ----------------- COMPONENT ------------------ */

@Radium
class Signup extends React.Component {
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
        <form onSubmit={this.props.signup}>
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
  }
}

/* ----------------- CONTAINER ------------------ */

const mapDispatch = dispatch => ({
  signup (event) {
    event.preventDefault();
    const name = event.target.name.value;
    const displayName = event.target.displayName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    dispatch(signup(name, displayName, email, password));
  }
});

export default connect(null, mapDispatch)(Signup);
