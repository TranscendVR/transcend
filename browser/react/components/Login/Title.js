import React from 'react';

/* ----------------- COMPONENT ------------------ */

export default (props) => (
  <div style={props.styles.aboutContainer} >
    <h1 style={props.styles.appTitle}>Transcend</h1>
    <div style={props.styles.subtitleCenter}> Virtual Teams </div>
    <div style={props.styles.subtitleCenter}> Shared VR Experiences </div>
    <div style={props.styles.subtitleCenter}> Real Friends </div>
    <a target="_blank" href="https://github.com/TranscendVR/transcend" style={props.styles.viewOnGitHub}>
      <span className="fa fa-github" style={props.styles.viewOnGitHubIcon}></span>
      View on GitHub
    </a>
  </div>
);
