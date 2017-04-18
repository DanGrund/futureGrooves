import React from 'react'

export default class Slider extends React.Component {


  componentWillReceiveProps(nextProps) {
    this.setState({inputDraft: nextProps.value})
  }


  handleTextInputChange = (e) => {
    this.setState({ inputDraft: e.target.value })
  }

  handleKeyUp = (e) => {
    if (e.keyCode === 13 || e.type === 'blur') {
      this.setState({ inputDraft: e.target.value })
      if (e.target.value > this.props.max) {
        e.target.value = this.props.max
      } else if (e.target.value < this.props.min || e.target.value === '') {
        e.target.value = this.props.min
      }
      if (e.target.value !== '') {
        this.props.handleChange(e)
      }
      this.handleTextInputChange(e)
    }
  }

  handleSliderChange = (e) => {
    this.setState({inputDraft: e.target.value})
    this.props.handleChange(e)
  }

  state = {
    inputDraft: this.props.value
  }

  render() {
    return (
      <div className='slider'>
        <span className='slider-label'> {this.props.label} </span>
        <input
          className='input slider-range'
          value={this.props.value}
          id={this.props.id}
          type='range'
          onChange={this.handleSliderChange}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          />
        <input
          className='input slider-number'
          type='number'
          value={this.state.inputDraft}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          onChange={this.handleTextInputChange}
          onKeyUp={this.handleKeyUp}
          onBlur={this.handleKeyUp}
          onClick={this.handleClick}
        />
      </div>
    )
  }
}
