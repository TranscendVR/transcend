export default {
  container: {
    position: 'relative',
    height: '300px',
    width: '320px',
    margin: '100px auto',
    paddingTop: '20px',
    paddingBottom: '20px',
    backgroundColor: 'rgba(25, 25, 25, 0.75)',
    boxShadow: '0px 10px 60px -5px #000',
    textAlign: 'center'
  },
  formControl: {
    padding: '10px 20px',
    display: 'block',
    margin: '15px auto',
    width: '210px',
    background: 'rgba(255, 255, 255, 0.15)',
    border: '2px solid rgba(255, 255, 255, 0)',
    overflow: 'hidden',
    transition: 'all 0.5s ease-in-out',
    ':focus': {
      outline: '0',
      border: '2px solid rgba(255, 255, 255, 0.5)',
      background: 'rgba(0, 0, 0, 0)',
      opacity: '0.6'
    }
  }
};
