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
          steps:[{play:true, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:true, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:true, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:true, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:false, pitch:''}],
          sound:{
           source : 'noise',
           volume: .5,
           pitch: 'A4',
            env : {
                attack : .001,
                decay : .12,
                sustain : .3,
                hold : .07,
                release : .02
            },
            filter : {
                type : 'highpass',
                frequency : 300,
                q : .180
            }
          }
        },
        snap:{
          steps:[{play:true, pitch:"A5"},{play:true, pitch:'B5'},{play:true, pitch:'C5'},{play:true, pitch:'D5'},{play:true, pitch:'E5'},{play:true, pitch:'D5'},{play:true, pitch:'C5'},{play:true, pitch:'B5'},{play:true, pitch:''},{play:true, pitch:''},{play:true, pitch:''},{play:true, pitch:''},{play:true, pitch:''},{play:true, pitch:''},{play:true, pitch:''},{play:true, pitch:''}],
          sound:{
           source : 'sine',
           volume: .5,
           pitch: 'A4',
            env : {
                attack : .001,
                decay : .12,
                sustain : .3,
                hold : .07,
                release : .02
            },
            filter : {
                type : 'highpass',
                frequency : 300,
                q : .180
            }
          }
        },
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
        if(this.state.trackRacks[key].steps[this.state.currentStep].play){
          let wad = new Wad (this.state.trackRacks[key].sound)
          let pitch = (this.state.trackRacks[key].steps[this.state.currentStep].pitch !== '') ? this.state.trackRacks[key].steps[this.state.currentStep].pitch : this.state.trackRacks[key].sound.pitch
          wad.play({pitch: pitch})
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
    newRack[key].steps[index].play = !newRack[key].steps[index].play
    this.setState({ trackRacks: newRack })
  }

  changeVolume(key, newVolume) {
    let newRack = this.state.trackRacks
    newRack[key].sound.volume = parseFloat(newVolume)
    this.setState({ trackRacks: newRack })
  }

  changeFilter(key, newFreq) {
    let newRack = this.state.trackRacks
    newRack[key].sound.filter.frequency = parseFloat(newFreq)
    this.setState({ trackRacks: newRack })
  }

  changePitch(key, index, newPitch) {
    let newRack = this.state.trackRacks
    newRack[key].steps[index].pitch = newPitch.toUpperCase()
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
                       volume={this.state.trackRacks[trackRack].sound.volume}
                       filter={this.state.trackRacks[trackRack].sound.filter.frequency}
                       steps={this.state.trackRacks[trackRack].steps}
                       currentStep={this.state.currentStep}
                       toggleStep={this.toggleStep.bind(this)}
                       changeVolume={this.changeVolume.bind(this)}
                       changeFilter={this.changeFilter.bind(this)}
                       changePitch={this.changePitch.bind(this)}
            />
          )}
        </div>

      </div>
    )
  }
}

export default Sequencer;
