import React from 'react';
// import styled from 'styled-components';

import { Row, Column } from 'hedron'

class Pipeline extends React.PureComponent { 
  render() {
		const pipe_state = this.props.pipe_state.map((instruction, index) => {
			if(typeof(instruction) === 'object') // else is INITVAL of ENDVAL which is string
				instruction = instruction.instruction
			return (<Column key={index} lg={1}>{instruction}</Column>)
		})
    return (
			<Row debug={true} alignItems="center">
				{pipe_state}
			</Row>
    )
  }
}

Pipeline.propTypes = {
 pipe_state: React.PropTypes.array.isRequired
};

export default Pipeline;
