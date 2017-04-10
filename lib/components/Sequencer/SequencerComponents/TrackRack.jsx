import React from 'react';
import TrackStep from './TrackStep';
import Slider from '../../SoundMaker/Slider'

const TrackRack = (props) => {
  return(
    <div className="single-rack">
      <div className='extended-controls'>
        <span>volume</span>
        <Slider
          value={props.volume}
          id={'track-volume'}
          type='range'
          handleChange={(e)=>props.changeVolume(props.name, e.target.value)}
          min={0}
          max={1}
          step={.01}
        />
        <span>filter</span>
        <Slider
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
        <div className="sample-name">{props.name}</div>
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
    </div>
  )
}

export default TrackRack
