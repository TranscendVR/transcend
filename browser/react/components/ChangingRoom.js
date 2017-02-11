import React from 'react';
import { joinChatRoom, leaveChatRoom } from '../../webRTC/client.js';
import Teleporter from './Teleporter';
import Mannequin from './Mannequin';
import Room from './Room';

export default class Sean extends React.Component {

  componentDidMount () {
    joinChatRoom('changingroom');
  }

  componentWillUnmount () {
    leaveChatRoom();
  }

  render () {
    return (
      <a-entity>
        <Room floorWidth="50"
          floorHeight="50"
          wallHeight="25"
          wallColor="red"
          floorColor=""
          floorTexture="#floorText"
          ceilingColor="#998403" />

        <Mannequin x="-14" y="1.25" z="10" xrot="0" yrot="0" zrot="0" skin="3djesus" nickname="3D Jesus" />
        <Mannequin x="-12" y="1.25" z="10" xrot="0" yrot="0" zrot="0" skin="agentsmith" nickname="Agent Smith" />
        <Mannequin x="-10" y="1.25" z="10" xrot="0" yrot="0" zrot="0" skin="batman" nickname="Batman" />
        <Mannequin x="-8" y="1.25" z="10" xrot="0" yrot="0" zrot="0" skin="char" nickname="Minecraft" />
        <Mannequin x="-6" y="1.25" z="10" xrot="0" yrot="0" zrot="0" skin="god" nickname="God" />
        <Mannequin x="-4" y="1.25" z="10" xrot="0" yrot="0" zrot="0" skin="Iron-Man-Minecraft-Skin" nickname="Iron Man" />
        <Mannequin x="-2" y="1.25" z="10" xrot="0" yrot="0" zrot="0" skin="jetienne" nickname="Jetienne" />
        <Mannequin x="0" y="1.25" z="10" xrot="0" yrot="0" zrot="0" skin="Joker" nickname="Joker" />
        <Mannequin x="2" y="1.25" z="10" xrot="0" yrot="0" zrot="0" skin="Mario" nickname="Mario" />
        <Mannequin x="4" y="1.25" z="10" xrot="0" yrot="0" zrot="0" skin="martialartist" nickname="Martial Artist" />
        <Mannequin x="6" y="1.25" z="10" xrot="0" yrot="0" zrot="0" skin="robocop" nickname="Robocop" />
        <Mannequin x="8" y="1.25" z="10" xrot="0" yrot="0" zrot="0" skin="Sonicthehedgehog" nickname="Sonic" />
        <Mannequin x="10" y="1.25" z="10" xrot="0" yrot="0" zrot="0" skin="Spiderman" nickname="Spiderman" />
        <Mannequin x="12" y="1.25" z="10" xrot="0" yrot="0" zrot="0" skin="Superman" nickname="Superman" />
        <Mannequin x="14" y="1.25" z="10" xrot="0" yrot="0" zrot="0" skin="theflash" nickname="theflash" />
        <Mannequin x="16" y="1.25" z="10" xrot="0" yrot="0" zrot="0" skin="woody" nickname="woody" />

        <Teleporter
          color="green"
          label="Lobby"
          href="/vr"
          rotation="90"
          x="-24.5" y="1" z="-3"
          labelx="-1" labely="1"
        />
      </a-entity>
    );
  }
}

            // position="10 1.25 10"
          // minecraft='skinUrl: ../../images/3djesus.png;  component: body; heightMeter: 0.4'
        // position="20 1.25 -1"