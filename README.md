[![CircleCI](https://circleci.com/gh/DanGrund/futureGrooves.svg?style=svg)](https://circleci.com/gh/DanGrund/futureGrooves)

# futureGrooves
WIP: A browser-based DAW built on Web Audio API

## Overview

Future Grooves is a browser-based digital audio sandbox that allows users to create sounds, bring them into a sequence, and then share that sequence with the world. Users can fork existing sounds & compositions from other users and edit them to their liking!

## Setup

clone down the repo
<code>npm -i</code>
then
<code>node server.js</code> to fire the whole thing up!

### Issues
___

Still a new project and very much a work in progress.
by 4/18 we will have the following features working

* user can log in, persistance with session storage
* user can create sounds
* user can create a sequence using all of the sounds in the DB
* user profile will feature their created Sounds & Compositions
* home page will feature the latest compositions and sounds from all users

#### wishlist

* seed audio samples to use as source nodes for web audio
* allow users to upload their own samples to use
* implement forking and version history for sounds & sequences
* figure out how to record the audio context itself
  * currently can only figure out how to record using user mic input
  * need to capture the internal signal, thus allowing a user to record a composition in sequencer and save/share the resulting mp3/ogg

  
