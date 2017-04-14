import React from 'react'

import Bubble from '../Bubble/index'

class HoverDiv extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Bubble 
        height={this.props.height} 
        width={this.props.width}
        stylex={this.props.stylex}
      >
        {this.props.children}
      </Bubble>
    )
  }
}

HoverDiv.propTypes = {
  children: React.PropTypes.node,
  height: React.PropTypes.string,
  width: React.PropTypes.string,
  stylex: React.PropTypes.string,
}

export default HoverDiv
