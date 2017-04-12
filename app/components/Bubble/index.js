import React from 'react';
import styled from 'styled-components';

const BubbleContainer = styled.div`
  background: #FFFFFF;
  border-radius: 10px;
  border: solid 2px #0076E5;
  height: ${props => props.height};
  -moz-border-radius: 10px;
  padding: 0px;
  padding: 5px;
  position: relative;
  -webkit-border-radius: 10px;
  width: ${props => props.width};

  &:after {
    border-color: #FFFFFF transparent;
    border-style: solid;
    border-width: 0 15px 15px;
    content: '';
    display: block;
    left: ${props => props.left}px;
    position: absolute;
    top: -15px;
    width: 0;
    z-index: 1;
  }
  &:before {
    border-color: #0076E5 transparent;
    border-style: solid;
    border-width: 0 16px 16px;
    content: '';
    display: block;
    left: ${props => props.left-1}px;
    position: absolute;
    top: -18px;
    width: 0;
    z-index: 0;
  }
`

class Bubble extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <BubbleContainer 
        width={this.props.width}
        height={this.props.height}
        left={this.props.left}
      >
        {this.props.children}
      </BubbleContainer>
    );
  }
}

Bubble.propTypes = {
  height: React.PropTypes.string.isRequired,
  left: React.PropTypes.number.isRequired,
  width: React.PropTypes.string.isRequired,
  children: React.PropTypes.node,
};

export default Bubble;
