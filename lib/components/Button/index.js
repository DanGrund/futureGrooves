import React from 'react'

const Button = (props) => {
  return (
    <button
      className={props.className}
      onClick={e => props.handleClick(e)}
    > {props.text}
    </button>
  )
}

export default Button
