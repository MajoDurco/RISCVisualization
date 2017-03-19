import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(180deg);
  }
`
const DemoBlock = styled.div`
position: relative 
animation: ${props => props.animate ? `${rotate} 2s linear 2`: `none`};
width: 50px 
height: 50px 
border-radius: 4px
background-color: rgb(130, 181, 198);
`

class AnimationTest extends React.PureComponent {
  render() {
		return (
			<DemoBlock animate={this.props.animate}>
			</DemoBlock>
		)
  }
}

AnimationTest.propTypes = {

};

export default AnimationTest;
