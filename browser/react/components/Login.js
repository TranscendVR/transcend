
import React from 'react';
import { connect } from 'react-redux';

import { login, logout } from '../../redux/reducers/auth';

/* ----------------- COMPONENT ------------------ */

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  render () {
    return (
      <div>
        <form onSubmit={this.onLoginSubmit}>
          <div className="form-group">
            <label>email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              required
            />
          </div>
          <button type="submit">Log In</button>
        </form>
        <div>
          <button onClick={this.props.logout}>Logout</button>
        </div>
        <div>
          <p>
            <a target="_self" href="/auth/google">
              <span>Log in with Google</span>
            </a>
          </p>
        </div>
      </div>
    );
  }

  onLoginSubmit (event) {
    console.log('Login submitted');
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);
    this.props.login(email, password);
  }
}

/* ----------------- CONTAINER ------------------ */

// const mapState = () => ({});

const mapDispatch = dispatch => ({
  login (email, password) {
    dispatch(login(email, password));
  },
  logout () {
    dispatch(logout());
  }
});

export default connect(null, mapDispatch)(Login);
