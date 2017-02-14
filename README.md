# Transcend

[ ![Codeship Status for TranscendVR/transcend](https://app.codeship.com/projects/99da1ca0-c4d2-0134-5840-0ea22bbd4aa1/status?branch=master)](https://app.codeship.com/projects/198072)

***v.*** be or go beyond the range or limits of

A VR environment in which people across geographical boundaries can congregate, move around, explore, and interact as if they were actually together. It's a world that goes beyond traditional boundaries, allowing people from different places, situations, and walks of life to come together to share ideas and experiences.

## Why?

Social VR apps like [AltSpace](https://altvr.com/) and [vTime](https://vtime.net/) are redefining what it means to hang out with someone(s). Fullstack Academy has chosen Daydream as its VR platform of choice for its Remote Immersive program. However, vTime has only recently added Daydream support, and AltSpace still doesn't natively support Daydream. Both only allow small groups, up to six people/avatars, to join one "room" and hang out with each other.

As Mark Davis, Fullstack's Product Manager, describes [in a post about Fullstack's VR Lab](https://www.fullstackacademy.com/blog/vr-lab-jan-2017):

> Here’s what we wish existed, now: a simple VR environment where up to 25 avatars can interact with each other, with real-time voice chat, that’s accessible on a Google Daydream headset as an MVP, but is also extensible to any WebVR enabled headset.

This project serves to address that need. Transcend was built by [Joey Darbyshire](https://github.com/Jmikeydarby), [Sean McBride](https://github.com/spmcbride1201), [Yoo-Nah Park](https://github.com/parky22), and [Beth Qiang](https://github.com/bethqiang) as their Capstone Project during their Senior Phase at [Fullstack Academy](https://www.fullstackacademy.com/).

## Live Demo

A playable online build of Transcend can be found [here](https://transcend.herokuapp.com/).

## Architecture

Transcend is built on [Node.js](https://nodejs.org/en/) using [Socket.io](http://socket.io/) for event-based client-server interaction, [WebRTC](https://webrtc.org/) for real-time audio communication, [A-Frame](https://aframe.io/) for 3D graphics and scene rendering and WebVR capabilities, [React](https://facebook.github.io/react/) as a view layer, and [Redux](http://redux.js.org/) with [Immutable.js](https://facebook.github.io/immutable-js/) for immutable state management on both the client and server.

## How to Play

Transcend supports keyboard & mouse controls on Chrome 56 or higher on a PC or Mac.

Google Daydream headset & controller integration coming soon.

### Keyboard and Mouse Controls

#### Camera Movement

* Lock Mouse: Click the 3D Scene
* Moving your mouse left, right, up, and down turns the camera left, right, up, and down respectively
* Unlock Mouse: Press ESC

#### Avatar Movement

* Walk Forward: W or up arrow
* Walk Backward: S or down arrow
* Sidestep Left: A or left arrow
* Sidestep Right: S or right arrow

#### Cursor

The ring in the center of your screen represents your cursor, which is your tool for interacting with the world. Certain elements in the world respond to your cursor hovering over a selectable object for one continuous second. An object is responding to your cursor when it glows a translucent blue, similar to an HTML hyperlink.

### Teleporters

Teleporters, the floating labeled orbs in all of the rooms, are the way you move between VR scenes. They cause you to leave one scene and enter another. Teleporters can be activated via cursor selection.

### Costumes in "The Gap"

In this VR universe, The Gap is where the fashion happens. Hover your cursor over a mannequin wearing an avatar you like for one second to switch your "skin". You should hear a voice confirming that you now are that avatar. Talk about Fast Fashion!

### UI Wheel

When you are in game, look down where your feet would be and you'll notice a microphone button. No, it's not for your [Reebok Pumps](https://en.wikipedia.org/wiki/Reebok_Pump). C'mon, you can't even jump in this world! The button mutes your in-game microphone. Stare at it for a second, and you'll see the button change between recording and muted states. Hope you can hold your sneeze that long!

## Installation

To install Transcend on your computer, you will need [Node.js with NPM](https://nodejs.org/en/download/) and [PostgreSQL](http://postgresguide.com/setup/install.html).

Once you have Node.js with NPM, install the game's dependencies with the following command:

```
npm install
```

When the dependencies have been installed, open PostgreSQL and create a database with the following command:

```
CREATE DATABASE transcend;
```

Then start the server with the following command:

```
npm start
```

The game will then be accessible at `http://localhost:1337`.

## Help

Create an [issue](https://github.com/TranscendVR/transcend/issues) or submit a pull request if you need help or find a bug. Contributions and ideas welcome!
