import React from 'react'

function JumpTresholdExceeded({ message, text }) {
  return (
    <div>
      <h1>{message}</h1>
      <h3>{text}</h3>
    </div>
  )
}

JumpTresholdExceeded.propTypes = {
 message: React.PropTypes.string,
 text: React.PropTypes.string
}

export default JumpTresholdExceeded
