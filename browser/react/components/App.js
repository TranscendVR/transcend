import React from 'react';
import '../../aframeComponents/scene-load';
import '../../aframeComponents/aframe-minecraft';
import AssetLoader from './AssetLoader';
import InitialLoading from './InitialLoading';

export default function App (props) {
  console.log('props ', props);
  return (
    // AssetLoader is a stateless component containing the a-assets for all of the React components
    //   rendered via props.children. It must reside here because A-Frame requires a-assets to a
    //   direct child of a-scene.
    <div style={{ width: '100%', height: '100%' }}>
      {!props.isLoaded ? (
      <div id="loadScreen" style={{ width: '100%', height: '100%', background: '#72C8F1', display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
        <InitialLoading/>
      </div>
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
