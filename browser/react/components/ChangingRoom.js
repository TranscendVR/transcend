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
          wallColor="#BB96FF"
          floorColor=""
          floorTexture="#floorText"
          ceilingColor="#998403" />

        <Mannequin x="-14" y="0.75" z="5" xrot="0" yrot="0" zrot="0" skin="3djesus" nickname="3D Jesus"/>
        <Mannequin x="-12" y="0.75" z="5" xrot="0" yrot="0" zrot="0" skin="agentsmith" nickname="Agent Smith" />
        <Mannequin x="-10" y="0.75" z="5" xrot="0" yrot="0" zrot="0" skin="batman" nickname="Batman" />
        <Mannequin x="-8" y="0.75" z="5" xrot="0" yrot="0" zrot="0" skin="char" nickname="Minecraft" />
        <Mannequin x="-6" y="0.75" z="5" xrot="0" yrot="0" zrot="0" skin="god" nickname="God" />
        <Mannequin x="-4" y="0.75" z="5" xrot="0" yrot="0" zrot="0" skin="Iron-Man-Minecraft-Skin" nickname="Iron Man" />
        <Mannequin x="-2" y="0.75" z="5" xrot="0" yrot="0" zrot="0" skin="jetienne" nickname="Jetienne" />
        <Mannequin x="0" y="0.75" z="5" xrot="0" yrot="0" zrot="0" skin="Joker" nickname="Joker" />
        <Mannequin x="2" y="0.75" z="5" xrot="0" yrot="0" zrot="0" skin="Mario" nickname="Mario" />
        <Mannequin x="4" y="0.75" z="5" xrot="0" yrot="0" zrot="0" skin="martialartist" nickname="Martial Artist" />
        <Mannequin x="6" y="0.75" z="5" xrot="0" yrot="0" zrot="0" skin="robocop" nickname="Robocop" />
        <Mannequin x="8" y="0.75" z="5" xrot="0" yrot="0" zrot="0" skin="Sonicthehedgehog" nickname="Sonic" />
        <Mannequin x="-14" y="0.75" z="-5" xrot="0" yrot="180" zrot="0" skin="woody" nickname="woody" />
        <Mannequin x="-12" y="0.75" z="-5" xrot="0" yrot="180" zrot="0" skin="powerRanger" nickname="Power Ranger" />
        <Mannequin x="-10" y="0.75" z="-5" xrot="0" yrot="180" zrot="0" skin="catwoman" nickname="Catwoman" />
        <Mannequin x="-8" y="0.75" z="-5" xrot="0" yrot="180" zrot="0" skin="blackWidow" nickname="Black Widow" />
        <Mannequin x="-6" y="0.75" z="-5" xrot="0" yrot="180" zrot="0" skin="evilQueen" nickname="Evil Queen" />
        <Mannequin x="-4" y="0.75" z="-5" xrot="0" yrot="180" zrot="0" skin="graceHopper" nickname="Grace Hopper" />
        <Mannequin x="-2" y="0.75" z="-5" xrot="0" yrot="180" zrot="0" skin="princessBelle" nickname="Princess Belle" />
        <Mannequin x="0" y="0.75" z="-5" xrot="0" yrot="180" zrot="0" skin="skaterGirl" nickname="Skater Girl" />
        <Mannequin x="2" y="0.75" z="-5" xrot="0" yrot="180" zrot="0" skin="katnissEverdeen" nickname="Katniss Everdeen" />
        <Mannequin x="4" y="0.75" z="-5" xrot="0" yrot="180" zrot="0" skin="theflash" nickname="theflash" />
        <Mannequin x="6" y="0.75" z="-5" xrot="0" yrot="180" zrot="0" skin="Superman" nickname="Superman" />
        <Mannequin x="8" y="0.75" z="-5" xrot="0" yrot="180" zrot="0" skin="Spiderman" nickname="Spiderman" />

        <Teleporter
          color="green"
          label="Lobby"
          href="/vr"
          rotation="90"
          x="-24.5" y="1" z="-5"
          labelx="-1" labely="1"
        />
      </a-entity>
    );
  }
}
