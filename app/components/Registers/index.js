import React from 'react';

import _ from 'lodash'
import styled from 'styled-components';

const RegDiv = styled.div`
	background-color: ${props => props.change ? `lightblue` : `none`};
`

class Registers extends React.Component { // eslint-disable-line react/prefer-stateless-function

	isChanged(reg_name){
		console.log("reg_changes", this.props.ui.reg_changes)
		console.log("reg_name", reg_name)
		const found = this.props.ui.reg_changes.find((reg) => reg.name === reg_name)
		return found ? true : false
	}

  render() {
		const reg_list = _.toPairs(this.props.reg_state)
		// [[reg<String>, {value:Number, lock:Boolean}], [...],..]
		const registers = reg_list.map((register) => {
			const name = register[0]
			const value = register[1].value
			const changed = this.isChanged(name)
			console.log("changed", changed)
			return (
			<RegDiv key={name} change={changed}>
				<p><b>{name}</b></p>
				<p>{value}</p>
			</RegDiv>
			)
		})
    return (
      <div>
				{registers}
      </div>
    );
  }
}

Registers.propTypes = {
	reg_state: React.PropTypes.object.isRequired
};

export default Registers;
