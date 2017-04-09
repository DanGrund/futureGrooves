import React from 'react';
import TrackStep from './TrackStep';

const TrackRack = (props) => {
  return(
    <div className="single-rack">

      <div className="sample-name">{props.name}</div>
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
