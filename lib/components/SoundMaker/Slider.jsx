import React from 'react'

export default class Slider extends React.Component {
  render() {
    return (
      <div>
        <span> {this.props.label} </span>
        <input 
          value={this.props.value}
          id={this.props.id}
          type='range'
          onChange={e => this.props.handleChange(e)}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          />
        <span> {this.props.value} </span>
      </div>
    )
  }
}
