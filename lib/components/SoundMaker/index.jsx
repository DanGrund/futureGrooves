import React, { Component } from 'react'
import { Link } from 'react-router'
import Select from './Select'
import Slider from './Slider'
import Button from '../Button'
import Wad from 'web-audio-daw'

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
          attack: 0.5,
          decay: 0.5,
          sustain: 1.0,
          hold: 2,
          release: 1,
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
        //   wet: 1,
        // },
        delay: {
          delayTime: .5,
          wet: .25,
          feedback: .25,
        },
        vibrato: {
          shape: 'sine',
          magnitude: 3,
          speed: 4,
          attack: 0,
        }
      },
      oscillator: null,
    }
  }

  playSound() {
    console.log(this.state.spec)
    this.setState({ oscillator: new Wad(this.state.spec) }, () => this.state.oscillator.play({ label: 'note' }))
  }
  
  stopSound() {
    this.state.oscillator.stop('note')
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


  render() {
    return (
      <div>
        <div className='btn-group'>
          <Button text='Play' handleClick={() => this.playSound()} />
          <Button text='Stop' handleClick={() => this.stopSound()} />
        </div>

        <div className='basics'>
          <Select
            options={['sine', 'sawtooth', 'square', 'triangle']}
            updateSelection={e => this.updateSource(e)}
          />
          <Slider
            label='Volume'
            className='slider'
            id='slider-volume'
            min={0}
            max={1}
            step={0.1}
            handleChange={(e) => this.updateVolume(e)}
            value={this.state.spec.volume}
          />
          <Slider
            label='Detune'
            className='detune'
            id='slider-detune'
            min={0}
            max={1200}
            step={1}
            handleChange={(e) => this.updateDetune(e)}
            value={this.state.spec.detune}
          />
          <Slider
            label='Panning'
            className='panning'
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
          className='adsr-env-attack' 
          id='slider-adsr-env-attack'
          min={0}
          max={1}
          step={0.01}
          handleChange={(e) => this.updateAttack(e)} 
          value={this.state.spec.env.attack}
        />
        <Slider
          label='Decay'
          className='adsr-env-decay' 
          id='slider-adsr-env-decay'
          min={0}
          max={5}
          step={0.01}
          handleChange={(e) => this.updateDecay(e)} 
          value={this.state.spec.env.decay}
        />
        <Slider
          label='Sustain'
          className='adsr-env-sustain' 
          id='slider-adsr-env-sustain'
          min={0}
          max={1}
          step={0.01}
          handleChange={(e) => this.updateSustain(e)} 
          value={this.state.spec.env.sustain}
        />
        <Slider
          label='Hold'
          className='adsr-env-hold' 
          id='slider-adsr-env-hold'
          min={0}
          max={10}
          step={0.01}
          handleChange={(e) => this.updateHold(e)} 
          value={this.state.spec.env.hold}
        />
         <Slider
          label='Release'
          className='adsr-env-release' 
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
          options={['allpass', 'lowpass', 'highpass', 'bandpass', 'lowshelf', 'peaking', 'notch']} 
          updateSelection={e => this.updateFilterType(e)}
        />
        <Slider
          label='Frequency'
          className='filter-freq' 
          id='slider-filter-freq'
          min={0}
          max={5000}
          step={1}
          handleChange={(e) => this.updateFilterFrequency(e)} 
          value={this.state.spec.filter.frequency}
        />
         <Slider
          label='Q-factor'
          className='filter-q-factor' 
          id='slider-filter-q-factor'
          min={0}
          max={10}
          step={0.01}
          handleChange={(e) => this.updateFilterQFactor(e)} 
          value={this.state.spec.filter.q}
        />
         <Slider
          label='Filter Envelope Frequency'
          className='filter-env-frequency' 
          id='slider-filter-env-frequency'
          min={0}
          max={5000}
          step={1}
          handleChange={(e) => this.updateFilterEnvelopeFrequency(e)} 
          value={this.state.spec.filter.env.frequency}
        />
         <Slider
          label='Filter Envelope Attack'
          className='filter-env-attack' 
          id='slider-filter-env-attack'
          min={0}
          max={10}
          step={0.01}
          handleChange={(e) => this.updateFilterEnvelopeAttack(e)} 
          value={this.state.spec.filter.env.attack}
        />
      </div>
      </div>
    )
  }
}

export default SoundMaker
