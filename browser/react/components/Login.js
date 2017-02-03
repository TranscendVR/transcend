import React from 'react';
import { connect } from 'react-redux';
import { login, logout } from '../../redux/reducers/auth';

/* ----------------- COMPONENT ------------------ */

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
      <div className="login-div">
        <form onSubmit={this.props.login}>
          <div className="form-group">
            <input
              name="email"
              type="email"
              placeholder="email"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              type="password"
              placeholder="password"
              className="form-control"
              required
            />
          </div>
          <button className="login-button" type="submit">Log In</button>
        </form>
        <p className="or-divider">or</p>
        <div>
        <a target="_self" href="/api/auth/google/login" className="login-with-google">
          <span className="icon fa fa-google"></span>
          Log in with Google
        </a>
        </div>
        <a href="#" onClick={this.props.logout} className="logout">Log Out</a>
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
