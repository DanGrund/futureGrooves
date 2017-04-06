import React from 'react'

export default class Select extends React.Component {
  render() {
    const options = this.props.options ? this.props.options.map((option, index) => {
      return <option key={index} value={option}>{option}</option>
    }) : null

    return (
      <div>
        <select value={this.props.value} onChange={e => this.props.updateSelection(e)}>
          {options}
        </select>
      </div>
    )
  }
}
