import React from 'react';
import TrackStep from './TrackStep';
import Slider from '../../SoundMaker/Slider'

const TrackRack = (props) => {
  return(
    <div className="single-rack">
      <div className='extended-controls'>
        <button onClick={()=>props.muteTrack(props.name)}>mute</button>
        <button onClick={()=>props.soloTrack(props.name)}>solo</button>
        <Slider
          label="volume"
          value={props.volume}
          id={'track-volume'}
          type='range'
          handleChange={(e)=>props.changeVolume(props.name, e.target.value)}
          min={0}
          max={1}
          step={.01}
        />
        <Slider
          label="filter"
          value={props.filter}
          id={'track-filter'}
          type='range'
          handleChange={(e)=>props.changeFilter(props.name, e.target.value)}
          min={0}
          max={5000}
          step={10}
        />
      </div>
      <div className='basic-controls'>
        {props.steps.map((step, i) =>
          <TrackStep
            key={i}
            index={i}
            step={step}
            name={props.name}
            currentStep={props.currentStep}
            toggleStep={props.toggleStep}
            changePitch={props.changePitch}
          />
        )}
      </div>
      <div className='title-bar'>
        <div className="sample-name">{props.name}</div>
        <button onClick={(e)=>{props.removeTrack(props.name)}}>delete</button>
      </div>

    </div>
  )
}

export default TrackRack
