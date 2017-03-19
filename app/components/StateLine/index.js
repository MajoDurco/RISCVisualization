import React from 'react'
import _ from 'lodash'
// import styled from 'styled-components';

class StateLine extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
		let buttons;
		if(this.props.states != null) {
			const indexes = _.range(this.props.states.length)
			buttons = indexes.map((index) => {
				return (
					<button key={index} onClick={() =>this.props.setState(index)} >{index}</button>
				)
			})
		}
		else {
			buttons = (<h2>Not Initialized StateLine yet!</h2>)
		}
    return (
      <div>
				{buttons}
      </div>
    )
  }
}

StateLine.propTypes = {
	states: React.PropTypes.array,
	setState:	React.PropTypes.func.isRequired
}

export default StateLine
