import React from 'react'
import styled from 'styled-components'

const LOW_RESOLUTION = '460px'

const BubbleContainer = styled.div`
  background: #FFFFFF;
  border-radius: 10px;
  border: solid 2px #0076E5;
  height: ${props => props.height};
  -moz-border-radius: 10px;
  padding: 5px;
  position: relative;
  -webkit-border-radius: 10px;
  width: ${props => props.width};

  @media (max-width: ${LOW_RESOLUTION}){
    width: 300px;
    height: 450px;
  }

  ${props => props.stylex}
`

class Bubble extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <BubbleContainer 
        width={this.props.width}
        height={this.props.height}
        stylex={this.props.stylex}
      >
        {this.props.children}
      </BubbleContainer>
    );
  }
}

Bubble.propTypes = {
  height: React.PropTypes.string,
  width: React.PropTypes.string,
  stylex: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default Bubble;
