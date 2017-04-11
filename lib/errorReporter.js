
import React from 'react'
import Redbox from 'redbox-react'

const ConsoleErrorReporter = ({error}) => {
  console.error(error)
  return <Redbox error={error} />
}

ConsoleErrorReporter.propTypes = {
  error: React.PropTypes.instanceOf(Error).isRequired,
}

export default ConsoleErrorReporter

