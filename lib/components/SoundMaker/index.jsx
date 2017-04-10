import React, { Component } from 'react'
import { Link } from 'react-router'
import Select from './Select'
import Slider from './Slider'
import update from 'immutability-helper'
import Button from '../Button'

export class SoundMaker extends Component {
  constructor() {
    super()
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
            frequency: '',
            attack: '',
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
        tuna: {
          Chorus: {
            rate: 1.5,          // 0.01 to 8+
            feedback: 0.2,      // 0 to 1+
            delay: 0.0045,      // 0 to 1
            bypass: 1,          // the value 1 starts the effect as bypassed, 0 or 1
          },
          Delay: {
            feedback: 0.45,    // 0 to 1+
            delayTime: 150,    // 1 to 10000 milliseconds
            wetLevel: 0.25,    // 0 to 1+
            dryLevel: 1,       // 0 to 1+
            cutoff: 2000,      // cutoff frequency of the built in lowpass-filter. 20 to 22050
            bypass: 1,
          },
          Overdrive: {
            outputGain: 0.5,         // 0 to 1+
            drive: 0.7,              // 0 to 1
            curveAmount: 1,          // 0 to 1
            algorithmIndex: 0,       // 0 to 5, selects one of our drive algorithms
            bypass: 1,
          },
          Phaser: {
            rate: 1.2,                     // 0.01 to 8 is a decent range, but higher values are possible
            depth: 0.3,                    // 0 to 1
            feedback: 0.2,                 // 0 to 1+
            stereoPhase: 30,               // 0 to 180
            baseModulationFrequency: 700,  // 500 to 1500
            bypass: 1,
          },
          Compressor: {
            threshold: -1,     // -100 to 0
            makeupGain: 1,     // 0 and up (in decibels)
            attack: 1,         // 0 to 1000
            release: 0,        // 0 to 3000 ratio: 4,          // 1 to 20 knee: 5,           // 0 to 40
            automakeup: true,  // true/false
            bypass: 1,
          },
          Convolver: {
            highCut: 22050,    // 20 to 22050
            lowCut: 20,        // 20 to 22050
            dryLevel: 1,       // 0 to 1+
            wetLevel: 1,       // 0 to 1+
            level: 1,          // 0 to 1+, adjusts total output of both wet and dry
            impulse: 'http://localhost:3000/api/v1/impulses?id=BlockInside.wav',
            bypass: 1,
          },
          Filter: {
            frequency: 440,        // :4 to 22050
            Q: 1,                  // 0.001 to 100
            gain: 0,               // -40 to 40 (in decibels)
            filterType: 'lowpass', // lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass 
            bypass: 1,
          },
          Cabinet: {
            makeupGain: 1,                                 // 0 to 20
            impulsePath: 'http://localhost:3000/api/v1/impulses?id=DirectCabinetN1.wav',    // path to your speaker impulse
            bypass: 1,
          },
          Tremolo: {
            intensity: 0.3,    // 0 to 1
            rate: 4,           // 0.001 to 8
            stereoPhase: 0,    // 0 to 180
            bypass: 1,
          },
          WahWah: {
            automode: true,        // true/false
            baseFrequency: 0.5,    // 0 to 1
            excursionOctaves: 2,   // 1 to 6
            sweep: 0.2,            // 0 to 1
            resonance: 10,         // 1 to 100
            sensitivity: 0.5,      // -1 to 1
            bypass: 1,
          },
          Bitcrusher: {
            bits: 1,           // 1 to 16
            normfreq: 0.1,     // 0 to 1
            bufferSize: 256,  // 256 to 16384
            bypass: 0,
          },
          MoogFilter: {
            cutoff: 0.065,     // 0 to 1
            resonance: 3.5,    // 0 to 4
            bufferSize: 4096,  // 256 to 16384
            bypass: 1,
          },
          PingPongDelay: {
            wetLevel: 0.5,       // 0 to 1
            feedback: 0.3,       // 0 to 1
            delayTimeLeft: 150,  // 1 to 10000 (milliseconds)
            delayTimeRight: 200, // 1 to 10000 (milliseconds)
            bypass: 1,
          },
        },
        oscillators: [],
      },
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

  update(e, key) {
    this.setState(update(this.state, { spec: { [key]: { $set: e.target.value } } }))
  }

  updatePitch(e) {
    const newPitch = e.target.value.toUpperCase()
    this.setState(update(this.state, { spec: { pitch: { $set: newPitch } } }))
  }

  updateSource(e) {
    this.setState(update(this.state, { spec: { source: { $set: e.target.value } } }))
  }

  updateADSR(e, key) {
    this.setState(update(this.state, { spec: { env: { [key]: { $set: Math.fround(e.target.value) } } } }))
  }

  updateFilter(e, key) {
    const newValue = key === 'type' ? e.target.value : Math.fround(e.target.value)
    this.setState(update(this.state, { spec: { filter: { [key]: { $set: newValue } } } }))
  }

  updateFilterEnvelope(e, key) {
    console.log(key)
    this.setState(update(this.state, { spec: { filter: { env: { [key]: { $set: Math.fround(e.target.value) } } } } }))
  }

  updateReverbWet(e) {
    const newReverbWet = Math.fround(e.target.value)
    this.setState(update(this.state, { spec: { reverb: { wet: { $set: newReverbWet } } } }))
  }

  updateReverbImpulse(e) {
    const newReverbImpulseURL = `http://localhost:3000/api/v1/impulses?id=${e.target.value}.wav`
    this.setState(update(this.state, { spec: { reverb: { impulse: { $set: newReverbImpulseURL } } } }))
  }

  updateDelay(e, key) {
    this.setState(update(this.state, { spec: { delay: { [key]: { $set: Math.fround(e.target.value) } } } }))
  }

  updateShape(e, key) {
    this.setState(update(this.state, { spec: { [key]: { shape: { $set: e.target.value } } } }))
  }

  updateTremolo(e, key) {
    this.setState(update(this.state, { spec: { tremolo: { [key]: { $set: Math.fround(e.target.value) } } } }))
  }

  updateVibrato(e, key) {
    this.setState(update(this.state, { spec: { vibrato: { [key]: { $set: Math.fround(e.target.value) } } } }))
  }

  updateTunaChorus(e, key) {
    this.setState(update(this.state, { spec: { tuna: { Chorus: { [key]: { $set: Math.fround(e.target.value) } } } } }))
  }

  updateTunaChorusBypass(e) {
    this.setState(update(this.state, { spec: { tuna: { Chorus: { bypass: { $set: e.target.value } } } } }))
  }

  updateTunaOverdrive(e, key) {
    this.setState(update(this.state, { spec: { tuna: { Overdrive: { [key]: { $set: Math.fround(e.target.value) } } } } }))
  }

  updateTunaOverdriveBypass(e) {
    this.setState(update(this.state, { spec: { tuna: { Overdrive: { bypass: { $set: e.target.value } } } } }))
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
            handleChange={(e) => this.update(e, 'volume')}
            value={this.state.spec.volume}
          />
          <Slider
            label='Detune'
            className='slider detune'
            id='slider-detune'
            min={0}
            max={1200}
            step={1}
            handleChange={(e) => this.update(e, 'detune')}
            value={this.state.spec.detune}
          />
          <Slider
            label='Panning'
            className='slider panning'
            id='slider-panning'
            min={-1}
            max={1}
            step={0.01}
            handleChange={(e) => this.update(e, 'panning')}
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
            handleChange={(e) => this.updateADSR(e, 'attack')}
            value={this.state.spec.env.attack}
          />
          <Slider
            label='Decay'
            className='slider adsr-env-decay'
            id='slider-adsr-env-decay'
            min={0}
            max={5}
            step={0.01}
            handleChange={(e) => this.updateADSR(e, 'decay')}
            value={this.state.spec.env.decay}
          />
          <Slider
            label='Sustain'
            className='slider adsr-env-sustain'
            id='slider-adsr-env-sustain'
            min={0}
            max={1}
            step={0.01}
            handleChange={(e) => this.updateADSR(e, 'sustain')}
            value={this.state.spec.env.sustain}
          />
          <Slider
            label='Hold'
            className='slider slider adsr-env-hold'
            id='slider-adsr-env-hold'
            min={0}
            max={10}
            step={0.01}
            handleChange={(e) => this.updateADSR(e, 'hold')}
            value={this.state.spec.env.hold}
          />
          <Slider
            label='Release'
            className='slider adsr-env-release'
            id='slider-adsr-env-release'
            min={0}
            max={10}
            step={0.01}
            handleChange={(e) => this.updateADSR(e, 'release')}
            value={this.state.spec.env.release}
          />
        </div>
        <div className='filter'>
          <h4> Filter </h4>
          <Select
            name='filter-type'
            className='select filter-type'
            options={['allpass', 'lowpass', 'highpass', 'bandpass', 'lowshelf', 'peaking', 'notch']}
            updateSelection={e => this.updateFilter(e, 'type')}
          />
          <Slider
            label='Frequency'
            className='slider filter-freq'
            id='slider-filter-freq'
            min={0}
            max={5000}
            step={1}
            handleChange={(e) => this.updateFilter(e, 'frequency')}
            value={this.state.spec.filter.frequency}
          />
          <Slider
            label='Q-factor'
            className='slider filter-q-factor'
            id='slider-filter-q-factor'
            min={0}
            max={10}
            step={0.01}
            handleChange={(e) => this.updateFilter(e, 'q')}
            value={this.state.spec.filter.q}
          />
          <Slider
            label='Filter Envelope Frequency'
            className='slider filter-env-frequency'
            id='slider-filter-env-frequency'
            min={0}
            max={5000}
            step={1}
            handleChange={(e) => this.updateFilterEnvelope(e, 'frequency')}
            value={this.state.spec.filter.env.frequency}
          />
          <Slider
            label='Filter Envelope Attack'
            className='slider filter-env-attack'
            id='slider-filter-env-attack'
            min={0}
            max={10}
            step={0.01}
            handleChange={(e) => this.updateFilterEnvelope(e, 'attack')}
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
              'OneStar',
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
            updateSelection={e => this.updateReverbImpulse(e)}
          />
          <Slider
            label='Reverb Wet'
            className='slider reverb-wet'
            id='slider-reverb-wet'
            min={0}
            max={1}
            step={0.01}
            handleChange={(e) => this.updateReverbWet(e)}
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
              handleChange={(e) => this.updateDelayTime(e, 'delayTime')}
              value={this.state.spec.delay.delayTime}
            />
            <Slider
              label='Delay Wet'
              className='slider delay-wet'
              id='slider-delay-wet'
              min={0}
              max={1}
              step={0.01}
              handleChange={(e) => this.updateDelay(e, 'wet')}
              value={this.state.spec.delay.wet}
            />
            <Slider
              label='Delay Feedback'
              className='slider delay-feedback'
              id='slider-delay-feedback'
              min={0}
              max={1}
              step={0.01}
              handleChange={(e) => this.updateDelay(e, 'feedback')}
              value={this.state.spec.delay.feedback}
            />
          </div>
          <div className='vibrato'>
            <h4> Vibrato </h4>
            <Select
              name='vibrato-shape'
              className='select vibrato-shape'
              options={['sine', 'sawtooth', 'square', 'triangle']}
              updateSelection={e => this.updateShape(e, 'vibrato')}
            />
            <Slider
              label='Vibrato Magnitude'
              className='slider vibrato-magnitude'
              id='slider-vibrato-magnitude'
              min={1}
              max={10}
              step={0.1}
              handleChange={(e) => this.updateVibrato(e, 'magnitude')}
              value={this.state.spec.vibrato.magnitude}
            />
            <Slider
              label='Vibrato Speed'
              className='slider vibrato-speed'
              id='slider-vibrato-speed'
              min={0}
              max={10}
              step={0.1}
              handleChange={(e) => this.updateVibrato(e, 'speed')}
              value={this.state.spec.vibrato.speed}
            />
            <Slider
              label='Vibrato Attack'
              className='slider vibrato-attack'
              id='slider-vibrato-attack'
              min={0}
              max={10}
              step={0.1}
              handleChange={(e) => this.updateVibrato(e, 'attack')}
              value={this.state.spec.vibrato.attack}
            />
          </div>
          <div className='tremolo'>
            <h4> Tremolo </h4>
            <Select
              name='tremolo-shape'
              className='select tremolo-shape'
              options={['sine', 'sawtooth', 'square', 'triangle']}
              updateSelection={e => this.updateShape(e, 'tremolo')}
            />
            <Slider
              label='Tremolo Magnitude'
              className='slider tremolo-magnitude'
              id='slider-tremolo-magnitude'
              min={1}
              max={10}
              step={0.1}
              handleChange={(e) => this.updateTremolo(e, 'magnitude')}
              value={this.state.spec.tremolo.magnitude}
            />
            <Slider
              label='Tremolo Speed'
              className='slider tremolo-speed'
              id='slider-tremolo-speed'
              min={0}
              max={10}
              step={0.1}
              handleChange={(e) => this.updateTremolo(e, 'speed')}
              value={this.state.spec.tremolo.speed}
            />
            <Slider
              label='Tremolo Attack'
              className='slider tremolo-attack'
              id='slider-tremolo-attack'
              min={0}
              max={10}
              step={0.1}
              handleChange={(e) => this.updateTremolo(e, 'attack')}
              value={this.state.spec.tremolo.attack}
            />
          </div>
        </div>
          <div className='tuna'>
            <h2>Tuna</h2>
            <div className='tuna-chorus'>
              <h4> Chorus </h4>
              <Slider
                label='Rate'
                className='slider tuna-chorus-rate'
                id='slider-tuna-chorus-rate'
                min={0}
                max={8}
                step={0.1}
                handleChange={(e) => this.updateTunaChorus(e, 'rate')}
                value={this.state.spec.tuna.Chorus.rate}
              />
              <Slider
                label='Feedback'
                className='slider tuna-chorus-feedback'
                id='slider-tuna-chorus-feedback'
                min={0}
                max={1}
                step={0.01}
                handleChange={(e) => this.updateTunaChorus(e, 'feedback')}
                value={this.state.spec.tuna.Chorus.feedback}
              />
              <Slider
                label='Delay'
                className='slider tuna-chorus-delay'
                id='slider-tuna-chorus-delay'
                min={0}
                max={1}
                step={0.01}
                handleChange={(e) => this.updateTunaChorus(e, 'delay')}
                value={this.state.spec.tuna.Chorus.delay}
              />
              <Slider
                label='Bypass'
                className='slider tuna-chorus-bypass'
                id='slider-tuna-chorus-bypass'
                min={0}
                max={1}
                step={1}
                handleChange={(e) => this.updateTunaChorusBypass(e)}
                value={this.state.spec.tuna.Chorus.bypass}
              />
            </div>
            <div className='tuna-delay'>
              <h4> Delay </h4>
            </div>
            <div className='tuna-phaser'>
              <h4> Phaser </h4>
            </div>
            <div className='tuna-overdrive'>
              <h4> Overdrive </h4>
              <Slider
                label='Output Gain'
                className='slider tuna-overdrive-output-gain'
                id='slider-tuna-overdrive-output-gain'
                min={0}
                max={1}
                step={0.01}
                handleChange={(e) => this.updateTunaOverdrive(e, 'outputGain')}
                value={this.state.spec.tuna.Overdrive.outputGain}
              />
              <Slider
                label='Drive'
                className='slider tuna-overdrive-drive'
                id='slider-tuna-overdrive-drive'
                min={0}
                max={1}
                step={0.01}
                handleChange={(e) => this.updateTunaOverdrive(e, 'drive')}
                value={this.state.spec.tuna.Overdrive.drive}
              />
              <Slider
                label='Curve Amount'
                className='slider tuna-overdrive-curve-amount'
                id='slider-tuna-overdrive-curve-amount'
                min={0}
                max={1}
                step={0.01}
                handleChange={(e) => this.updateTunaOverdrive(e, 'curveAmount')}
                value={this.state.spec.tuna.Overdrive.curveAmount}
              />
              <Slider
                label='Algorithm Index'
                className='slider tuna-overdrive-algorithm-index'
                id='slider-tuna-overdrive-algorithm-index'
                min={0}
                max={5}
                step={1}
                handleChange={(e) => this.updateTunaOverdrive(e, 'algorithmIndex')}
                value={this.state.spec.tuna.Overdrive.algorithmIndex}
              />
              <Slider
                label='Bypass'
                className='slider tuna-overdrive-bypass'
                id='slider-tuna-overdrive-bypass'
                min={0}
                max={1}
                step={1}
                handleChange={(e) => this.updateTunaOverdriveBypass(e)}
                value={this.state.spec.tuna.Overdrive.bypass}
              />
            </div>
            <div className='tuna-compressor'>
              <h4> Compressor </h4>
            </div>
            <div className='tuna-convolver'>
              <h4> Convolver </h4>
            </div>
            <div className='tuna-filter'>
              <h4> Filter </h4>
            </div>
            <div className='tuna-cabinet'>
              <h4> Cabinet </h4>
            </div>
            <div className='tuna-tremolo'>
              <h4> Tremolo </h4>
            </div>
            <div className='tuna-wahah'>
              <h4> WahWah </h4>
            </div>
            <div className='tuna-bitcrusher'>
              <h4> Bitcrusher </h4>
            </div>
            <div className='tuna-moog-filter'>
              <h4> Moog Filter </h4>
            </div>
            <div className='tuna-ping-pong-delay'>
              <h4> PingPong Delay </h4>
            </div>
          </div>
      </div>
    )
  }
}

export default SoundMaker
