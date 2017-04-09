import React from 'react';

const TrackStep = (props) => {
  return(
    <div className={props.currentStep === props.index ? "single-step current" : "single-step"}>
      <div className={props.step ? 'step-on' : 'step-off'}
           onClick={() => props.toggleStep(props.name, props.index)}
        >hey</div>
    </div>
  )
}

export default TrackStep
