import React from 'react';
import { connect } from 'react-redux';
import '../../aframeComponents/scene-load';
import '../../aframeComponents/aframe-minecraft';
import AssetLoader from './AssetLoader';
import LoadingSpinner from './LoadingSpinner';

/* ----------------- COMPONENT ------------------ */

const style = { 'width': '100%', 'height': '100%' };
function App (props) {
  return (
    // AssetLoader is a stateless component containing the a-assets for all of the React components
    //   rendered via props.children. It must reside here because A-Frame requires a-assets to a
    //   direct child of a-scene.
    // The LoadingSpinner hides the a-scent by pushing it below the visible screen until loaded
    <div style={style}>
      {!props.isLoaded ? (
        <LoadingSpinner />
      )
        : null
      }
      <a-scene id="scene" scene-load>
        <AssetLoader />
        {props.children}
      </a-scene>
    </div>
  );
}

/* ----------------- CONTAINER ------------------ */

const mapStateToProps = state => ({
  isLoaded: state.isLoaded
});

export default connect(mapStateToProps)(App);
