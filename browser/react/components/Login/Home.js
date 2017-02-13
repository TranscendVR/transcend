import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import { login, logout, signup } from '../../../redux/reducers/auth';
import styles from './styles';
import Title from './Title';

/* ----------------- COMPONENT ------------------ */

@Radium
class Home extends React.Component {


  render () {
    return (
      <div>
        <Title styles={this.props.styles} />
        {this.props.children && React.cloneElement(this.props.children, this.props)}
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
