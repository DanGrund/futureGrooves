import React, { Component } from 'react'
import { Prompt } from 'react-router-dom'
import Select from './Select'
import Slider from './Slider'
import update from 'immutability-helper'
import Button from '../Button'
import './sound-maker.scss'

export class SoundMaker extends Component {
  constructor() {
    super()
    this.round = this.round.bind(this)
    this.state = {
      savedchanges: true,
      spec: {
        source: 'sine',
        volume: 0.5,
        pitch: 'A4',
        detune: 0,
        panning: 0,
        env: {
          attack: 1,
          decay: 1,
          sustain: 0,
          hold: 0,
          release: 0,
        },
        filter: {
          type: 'allpass',
          frequency: 600,
          q: 1,
          env: {
            frequency: 800,
            attack: 0.5,
          },
        },
        reverb: {
          wet: 1,
          impulse: 'http://localhost:3000/api/v1/impulses?id=BlockInside.wav',
        },
        delay: {
          delayTime: 0.5,
          wet: 0.25,
          feedback: 0.25,
        },
        vibrato: {
          shape: 'sine',
          magnitude: 3,
          speed: 4,
          attack: 0,
        },
        tremolo: {
          shape: 'sine',
          magnitude: 3,
          speed: 4,
          attack: 0,
        },
      },
    }
  }

  round(number, decimals) {
    return +(Math.round(number + 'e+' + decimals) + 'e-' + decimals)
  }

  previewSound = () => {
    this.props.previewSound(this.state.spec)
  }

  stopSound = () => {
    this.props.stopSound()
  }

  saveSound = () => {
    let soundName = prompt('What do you want to call your sound')
    this.setState(update(this.state, { spec: { soundName: { $set: soundName } } }), () => this.props.saveSound(JSON.stringify(this.state.spec), this.props.user.id))
    this.setState({ savedchanges: true })
  }

  loadSound = () => {
    let soundID = prompt('Enter the ID of the sound you want to edit')
    this.props.loadSound(soundID)
    this.setState({spec: this.props.sound.editsound})
  }

  updateValue = (key) => ({ target }) => {
    this.setState(update(this.state, { spec: { [key]: { $set: parseFloat(target.value) } } }), () => this.setState({ savedchanges: false }))
  }

  updatePitch = ({ target }) => {
    const newPitch = target.value.toUpperCase()
    this.setState(update(this.state, { spec: { pitch: { $set: newPitch } } }), () => this.setState({ savedchanges: false }))
  }

  updateSource = ({ target }) => {
    this.setState(update(this.state, { spec: { source: { $set: target.value } } }), () => this.setState({ savedchanges: false }))
  }

  updateADSR = (key) => ({ target }) => {
    this.setState(update(this.state, { spec: { env: { [key]: { $set: this.round(target.value, 4) } } } }), () => this.setState({ savedchanges: false }))
  }

  updateFilter = (key) => ({ target }) => {
    const newValue = key === 'type' ? target.value : this.round(target.value, 4)
    this.setState(update(this.state, { spec: { filter: { [key]: { $set: newValue } } } })), () => this.setState({ savedchanges: false })
  }

  updateFilterEnvelope = (key) => ({ target }) => {
    this.setState(update(this.state, { spec: { filter: { env: { [key]: { $set: this.round(target.value, 4) } } } } }), () => this.setState({ savedchanges: false }))
  }

  updateReverbWet = ({ target }) => {
    const newReverbWet = this.round(target.value, 4)
    this.setState(update(this.state, { spec: { reverb: { wet: { $set: newReverbWet } } } }), () => this.setState({ savedchanges: false }))
  }

  updateReverbImpulse = ({ target }) => {
    const newReverbImpulseURL = `http://localhost:3000/api/v1/impulses?id=${target.value}.wav`
    this.setState(update(this.state, { spec: { reverb: { impulse: { $set: newReverbImpulseURL } } } }), () => this.setState({ savedchanges: false }))
  }

  updateShape = (key) => ({ target }) => {
    this.setState(update(this.state, { spec: { [key]: { shape: { $set: target.value } } } }), () => this.setState({ savedchanges: false }))
  }

  updateVibrato = (key) => ({ target }) => {
    this.setState(update(this.state, { spec: { vibrato: { [key]: { $set: this.round(target.value, 4) } } } }), () => this.setState({ savedchanges: false }))
  }

  updateDelay = (key) => ({ target }) => {
    this.setState(update(this.state, { spec: { delay: { [key]: { $set: this.round(target.value, 4) } } } }), () => this.setState({ savedchanges: false }))
  }

  updateTremolo = (key) => ({ target }) => {
    this.setState(update(this.state, { spec: { tremolo: { [key]: { $set: this.round(target.value, 4) } } } }), () => this.setState({ savedchanges: false }))
  }

  render() {
    return (
      <div className='sound-maker-container'>
        <Prompt
          when={!this.state.savedchanges}
          message='You have unsaved changes that will be lost. Are you sure want to leave?'
        />
        <div className='btn-group'>
          {!this.state.savedchanges && <div className='msg'>You have unsaved changes.</div>}
          {this.state.spec.soundName && <h1>{this.state.spec.soundName}</h1>}
          <Button className='btn btn-play' text='Play' handleClick={this.previewSound} />
          <Button className='btn btn-stop' text='Stop' handleClick={this.stopSound} />
          {this.props.user.username &&
            <div>
           <Button text='Save Sound' handleClick={this.saveSound} />
          <Button text='Load Sound' handleClick={this.loadSound} />
        </div>}
        </div>

        <div className='basics'>
          <Select
            name='source-shape'
            className='select source-shape'
            options={['sine', 'sawtooth', 'square', 'triangle', 'noise']}
            updateSelection={this.updateSource}
          />
          <Slider
            label='Volume'
            className='slider volume'
            id='slider-volume'
            min={0}
            max={1}
            step={0.1}
            handleChange={this.updateValue('volume')}
            value={this.state.spec.volume}
          />
          <Slider
            label='Detune'
            className='slider detune'
            id='slider-detune'
            min={0}
            max={1200}
            step={1}
            handleChange={this.updateValue('detune')}
            value={this.state.spec.detune}
          />
          <Slider
            label='Panning'
            className='slider panning'
            id='slider-panning'
            min={-1}
            max={1}
            step={0.01}
            handleChange={this.updateValue('panning')}
            value={this.state.spec.panning}
          />
          <span> Pitch (A0-C8) </span>
          <input name='pitch' placeholder='pitch A0-C8' type='text' value={this.state.spec.pitch} onChange={this.updatePitch} />
          <br />
        </div>
        <div className='ADSR'>
          <h4> ADSR </h4>
          <Slider
            label='Attack'
            className='adsr-env-attack'
            id='slider-adsr-env-attack'
            min={0}
            max={1}
            step={0.01}
            handleChange={this.updateADSR('attack')}
            value={this.state.spec.env.attack}
          />
          <Slider
            label='Decay'
            className='adsr-env-decay'
            id='slider-adsr-env-decay'
            min={0}
            max={5}
            step={0.01}
            handleChange={this.updateADSR('decay')}
            value={this.state.spec.env.decay}
          />
          <Slider
            label='Sustain'
            className='adsr-env-sustain'
            id='slider-adsr-env-sustain'
            min={0}
            max={1}
            step={0.01}
            handleChange={this.updateADSR('sustain')}
            value={this.state.spec.env.sustain}
          />
          <Slider
            label='Hold'
            className='adsr-env-hold'
            id='slider-adsr-env-hold'
            min={0}
            max={10}
            step={0.01}
            handleChange={this.updateADSR('hold')}
            value={this.state.spec.env.hold}
          />
          <Slider
            label='Release'
            className='adsr-env-release'
            id='slider-adsr-env-release'
            min={0}
            max={10}
            step={0.01}
            handleChange={this.updateADSR('release')}
            value={this.state.spec.env.release}
          />
        </div>
        <div className='filter'>
          <h4> Filter </h4>
          <Select
            name='filter-type'
            options={['allpass', 'lowpass', 'highpass', 'bandpass', 'lowshelf', 'peaking', 'notch']}
            updateSelection={this.updateFilter('type')}
          />
          <Slider
            label='Frequency'
            className='filter-freq'
            id='slider-filter-freq'
            min={0}
            max={5000}
            step={1}
            handleChange={this.updateFilter('frequency')}
            value={this.state.spec.filter.frequency}
          />
          <Slider
            label='Q-factor'
            className='filter-q-factor'
            id='slider-filter-q-factor'
            min={0}
            max={10}
            step={0.01}
            handleChange={this.updateFilter('q')}
            value={this.state.spec.filter.q}
          />
          <Slider
            label='Envelope Frequency'
            className='filter-env-frequency'
            id='slider-filter-env-frequency'
            min={0}
            max={5000}
            step={1}
            handleChange={this.updateFilterEnvelope('frequency')}
            value={this.state.spec.filter.env.frequency}
          />
          <Slider
            label='Envelope Attack'
            className='filter-env-attack'
            id='slider-filter-env-attack'
            min={0}
            max={10}
            step={0.01}
            handleChange={this.updateFilterEnvelope('attack')}
            value={this.state.spec.filter.env.attack}
          />
        </div>
        <div className='reverb'>
          <h4> Reverb </h4>
          <Select
            name='select-reverb-impulse'
            className='select reverb-impulse'
            options={[
              'BlockInside',
              'BottleHall',
              'CementBlocks1',
              'CementBlocks2',
              'ChateaudeLogneOutside',
              'ConcLongEchoHall',
              'DeepSpace',
              'DerlonSanctuary',
              'DirectCabinetN1',
              'DirectCabinetN2',
              'DirectCabinetN3',
              'DirectCabinetN4',
              'FiveColumns',
              'FiveColunsLong',
              'French18thCenturySalon',
              'GoingHome',
              'Greek7EchoHall',
              'HighlyDampedLargeRoom',
              'InTheSilo',
              'InTheSiloRevised',
              'LargeBottleHall',
              'LargeLongEchoHall',
              'LargeWideEchoHall',
              'MasonicLodge',
              'Musikvereinsaal',
              'NarrowBumpySpace',
              'NiceDrumRoom',
              'OnaStar',
              'ParkingGarage',
              'Rays',
              'RightGlassTable',
              'RubyRoom',
              'ScalaMilanOperaHall',
              'SmallPrehistoricCave',
              'StNicolaesChurch',
              'TrigRoom',
              'VocalDuo',
            ]}
            updateSelection={this.updateReverbImpulse}
          />
          <Slider
            label='Wet'
            className='slider reverb-wet'
            id='slider-reverb-wet'
            min={0}
            max={1}
            step={0.01}
            handleChange={this.updateReverbWet}
            value={this.state.spec.reverb.wet}
          />
        </div>
          <div className='delay'>
            <h4> Delay </h4>
            <Slider
              label='Time'
              className='slider delay-time'
              id='slider-delay-time'
              min={0}
              max={2}
              step={0.01}
              handleChange={this.updateDelay('delayTime')}
              value={this.state.spec.delay.delayTime}
            />
            <Slider
              label='Wet'
              className='slider delay-wet'
              id='slider-delay-wet'
              min={0}
              max={1}
              step={0.01}
              handleChange={this.updateDelay('wet')}
              value={this.state.spec.delay.wet}
            />
            <Slider
              label='Feedback'
              className='slider delay-feedback'
              id='slider-delay-feedback'
              min={0}
              max={1}
              step={0.01}
              handleChange={this.updateDelay('feedback')}
              value={this.state.spec.delay.feedback}
            />
          </div>
          <div className='vibrato'>
            <h4> Vibrato </h4>
            <Select
              name='vibrato-shape'
              className='select vibrato-shape'
              options={['sine', 'sawtooth', 'square', 'triangle']}
              updateSelection={this.updateShape('vibrato')}
            />
            <Slider
              label='Magnitude'
              className='slider vibrato-magnitude'
              id='slider-vibrato-magnitude'
              min={1}
              max={10}
              step={0.1}
              handleChange={this.updateVibrato('magnitude')}
              value={this.state.spec.vibrato.magnitude}
            />
            <Slider
              label='Speed'
              className='slider vibrato-speed'
              id='slider-vibrato-speed'
              min={0}
              max={10}
              step={0.1}
              handleChange={this.updateVibrato('speed')}
              value={this.state.spec.vibrato.speed}
            />
            <Slider
              label='Attack'
              className='slider vibrato-attack'
              id='slider-vibrato-attack'
              min={0}
              max={10}
              step={0.1}
              handleChange={this.updateVibrato('attack')}
              value={this.state.spec.vibrato.attack}
            />
          </div>
          <div className='tremolo'>
            <h4> Tremolo </h4>
            <Select
              name='tremolo-shape'
              className='select tremolo-shape'
              options={['sine', 'sawtooth', 'square', 'triangle']}
              updateSelection={this.updateShape('tremolo')}
            />
            <Slider
              label='Magnitude'
              className='slider tremolo-magnitude'
              id='slider-tremolo-magnitude'
              min={1}
              max={10}
              step={0.1}
              handleChange={this.updateTremolo('magnitude')}
              value={this.state.spec.tremolo.magnitude}
            />
            <Slider
              label='Speed'
              className='slider tremolo-speed'
              id='slider-tremolo-speed'
              min={0}
              max={10}
              step={0.1}
              handleChange={this.updateTremolo('speed')}
              value={this.state.spec.tremolo.speed}
            />
            <Slider
              label='Attack'
              className='slider tremolo-attack'
              id='slider-tremolo-attack'
              min={0}
              max={10}
              step={0.1}
              handleChange={this.updateTremolo('attack')}
              value={this.state.spec.tremolo.attack}
            />
        </div>
      </div>
    )
  }
}

export default SoundMaker
