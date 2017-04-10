import React from 'react';
import TrackStep from './TrackStep';
import Slider from '../../SoundMaker/Slider'

const TrackRack = (props) => {
  return(
    <div className="single-rack">
      <div>
        <div className="sample-name">{props.name}</div>
        <Slider
          value={props.volume}
          id={'track-volume'}
          type='range'
          handleChange={(e)=>props.changeVolume(props.name, e.target.value)}
          min={0}
          max={1}
          step={.01}
        />
      </div>
      {props.steps.map((step, i) =>
        <TrackStep
          key={i}
          index={i}
          step={step}
          name={props.name}
          currentStep={props.currentStep}
          toggleStep={props.toggleStep}
        />
      )}
    </div>
  )
}

export default TrackRack
