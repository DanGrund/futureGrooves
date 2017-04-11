import React from 'react';

const TrackStep = (props) => {
  return(
    <div className={props.currentStep === props.index ? "single-step current" : "single-step"}>
      <div className={props.step.play ? 'step-on' : 'step-off'}
           onClick={() => props.toggleStep(props.name, props.index)}
        >
        hey
      </div>
      <div className={"step-pitch"}>
        <input className="pitch-input"
               type='text'
               value={props.step.pitch}
               onChange={(e)=> props.changePitch(props.name, props.index, e.target.value)}
        />
      </div>
    </div>
  )
}

export default TrackStep
