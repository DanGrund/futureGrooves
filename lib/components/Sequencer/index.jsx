import React, { Component } from 'react';
import { Link } from 'react-router';
import TrackRack from './SequencerComponents/TrackRack'
import Wad from 'web-audio-daw'
import './sequencer-style'


export class Sequencer extends Component {
  constructor() {
    super();
    this.state = {
      playPause: false,
      currentStep: 0,
      tempo: 200,
      trackRacks: {
        snare:{
          steps:[true,false,false,false,true,false,false,false,true,false,false,false,true,false,false,false],
          sound:{
           source : 'noise',
            env : {
                attack : .001,
                decay : .12,
                sustain : .3,
                hold : .07,
                release : .02
            },
            filter : {
                type : 'bandpass',
                frequency : 300,
                q : .180
            }
          }
        }
      },
    }
  }

  componentDidMount() {
    this.playLoop()
  }

  playPause() {
    this.setState({ playPause: !this.state.playPause })
  }

  playLoop() {
    this.playStep()
    setTimeout(this.playLoop.bind(this),this.state.tempo)
  }

  playStep() {
    if (this.state.playPause) {
      Object.keys(this.state.trackRacks).forEach((key)=>{
        if(this.state.trackRacks[key].steps[this.state.currentStep]){
          let wad = new Wad (this.state.trackRacks[key].sound)
          wad.play()
        }
      })
      if (this.state.currentStep < 15) {
        this.setState({currentStep: this.state.currentStep + 1})
      } else {
        this.setState({currentStep: 0})
      }
    }
  }

  toggleStep(key, index) {
    let newRack = this.state.trackRacks
    newRack[key].steps[index] = !newRack[key].steps[index]
    this.setState({ trackRacks: newRack })
  }

  render() {
    return(
      <div id='composition-maker'>
        <div id='play-controls'>
          <h1>futureGrooves</h1>
          <button id='play-button' onClick={()=>this.playPause()} >
            play/pause
          </button>
        </div>

        <div id='drum-racks'>
          {Object.keys(this.state.trackRacks).map((trackRack, i) =>
            <TrackRack key={i}
                       name={trackRack}
                       steps={this.state.trackRacks[trackRack].steps}
                       currentStep={this.state.currentStep}
                       toggleStep={this.toggleStep.bind(this)}
            />
          )}
        </div>

      </div>
    )
  }
}

export default Sequencer;
