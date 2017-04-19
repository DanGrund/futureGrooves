import React, { Component } from 'react'
import { Link } from 'react-router'
import TrackRack from './SequencerComponents/TrackRack'
import Wad from 'web-audio-daw'
import update from 'immutability-helper'
import './sequencer-style'
import Slider from '../SoundMaker/Slider'
import SoundMakerContainer from '../../containers/SoundMakerContainer'
import SequencerContainer from '../../containers/SequencerContainer'
import UserContainer from '../../containers/UserContainer'
import InlineEdit from 'react-edit-inline'

export class Sequencer extends Component {
  constructor() {
    super();
    this.state = {
      playPause: false,
      currentStep: 0,
      newSound: '',
      spec: {
        tempo: 160,
        trackRacks: {
          snare:{
            steps:[{play:true, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:true, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:true, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:true, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:false, pitch:''}],
            mute: false,
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
            mute: false,
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
  }

  componentDidMount() {
    const { selectedComposition } = this.props.userData
    if (selectedComposition) {
      this.setState({ spec: JSON.parse(selectedComposition) })
    }
  }

  componentWillMount() {
    if(this.props.userData.token) {
      this.fetchUserData()
    }
  }

  componentWillUnmount() {
    this.loop.stop()
    this.props.setSelectedComposition(null, null)
    // this.props.editSound(null, null)
  }

  fetchUserData = () => {
    this.props.fetchUserData(this.props.user.id, this.props.user.token)
  }

  playPause() {
    this.setState({ playPause: !this.state.playPause })
    if (this.loop.isPlaying()) {
      this.loop.stop()
    } else {
      this.loop.start()
    }
  }

  loop = (() => {
    let timer
    let isPlaying = false

    return {
      isPlaying: () => {
        return isPlaying
      },
      start: () => {
        isPlaying = true
        return this.loop.play()
      },
      play: () => {
        if (isPlaying) {
          this.playStep()
          timer = setTimeout(this.loop.play, this.state.spec.tempo)
          return timer
        }
      },
      stop: () => {
        isPlaying = false
        return clearTimeout(timer)
      },
    }
  })()


  playStep() {
    Object.keys(this.state.spec.trackRacks).forEach((key) => {
      if (this.state.spec.trackRacks[key].steps[this.state.currentStep].play && (!this.state.spec.trackRacks[key].mute)) {
        let wad = new Wad(this.state.spec.trackRacks[key].sound)
        let pitch = (this.state.spec.trackRacks[key].steps[this.state.currentStep].pitch !== '') ? this.state.spec.trackRacks[key].steps[this.state.currentStep].pitch : this.state.spec.trackRacks[key].sound.pitch
        wad.play({ pitch: pitch })
      }
    })
    if (this.state.currentStep < 15) {
      this.setState({ currentStep: this.state.currentStep + 1 })
    } else {
      this.setState({ currentStep: 0 })
    }
  }

  toggleStep(key, index) {
    let newRack = this.state.spec.trackRacks
    newRack[key].steps[index].play = !newRack[key].steps[index].play
    this.setState({ trackRacks: newRack })
  }

  addTrack(newSound) {
    const soundFromDB = this.props.user.sounds.find((sound)=>{
      const soundValue = JSON.parse(sound.attributes);
      if(soundValue.soundName === newSound) {
        return true
      }
    })

    const soundAttributes = JSON.parse(soundFromDB.attributes)
    let soundObject = {steps:[{play:false, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:false, pitch:''},{play:false, pitch:''}],
    mute: false}
    Object.assign(soundObject, {sound: soundAttributes})
    let newRack = this.state.spec.trackRacks
    Object.assign(newRack, {[soundAttributes.soundName]:soundObject})
    this.setState({ trackRacks: newRack })
  }

  removeTrack(trackName) {
    delete this.state.spec.trackRacks[trackName]
    this.forceUpdate()
  }

  changeVolume(key, newVolume) {
    let newRack = this.state.spec.trackRacks
    newRack[key].sound.volume = parseFloat(newVolume)
    this.setState({ trackRacks: newRack })
  }

  changeFilter(key, newFreq) {
    let newRack = this.state.spec.trackRacks
    newRack[key].sound.filter.frequency = parseFloat(newFreq)
    this.setState({ trackRacks: newRack })
  }

  changePitch(key, index, newPitch) {
    let newRack = this.state.spec.trackRacks
    newRack[key].steps[index].pitch = newPitch.toUpperCase()
    this.setState({ trackRacks: newRack })
  }

  muteTrack(key) {
    let newRack = this.state.spec.trackRacks;
    newRack[key].mute = !newRack[key].mute;
    this.setState({ trackRacks: newRack})
  }

  soloTrack(key) {
    let newRack = this.state.spec.trackRacks;
    Object.keys(newRack).forEach((rack)=> {
      if (rack !== key) {
        newRack[rack].mute = !newRack[rack].mute
      }
    })
  }

  updateTempo(newTempo) {
    this.setState(update(this.state, { spec: { tempo: { $set: newTempo } } }))
  }

  saveComp = () => {
    const {username, selectedComposition, composition_id} = this.props.userData
    if(composition_id) {
      if(selectedComposition){
        this.fetchType('PATCH', composition_id)
        return
      }
    } else {
      alert('Please Sign In')
    }
  }

  fetchType(method, composition_id = null) {
    let compositionName = this.state.compositionName || prompt('What do you want to call your song?')
    let fType = this.setState(update(this.state, { spec: { compositionName: { $set: compositionName } } }), () => this.props.saveComp(JSON.stringify(this.state.spec), this.props.userData.id, method, composition_id))
    this.setState({ savedchanges: true, newComp: true })
  }

  saveAsNewComposition = () => {
    const {username, selectedComposition} = this.props.userData
      return username ? this.fetchType('POST') : alert('Please Sign In')
  }

  render() {

    const togglePlayPause = () => {
      return this.state.playPause ? 'Pause' : 'Play'
    }

    const showUpdateComp = () => {
      const { selectedComposition } = this.props.userData
      const { newComp } = this.state
      if (selectedComposition || newComp) {
        return <button className='btn btn-save' onClick={this.saveComp}>save</button>
      }
    }

    const loadSoundDropdown = () => {
      if(this.props.userData.token) {
        return this.props.user.sounds.map((sound, i) => {
          const soundValue = JSON.parse(sound.attributes);
          return (
            <option value={soundValue.soundName} key={i}>
              {soundValue.soundName}
            </option>
          )
        })
      }
    }

    const toggleCompositionName = () => {
      return this.state.spec.compositionName
      ?
      <div className='composition-name'>
        <InlineEdit text={this.state.spec.compositionName}
                    paramName='editedName'
                    change={(e) => this.setState({ compositionName: e.editedName })} />
      </div>
      :
      <div className='composition-name'>
        <input placeholder='Name This Composition'
               onChange={(e) => {this.setState({ compositionName: e.target.value })}}/>
      </div>
    }

    return(
      <div id='composition-maker'>
        <div id='play-controls'>
          {!this.state.playPause && <button className='btn-play' onClick={this.playPause.bind(this)}></button>}
          {this.state.playPause && <button className='btn btn-stop' onClick={this.playPause.bind(this)}></button>}
          tempo
          <input
            value={this.state.spec.tempo}
            id={'tempo-slider'}
            type='range'
            onChange={(e)=>this.updateTempo(e.target.value)}
            min={100}
            max={400}
            step={1}
          />
          <span>≈{Math.round((60/this.state.spec.tempo)*240)}BPM</span>
          {toggleCompositionName()}
          {showUpdateComp()}
          <button className='btn btn-save' onClick={this.saveAsNewComposition}>save as</button>
        </div>

        <div id='drum-racks'>
          {Object.keys(this.state.spec.trackRacks).map((trackRack, i) =>
            <TrackRack key={i}
                       name={trackRack}
                       source={this.state.spec.trackRacks[trackRack].sound.source}
                       volume={this.state.spec.trackRacks[trackRack].sound.volume}
                       filter={this.state.spec.trackRacks[trackRack].sound.filter.frequency}
                       steps={this.state.spec.trackRacks[trackRack].steps}
                       currentStep={this.state.currentStep}
                       toggleStep={this.toggleStep.bind(this)}
                       changeVolume={this.changeVolume.bind(this)}
                       changeFilter={this.changeFilter.bind(this)}
                       changePitch={this.changePitch.bind(this)}
                       muteTrack={this.muteTrack.bind(this)}
                       soloTrack={this.soloTrack.bind(this)}
                       removeTrack={this.removeTrack.bind(this)}
            />
          )}
        </div>

        <div id='new-sounds'>
          {this.props.user.sounds && !this.props.user.sounds.success && <form>
            <label className='select'>
              <select defaultValue='add track' onChange={(e) => this.setState({ newSound: e.target.value })}>
                <option value='add track' disabled>add track</option>
                {loadSoundDropdown()}
              </select>
            </label>
            <button className='btn btn-add' onClick={(e) => {e.preventDefault(); this.addTrack(this.state.newSound)}}>add track</button>
          </form>}
        </div>
      </div>
    )
  }
}

export default UserContainer(SequencerContainer(Sequencer))
