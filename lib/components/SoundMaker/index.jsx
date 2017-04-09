import React, { Component } from 'react'
import { Link } from 'react-router'
import Select from './Select'
import Slider from './Slider'
import Button from '../Button'
// import Wad from 'web-audio-daw'
// import Tuna from 'tunajs'
// window.Tuna = Tuna

import update from 'immutability-helper'

export class SoundMaker extends Component {
  constructor() {
    super()
    this.state = {
      spec: {
        source: 'sine',
        volume: .5,
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
            frequency: '',
            attack: '',
          },
        },
        // reverb: {
        //   wet: 0,
        // },
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
        tuna: {
          Chorus: {
            intensity: 0.3,
            rate: 4,
            stereoPhase: 0,
            bypass: 0,
          },
        },
      },
      oscillators: [],
    }
  }

  previewSound() {
    this.props.previewSound(this.state.spec)
  }

  stopSound() {
    this.props.stopSound()
  }

  stopAllSounds() {
    this.props.stopAllSounds()
  }

  updateVolume(e) {
    this.setState(update(this.state, { spec: { volume: { $set: e.target.value } } }))
  }

  updatePitch(e) {
    const newPitch = e.target.value.toUpperCase()
    this.setState(update(this.state, { spec: { pitch: { $set: newPitch } } }))
  }

  updateSource(e) {
    this.setState(update(this.state, { spec: { source: { $set: e.target.value } } }))
  }

  updateDetune(e) {
    this.setState(update(this.state, { spec: { detune: { $set: e.target.value } } }))
  }

  updatePanning(e) {
    const newPanning = Math.fround(e.target.value)
    this.setState(update(this.state, { spec: { panning: { $set: newPanning } } }))
  }

  updateAttack(e) {
    const newAttack = Math.fround(e.target.value)
    this.setState(update(this.state, { spec: { env: { attack: { $set: newAttack } } } }))
  }

  updateDecay(e) {
    const newDecay = Math.fround(e.target.value)
    this.setState(update(this.state, { spec: { env: { decay: { $set: newDecay } } } }))
  }

  updateSustain(e) {
    const newSustain = Math.fround(e.target.value)
    this.setState(update(this.state, { spec: { env: { sustain: { $set: newSustain } } } }))
  }

  updateHold(e) {
    const newHold = Math.fround(e.target.value)
    this.setState(update(this.state, { spec: { env: { hold: { $set: newHold } } } }))
  }

  updateRelease(e) {
    const newRelease = Math.fround(e.target.value)
    this.setState(update(this.state, { spec: { env: { release: { $set: newRelease } } } }))
  }

  updateFilterType(e) {
    this.setState(update(this.state, { spec: { filter: { type: { $set: e.target.value } } } }))
  }

  updateFilterFrequency(e) {
    const newFilterFrequency = Math.fround(e.target.value)
    this.setState(update(this.state, { spec: { filter: { frequency: { $set: newFilterFrequency } } } }))
  }

  updateFilterQFactor(e) {
    const newFilterQFactor = Math.fround(e.target.value)
    this.setState(update(this.state, { spec: { filter: { q: { $set: newFilterQFactor } } } }))
  }

  updateFilterEnvelopeFrequency(e) {
    const newFilterEnvelopeFrequency = Math.fround(e.target.value)
    this.setState(update(this.state, { spec: { filter: { env: { frequency: { $set: newFilterEnvelopeFrequency } } } } }))
  }

  updateFilterEnvelopeAttack(e) {
    const newFilterEnvelopeAttack = Math.fround(e.target.value)
    this.setState(update(this.state, { spec: { filter: { env: { attack: { $set: newFilterEnvelopeAttack } } } } }))
  }

  updateReverbWet(e) {
    const newReverbWet = Math.fround(e.target.value)
    this.setState(update(this.state, { spec: { reverb: { wet: { $set: newReverbWet } } } }))
  }

  updateDelayTime(e) {
    const newDelayTime = Math.fround(e.target.value)
    this.setState(update(this.state, { spec: { delay: { delayTime: { $set: newDelayTime } } } }))
  }

  updateDelayWet(e) {
    const newDelayWet = Math.fround(e.target.value)
    this.setState(update(this.state, { spec: { delay: { wet: { $set: newDelayWet } } } }))
  }

  updateDelayFeedback(e) {
    const newDelayFeedback = Math.fround(e.target.value)
    this.setState(update(this.state, { spec: { delay: { feedback: { $set: newDelayFeedback } } } }))
  }


  updateVibratoShape(e) {
    this.setState(update(this.state, { spec: { vibrato: { shape: { $set: e.target.value } } } }))
  }

  updateTemoloShape(e) {
    this.setState(update(this.state, { spec: { tremolo: { shape: { $set: e.target.value } } } }))
  }

  updateVibratoMagnitude(e) {
    const newVibratoMagnitude = Math.fround(e.target.value)
    this.setState(update(this.state, { spec: { vibrato: { magnitude: { $set: newVibratoMagnitude } } } }))
  }

  updateTremoloMagnitude(e) {
    const newTemoloMagnitude = Math.fround(e.target.value)
    this.setState(update(this.state, { spec: { tremolo: { magnitude: { $set: newTemoloMagnitude } } } }))
  }

  updateVibratoSpeed(e) {
    const newVibratoSpeed = Math.fround(e.target.value)
    this.setState(update(this.state, { spec: { vibrato: { speed: { $set: newVibratoSpeed } } } }))
  }

  updateTremoloSpeed(e) {
    const newTremoloSpeed = Math.fround(e.target.value)
    this.setState(update(this.state, { spec: { tremolo: { speed: { $set: newTremoloSpeed } } } }))
  }

  updateVibratoAttack(e) {
    const newVibratoAttack = Math.fround(e.target.value)
    this.setState(update(this.state, { spec: { vibrato: { attack: { $set: newVibratoAttack } } } }))
  }

  updateTremoloAttack(e) {
    const newTremoloAttack = Math.fround(e.target.value)
    this.setState(update(this.state, { spec: { tremolo: { attack: { $set: newTremoloAttack } } } }))
  }

  render() {
    return (
      <div>
        <div className='btn-group'>
          <Button text='Play' handleClick={() => this.previewSound()} />
          <Button text='Stop' handleClick={() => this.stopSound()} />
          <Button text='Stop All' handleClick={() => this.stopAllSounds()} />
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
            handleChange={(e) => this.updateVolume(e)}
            value={this.state.spec.volume}
          />
          <Slider
            label='Detune'
            className='slider detune'
            id='slider-detune'
            min={0}
            max={1200}
            step={1}
            handleChange={(e) => this.updateDetune(e)}
            value={this.state.spec.detune}
          />
          <Slider
            label='Panning'
            className='slider panning'
            id='slider-panning'
            min={-1}
            max={1}
            step={0.01}
            handleChange={(e) => this.updatePanning(e)}
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
          handleChange={(e) => this.updateAttack(e)}
          value={this.state.spec.env.attack}
        />
        <Slider
          label='Decay'
          className='slider adsr-env-decay'
          id='slider-adsr-env-decay'
          min={0}
          max={5}
          step={0.01}
          handleChange={(e) => this.updateDecay(e)}
          value={this.state.spec.env.decay}
        />
        <Slider
          label='Sustain'
          className='slider adsr-env-sustain'
          id='slider-adsr-env-sustain'
          min={0}
          max={1}
          step={0.01}
          handleChange={(e) => this.updateSustain(e)}
          value={this.state.spec.env.sustain}
        />
        <Slider
          label='Hold'
          className='slider slider adsr-env-hold'
          id='slider-adsr-env-hold'
          min={0}
          max={10}
          step={0.01}
          handleChange={(e) => this.updateHold(e)}
          value={this.state.spec.env.hold}
        />
         <Slider
          label='Release'
          className='slider adsr-env-release'
          id='slider-adsr-env-release'
          min={0}
          max={10}
          step={0.01}
          handleChange={(e) => this.updateRelease(e)}
          value={this.state.spec.env.release}
        />
      </div>

      <div className='filter'>
        <h4> Filter </h4>
        <Select
          name='filter-type'
          className='select filter-type'
          options={['allpass', 'lowpass', 'highpass', 'bandpass', 'lowshelf', 'peaking', 'notch']}
          updateSelection={e => this.updateFilterType(e)}
        />
        <Slider
          label='Frequency'
          className='slider filter-freq'
          id='slider-filter-freq'
          min={0}
          max={5000}
          step={1}
          handleChange={(e) => this.updateFilterFrequency(e)}
          value={this.state.spec.filter.frequency}
        />
         <Slider
          label='Q-factor'
          className='slider filter-q-factor'
          id='slider-filter-q-factor'
          min={0}
          max={10}
          step={0.01}
          handleChange={(e) => this.updateFilterQFactor(e)}
          value={this.state.spec.filter.q}
        />
         <Slider
          label='Filter Envelope Frequency'
          className='slider filter-env-frequency'
          id='slider-filter-env-frequency'
          min={0}
          max={5000}
          step={1}
          handleChange={(e) => this.updateFilterEnvelopeFrequency(e)}
          value={this.state.spec.filter.env.frequency}
        />
         <Slider
          label='Filter Envelope Attack'
          className='slider filter-env-attack'
          id='slider-filter-env-attack'
          min={0}
          max={10}
          step={0.01}
          handleChange={(e) => this.updateFilterEnvelopeAttack(e)}
          value={this.state.spec.filter.env.attack}
        />
      </div>
       <div className='reverb'>
        <h4> Reverb </h4>
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
             handleChange={(e) => this.updateDelayTime(e)}
             value={this.state.spec.delay.delayTime}
           />
           <Slider
             label='Delay Wet'
             className='slider delay-wet'
             id='slider-delay-wet'
             min={0}
             max={1}
             step={0.01}
             handleChange={(e) => this.updateDelayWet(e)}
             value={this.state.spec.delay.wet}
           />
           <Slider
             label='Delay Feedback'
             className='slider delay-feedback'
             id='slider-delay-feedback'
             min={0}
             max={1}
             step={0.01}
             handleChange={(e) => this.updateDelayFeedback(e)}
             value={this.state.spec.delay.feedback}
           />
         </div>
         <div className='vibrato'>
           <h4> Vibrato </h4>
           <Select
             name='vibrato-shape'
             className='select vibrato-shape'
             options={['sine', 'sawtooth', 'square', 'triangle']}
             updateSelection={e => this.updateVibratoShape(e)}
           />
           <Slider
             label='Vibrato Magnitude'
             className='slider vibrato-magnitude'
             id='slider-vibrato-magnitude'
             min={1}
             max={10}
             step={0.1}
             handleChange={(e) => this.updateVibratoMagnitude(e)}
             value={this.state.spec.vibrato.magnitude}
           />
           <Slider
             label='Vibrato Speed'
             className='slider vibrato-speed'
             id='slider-vibrato-speed'
             min={0}
             max={10}
             step={0.1}
             handleChange={(e) => this.updateVibratoSpeed(e)}
             value={this.state.spec.vibrato.speed}
           />
           <Slider
             label='Vibrato Attack'
             className='slider vibrato-attack'
             id='slider-vibrato-attack'
             min={0}
             max={10}
             step={0.1}
             handleChange={(e) => this.updateVibratoAttack(e)}
             value={this.state.spec.vibrato.attack}
           />
         </div>
         <div className='tremolo'>
           <h4> Tremolo </h4>
           <Select
             name='tremolo-shape'
             className='select tremolo-shape'
             options={['sine', 'sawtooth', 'square', 'triangle']}
             updateSelection={e => this.updateTremoloShape(e)}
           />
           <Slider
             label='Tremolo Magnitude'
             className='slider tremolo-magnitude'
             id='slider-tremolo-magnitude'
             min={1}
             max={10}
             step={0.1}
             handleChange={(e) => this.updateTremoloMagnitude(e)}
             value={this.state.spec.tremolo.magnitude}
           />
           <Slider
             label='Tremolo Speed'
             className='slider tremolo-speed'
             id='slider-tremolo-speed'
             min={0}
             max={10}
             step={0.1}
             handleChange={(e) => this.updateTremoloSpeed(e)}
             value={this.state.spec.tremolo.speed}
           />
           <Slider
             label='Tremolo Attack'
             className='slider tremolo-attack'
             id='slider-tremolo-attack'
             min={0}
             max={10}
             step={0.1}
             handleChange={(e) => this.updateTremoloAttack(e)}
             value={this.state.spec.tremolo.attack}
           />
         </div>
       </div>
      </div>
    )
  }
}

export default SoundMaker
