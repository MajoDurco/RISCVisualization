import React from 'react';
import styled from 'styled-components';

import { Row, Column } from 'hedron'

class Pipeline extends React.PureComponent { 
  render() {
		const pipe_state = this.props.pipe_state.map((instruction) => {
			if(typeof(instruction) === 'object')
				instruction = instruction.instruction
			return (<Column lg={1}>{instruction}</Column>)
		})
    return (
			<Row debug={true} alignItems="center">
			{pipe_state}
			</Row>
    )
  }
}

Pipeline.propTypes = {

};

export default Pipeline;
