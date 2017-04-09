import React from 'react'
import styled from 'styled-components'
import Divider from 'material-ui/Divider'
import { Row, Column } from 'hedron'
import _ from 'lodash'

import { pulseMemVal } from '../animations'
import { ANIMATION_DURATION } from '../../containers/HomePage/constants'

const DrawerContent = styled.div`
	margin-left: 50px;
`

const Cell = styled(Column)`
	padding: 0;
	margin: 0 40% 0 0;
`

const Index = styled.div`
	opacity: 0.4;
	position: relative;
	top: 5px;
`

const Value = styled.div`
  animation-name: ${props => props.animation ? `${pulseMemVal}` : "none"};
  animation-duration: ${ANIMATION_DURATION}s;
  background-color: ${props => props.change ? `lightblue` : `none`};
	font-weight: bold;
	font-size: 1.5em;
`

class MemoryState extends React.Component { // eslint-disable-line react/prefer-stateless-function

  isChanged(index){
    const found = this.props.ui.mem_changes.find((mem_index) => mem_index.name === index)
    // if founded
    return found ? true : false 
  }

  render() {
	const memory = this.props.memory.map((cell, index) => {
    const changed = this.isChanged(index)
    const animation = changed && this.props.animationOn
    return (
			<Cell lg={1} md={1} sm={1} key={index}>
        <Index>
          Index:{index}
        </Index>
        <Value
          changed={changed}
          animation={animation}
        >{cell}</Value>
			</Cell>
    )
  })
	const result = _.chunk(memory, 2).map((cell, index) => (
		<div key={index}>
			<Row divisions={2}>
				{cell}
			</Row>
			<Divider />
		</div>
	))

	return (
		<DrawerContent>
			{result}
		</DrawerContent>
	)
  }
}

MemoryState.propTypes = {
  animationOn: React.PropTypes.bool,
	memory: React.PropTypes.array.isRequired,
  ui: React.PropTypes.object.isRequired
}

export default MemoryState
