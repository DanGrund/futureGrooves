import React, { Component } from 'react'
import { Link } from 'react-router'
import Select from './Select'
import Slider from './Slider'
import update from 'immutability-helper'
import Button from '../Button'
// import Toggle from 'react-toggle'


export class SoundMaker extends Component {
  constructor() {
    super()
    this.round = this.round.bind(this)
    this.state = {
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

  stopAllSounds = () => {
    this.props.stopAllSounds()
  }

  updateValue = (key) => ({ target }) => {
    this.setState(update(this.state, { spec: { [key]: { $set: parseFloat(target.value) } } }))
  }

  updatePitch = ({ target }) => {
    const newPitch = target.value.toUpperCase()
    this.setState(update(this.state, { spec: { pitch: { $set: newPitch } } }))
  }

  updateSource = ({ target }) => {
    this.setState(update(this.state, { spec: { source: { $set: target.value } } }))
  }

  updateADSR = (key) => ({ target }) => {
    this.setState(update(this.state, { spec: { env: { [key]: { $set: this.round(target.value, 4) } } } }))
  }

  updateFilter = (key) => ({ target }) => {
    const newValue = key === 'type' ? target.value : this.round(target.value, 4)
    this.setState(update(this.state, { spec: { filter: { [key]: { $set: newValue } } } }))
  }

  updateFilterEnvelope = (key) => ({ target }) => {
    this.setState(update(this.state, { spec: { filter: { env: { [key]: { $set: this.round(target.value, 4) } } } } }))
  }

  updateReverbWet = ({ target }) => {
    const newReverbWet = this.round(target.value, 4)
    this.setState(update(this.state, { spec: { reverb: { wet: { $set: newReverbWet } } } }))
  }

  updateReverbImpulse = ({ target }) => {
    const newReverbImpulseURL = `http://localhost:3000/api/v1/impulses?id=${target.value}.wav`
    this.setState(update(this.state, { spec: { reverb: { impulse: { $set: newReverbImpulseURL } } } }))
  }

  updateShape = (key) => ({ target }) => {
    this.setState(update(this.state, { spec: { [key]: { shape: { $set: target.value } } } }))
  }

  updateVibrato = (key) => ({ target }) => {
    this.setState(update(this.state, { spec: { vibrato: { [key]: { $set: this.round(target.value, 4) } } } }))
  }

  updateDelay = (key) => ({ target }) => {
    this.setState(update(this.state, { spec: { delay: { [key]: { $set: this.round(target.value, 4) } } } }))
  }

  updateTremolo = (key) => ({ target }) => {
    this.setState(update(this.state, { spec: { tremolo: { [key]: { $set: this.round(target.value, 4) } } } }))
  }

  render() {
    return (
      <div>
        <div className='btn-group'>
          <Button text='Play' handleClick={this.previewSound} />
          <Button text='Stop' handleClick={this.stopSound} />
          <Button text='Stop All' handleClick={this.stopAllSounds} />
        </div>

        <div className='basics'>
          <Select
            name='source-shape'
            className='select source-shape'
            options={['sine', 'sawtooth', 'square', 'triangle']}
            updateSelection={e => this.updateSource(e)}
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
          <input name='pitch' placeholder='pitch A0-C8' type='text' value={this.state.spec.pitch} onChange={e => this.updatePitch(e)} />
          <br />
        </div>

        <div className='ADSR'>
          <h4> ADSR </h4>
          <Slider
            label='Attack'
            className='slider adsr-env-attack'
            id='slider-adsr-env-attack'
            min={0}
            max={1}
            step={0.01}
            handleChange={this.updateADSR('attack')}
            value={this.state.spec.env.attack}
          />
          <Slider
            label='Decay'
            className='slider adsr-env-decay'
            id='slider-adsr-env-decay'
            min={0}
            max={5}
            step={0.01}
            handleChange={this.updateADSR('decay')}
            value={this.state.spec.env.decay}
          />
          <Slider
            label='Sustain'
            className='slider adsr-env-sustain'
            id='slider-adsr-env-sustain'
            min={0}
            max={1}
            step={0.01}
            handleChange={this.updateADSR('sustain')}
            value={this.state.spec.env.sustain}
          />
          <Slider
            label='Hold'
            className='slider slider adsr-env-hold'
            id='slider-adsr-env-hold'
            min={0}
            max={10}
            step={0.01}
            handleChange={this.updateADSR('hold')}
            value={this.state.spec.env.hold}
          />
          <Slider
            label='Release'
            className='slider adsr-env-release'
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
            className='select filter-type'
            options={['allpass', 'lowpass', 'highpass', 'bandpass', 'lowshelf', 'peaking', 'notch']}
            updateSelection={this.updateFilter('type')}
          />
          <Slider
            label='Frequency'
            className='slider filter-freq'
            id='slider-filter-freq'
            min={0}
            max={5000}
            step={1}
            handleChange={this.updateFilter('frequency')}
            value={this.state.spec.filter.frequency}
          />
          <Slider
            label='Q-factor'
            className='slider filter-q-factor'
            id='slider-filter-q-factor'
            min={0}
            max={10}
            step={0.01}
            handleChange={this.updateFilter('q')}
            value={this.state.spec.filter.q}
          />
          <Slider
            label='Filter Envelope Frequency'
            className='slider filter-env-frequency'
            id='slider-filter-env-frequency'
            min={0}
            max={5000}
            step={1}
            handleChange={this.updateFilterEnvelope('frequency')}
            value={this.state.spec.filter.env.frequency}
          />
          <Slider
            label='Filter Envelope Attack'
            className='slider filter-env-attack'
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
            label='Reverb Wet'
            className='slider reverb-wet'
            id='slider-reverb-wet'
            min={0}
            max={1}
            step={0.01}
            handleChange={this.updateReverbWet}
            value={this.state.spec.reverb.wet}
          />
        </div>
        <div className='lfo-container'>
          <h2> LFOs </h2>
          <div className='delay'>
            <h4> Delay </h4>
            <Slider
              label='Delay Time'
              className='slider delay-time'
              id='slider-delay-time'
              min={0}
              max={2}
              step={0.01}
              handleChange={this.updateDelay('delayTime')}
              value={this.state.spec.delay.delayTime}
            />
            <Slider
              label='Delay Wet'
              className='slider delay-wet'
              id='slider-delay-wet'
              min={0}
              max={1}
              step={0.01}
              handleChange={this.updateDelay('wet')}
              value={this.state.spec.delay.wet}
            />
            <Slider
              label='Delay Feedback'
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
              label='Vibrato Magnitude'
              className='slider vibrato-magnitude'
              id='slider-vibrato-magnitude'
              min={1}
              max={10}
              step={0.1}
              handleChange={this.updateVibrato('magnitude')}
              value={this.state.spec.vibrato.magnitude}
            />
            <Slider
              label='Vibrato Speed'
              className='slider vibrato-speed'
              id='slider-vibrato-speed'
              min={0}
              max={10}
              step={0.1}
              handleChange={this.updateVibrato('speed')}
              value={this.state.spec.vibrato.speed}
            />
            <Slider
              label='Vibrato Attack'
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
              label='Tremolo Magnitude'
              className='slider tremolo-magnitude'
              id='slider-tremolo-magnitude'
              min={1}
              max={10}
              step={0.1}
              handleChange={this.updateTremolo('magnitude')}
              value={this.state.spec.tremolo.magnitude}
            />
            <Slider
              label='Tremolo Speed'
              className='slider tremolo-speed'
              id='slider-tremolo-speed'
              min={0}
              max={10}
              step={0.1}
              handleChange={this.updateTremolo('speed')}
              value={this.state.spec.tremolo.speed}
            />
            <Slider
              label='Tremolo Attack'
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
      </div>
    )
  }
}

export default SoundMaker
