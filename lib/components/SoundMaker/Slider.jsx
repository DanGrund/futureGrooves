import React from 'react'

export default class Slider extends React.Component {


  render() {
    return (
      <div className='slider'>
        <span className='slider-label'> {this.props.label} </span>
        <input
          className='input slider-range'
          value={this.props.value}
          id={this.props.id}
          type='range'
          onChange={e => this.props.handleChange(e)}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          />
        <input
          className='input slider-number'
          type='number'
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          onChange={e => this.props.handleChange(e)}
        />
      </div>
    )
  }
}
