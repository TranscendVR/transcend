import App from '../components/App';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  isLoaded: state.isLoaded
});

export default connect(mapStateToProps)(App);
