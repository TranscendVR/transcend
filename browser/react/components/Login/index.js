import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import { login, logout, signup } from '../../../redux/reducers/auth';
import styles from './styles';

/* ----------------- COMPONENT ------------------ */

@Radium
class Home extends React.Component {
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
      <div>
        {this.props.children}
      </div>
    );
  }
}

/* ----------------- CONTAINER ------------------ */

const mapStateToProps = () => {
  return {
    styles: styles
  };
};

const mapDispatch = dispatch => ({
  login (event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    dispatch(login(email, password));
  },
  logout () {
    dispatch(logout());
  },
  signup (event) {
    event.preventDefault();
    const name = event.target.name.value;
    const displayName = event.target.displayName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    dispatch(signup(name, displayName, email, password));
  }
});

export default connect(mapStateToProps, mapDispatch)(Home);
