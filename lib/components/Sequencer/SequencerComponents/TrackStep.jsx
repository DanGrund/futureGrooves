import React from 'react'

const TrackStep = (props) => {
  return(
    <div className={props.currentStep === props.index ? "single-step current" : "single-step"}>
      <button className={props.step.play ? 'btn step-btn step-on' : 'btn step-btn step-off'}
           onClick={() => props.toggleStep(props.name, props.index)}
        ></button>
      <div className={"step-pitch"}>
       {(props.source === 'sine' || props.source === 'sawtooth' || props.source === 'square' || props.source === 'triangle' || props.source === 'noise') ?
                  <input className="pitch-input"
                        type='text'
                        placeholder='A4'
                        value={props.step.pitch}
                        onChange={(e)=> props.changePitch(props.name, props.index, e.target.value)}
                 /> : ''
       }

      </div>
    </div>
  )
}

export default TrackStep
