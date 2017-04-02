import React from 'react';
import _ from 'lodash'
import styled from 'styled-components';
import { Row, Column } from 'hedron'

import NamedDiv from '../NamedDiv/index'

const RegistersDiv = styled.div`
	// min-width: 120px;
	// width: 10%;
`

const RegContext = styled.div`
	background-color: ${props => props.change ? `lightblue` : `none`};
	overflow: auto;
	text-align: center;
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
			return (
			<Column key={name} xs={6} sm={3} md={2} lg={1}>
				<NamedDiv header={name}>
					<RegContext key={name} change={changed}>
						<span>{value}</span>
					</RegContext>
				</NamedDiv>
			</Column>
			)
		})
    return (
		<RegistersDiv>
				<NamedDiv header="Registers">
						<Row debug={true}>
							{registers}
						</Row>
				</NamedDiv>
		</RegistersDiv>
    );
  }
}

Registers.propTypes = {
	reg_state: React.PropTypes.object.isRequired
};

export default Registers;
