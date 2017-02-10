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

        {/*random shapes for positioning*/}
        {/*<a-entity geometry="primitive: box" material="color: orange; shader: flat" position="0 1 -4"></a-entity>
        <a-entity geometry="primitive: sphere; radius: 2.2" material="color: #F16745" position="0 2 -10"></a-entity>
        <a-entity geometry="primitive: sphere; radius: 1.75" material="color: #7BC8A4" position="-5 1.75 -5"></a-entity>
        <a-entity geometry="primitive: sphere; radius: 1" material="color: #4CC3D9" position="5 1 0"></a-entity>
        <a-entity geometry="primitive: sphere; radius: 2.5" material="color: #FFC65D" position="-7.5 0.5 0"></a-entity>
        <a-entity geometry="primitive: sphere; radius: 5" material="color: #93648D" position="10 0 -6"></a-entity>

        <a-entity id="ground" class="selectable" geometry="primitive: box; width: 100; height: 100; depth: 100" material="color: green" position="0 -50 0"></a-entity>
        <a-sky color="blue"></a-sky>*/}
      </a-scene>
    </div>
  );
}

/* ----------------- CONTAINER ------------------ */

const mapStateToProps = state => ({
  isLoaded: state.isLoaded
});

export default connect(mapStateToProps)(App);
