import React, { Component } from 'react'
import Wad from 'web-audio-daw'
import SongContainer from '../../containers/SongContainer'

export class IndividualSong extends Component {
  constructor() {
    super()
    this.state = {
      playPause: false,
      currentStep: 0,
      tempo: 160,
      trackRacks: {
        snare: {
          steps: [{ play: true, pitch: '' }, { play: false, pitch: '' }, { play: false, pitch: '' }, { play: false, pitch: '' }, { play: true, pitch: '' }, { play: false, pitch: '' }, { play: false, pitch: '' }, { play: false, pitch: '' }, { play: true, pitch: '' }, { play: false, pitch: '' }, { play: false, pitch: '' }, { play: false, pitch: '' }, { play: true, pitch: '' }, { play: false, pitch: '' }, { play: false, pitch: '' }, { play: false, pitch: '' }],
          mute: false,
          sound: {
            source: 'noise',
            volume: .5,
            pitch: 'A4',
            env: {
              attack: .001,
              decay: .12,
              sustain: .3,
              hold: .07,
              release: .02
            },
            filter: {
              type: 'highpass',
              frequency: 300,
              q: .180
            }
          }
        },
        snap: {
          steps: [{ play: true, pitch: "A5" }, { play: true, pitch: 'B5' }, { play: true, pitch: 'C5' }, { play: true, pitch: 'D5' }, { play: true, pitch: 'E5' }, { play: true, pitch: 'D5' }, { play: true, pitch: 'C5' }, { play: true, pitch: 'B5' }, { play: true, pitch: '' }, { play: true, pitch: '' }, { play: true, pitch: '' }, { play: true, pitch: '' }, { play: true, pitch: '' }, { play: true, pitch: '' }, { play: true, pitch: '' }, { play: true, pitch: '' }],
          mute: false,
          sound: {
            source: 'sine',
            volume: .5,
            pitch: 'A4',
            env: {
              attack: .001,
              decay: .12,
              sustain: .3,
              hold: .07,
              release: .02
            },
            filter: {
              type: 'highpass',
              frequency: 300,
              q: .180
            }
          }
        },
      },
    }
  }

  componentDidMount() {
    this.setState({trackRacks: this.props.trackRacks, tempo: this.props.tempo})
  }

  componentWillUnmount() {
    this.loop.stop()
  }

  playPause = () => {
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
          timer = setTimeout(this.loop.play, this.state.tempo)
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
    Object.keys(this.state.trackRacks).forEach((key) => {
      if (this.state.trackRacks[key].steps[this.state.currentStep].play && (!this.state.trackRacks[key].mute)) {
        let wad = new Wad(this.state.trackRacks[key].sound)
        let pitch = (this.state.trackRacks[key].steps[this.state.currentStep].pitch !== '') ? this.state.trackRacks[key].steps[this.state.currentStep].pitch : this.state.trackRacks[key].sound.pitch
        wad.play({ pitch: pitch })
      }
    })
    if (this.state.currentStep < 15) {
      this.setState({ currentStep: this.state.currentStep + 1 })
    } else {
      this.setState({ currentStep: 0 })
    }
  }

  render() {
    console.log('name ', this.props.name);

    const displayComposition = () => {
      if(this.props.user.compositions.length > 0) {
        return (
          <div className="individual-song">
            <h3>{this.props.name.substring(0,7)}</h3>
            <span className='composition-controls'>
              {!this.state.playPause &&
                <button className='btn-play'
                        onClick={this.playPause.bind(this)}>
                </button>}
              {this.state.playPause &&
                <button className='btn btn-stop'
                        onClick={this.playPause.bind(this)}>
                </button>}
              <button className='btn btn-sm btn-edit'
                      onClick={() => console.log('edit comp')}>
                Edit
              </button>
              <button className='btn btn-sm btn-delete'
                      onClick={() => this.props.handleDelete()}>
                Delete
              </button>
            </span>
          </div>
        )
      }
    }

    return (
      <div>
        {displayComposition()}
      </div>
    )
  }
}

export default SongContainer(IndividualSong)
