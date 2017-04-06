import React from 'react'
import styled from 'styled-components'
import Divider from 'material-ui/Divider'
import { Row, Column } from 'hedron'
import _ from 'lodash'

const DrawerContent = styled.div`
	margin-left: 50px
`

const Cell = styled(Column)`
	padding: 0
	margin: 0 40% 0 0
`

const Index = styled.div`
	opacity: 0.4
	position: relative
	top: 5px
`

const Value = styled.div`
	font-weight: bold
	font-size: 1.5em
`


class MemoryState extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
	const memory = this.props.memory.map((cell, index) => (
			<Cell lg={1} md={1} sm={1} key={index}>
				<Index>
					Index:{index}
				</Index>
				<Value>{cell}</Value>
			</Cell>
	))
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
	memory: React.PropTypes.array.isRequired,
}

export default MemoryState
