export default {
  aboutContainer: {
    position: 'relative',
    height: '160px',
    width: '320px',
    margin: '50px auto 25px auto',
    paddingTop: '20px',
    paddingBottom: '20px',
    backgroundColor: 'rgba(25, 25, 25, 0.75)',
    boxShadow: '0px 10px 60px -5px #000',
    borderRadius: '2px',
    textAlign: 'center',
    color: '#FFF'
  },
  appTitle: {
    margin: '5px auto'
  },
  subtitleLeft: {
    marginLeft: '10px',
    textAlign: 'left'
  },
  subtitleCenter: {
    textAlign: 'center'
  },
  subtitleRight: {
    marginRight: '10px',
    textAlign: 'right'
  },
  viewOnGitHub: {
    width: '254px',
    height: '39px',
    display: 'block',
    margin: '15px auto',
    color: '#FFF',
    textAlign: 'center',
    lineHeight: '40px',
    fontSize: '14px',
    backgroundColor: 'purple',
    textDecoration: 'none',
    borderRadius: '2px'
  },
  viewOnGitHubIcon: {
    float: 'left',
    fontSize: '21px',
    width: '50px',
    height: '26px',
    margin: '7px',
    padding: '2px',
    textAlign: 'center',
    borderRight: '1px solid #FFF'
  },
  container: {
    position: 'relative',
    height: '400px',
    width: '320px',
    margin: '25px auto 50px auto',
    paddingTop: '20px',
    paddingBottom: '20px',
    backgroundColor: 'rgba(25, 25, 25, 0.75)',
    boxShadow: '0px 10px 60px -5px #000',
    borderRadius: '2px',
    textAlign: 'center'
  },
  signUpContainer: {
    position: 'relative',
    height: '300px',
    width: '320px',
    margin: '25px auto 50px auto',
    paddingTop: '20px',
    paddingBottom: '20px',
    backgroundColor: 'rgba(25, 25, 25, 0.75)',
    boxShadow: '0px 10px 60px -5px #000',
    borderRadius: '2px',
    textAlign: 'center'
  },
  formControl: {
    padding: '10px 20px',
    display: 'block',
    margin: '15px auto',
    width: '210px',
    fontSize: '14px',
    textAlign: 'center',
    color: '#FFF',
    background: 'rgba(255, 255, 255, 0.15)',
    border: '2px solid rgba(255, 255, 255, 0)',
    borderRadius: '2px',
    overflow: 'hidden',
    transition: 'all 0.5s ease-in-out',
    ':focus': {
      outline: 'none',
      border: '2px solid rgba(255, 255, 255, 0.5)',
      borderRadius: '2px',
      background: 'rgba(0, 0, 0, 0)',
      opacity: '0.6'
    }
  },
  loginButton: {
    backgroundColor: '#2F75B8',
    color: '#FFF',
    width: '254px',
    height: '39px',
    paddingLeft: '0',
    paddingRight: '0',
    display: 'block',
    marginTop: '10px',
    marginLeft: 'auto',
    marginRight: 'auto',
    border: 'none',
    borderRadius: '2px',
    fontSize: '14px',
    transition: 'all 0.25s ease-in-out',
    ':hover': {
      cursor: 'pointer'
    },
    ':focus': {
      outline: 'none'
    }
  },
  signupLink: {
    textDecoration: 'none'
  },
  signupButton: {
    backgroundColor: '#3FA03F',
    color: '#FFF',
    width: '254px',
    height: '39px',
    paddingLeft: '0',
    paddingRight: '0',
    display: 'block',
    marginTop: '10px',
    marginLeft: 'auto',
    marginRight: 'auto',
    border: 'none',
    borderRadius: '2px',
    fontSize: '14px',
    transition: 'all 0.25s ease-in-out',
    ':hover': {
      cursor: 'pointer'
    },
    ':focus': {
      outline: 'none'
    }
  },
  // The `or-divider` is the thingy that divides local login from OAuth login
  orDividerLineDiv: {
    marginTop: '20px',
    marginBottom: '20px'
  },
  orDividerLineBefore: {
    backgroundColor: '#A9A9A9',
    content: '',
    display: 'inline-block',
    height: '1px',
    position: 'relative',
    verticalAlign: 'middle',
    width: '35%',
    marginLeft: '-50%'
  },
  orDivider: {
    display: 'inline',
    overflow: 'hidden',
    textAlign: 'center',
    margin: '20px 20px',
    color: '#A9A9A9'
  },
  orDividerLineAfter: {
    backgroundColor: '#A9A9A9',
    content: '',
    display: 'inline-block',
    height: '1px',
    position: 'relative',
    verticalAlign: 'middle',
    width: '35%',
    marginRight: '-50%'
  },
  loginWithGoogle: {
    width: '254px',
    height: '39px',
    display: 'block',
    margin: '15px auto',
    color: '#FFF',
    textAlign: 'center',
    lineHeight: '40px',
    fontSize: '14px',
    backgroundColor: '#DB4A37',
    textDecoration: 'none',
    borderRadius: '2px'
  },
  loginWithGoogleIcon: {
    float: 'left',
    fontSize: '21px',
    width: '50px',
    height: '26px',
    margin: '7px',
    padding: '2px',
    textAlign: 'center',
    borderRight: '1px solid #FFF'
  },
  logout: {
    fontSize: '8px',
    textDecoration: 'none',
    color: '#2F75B8'
  }
};
