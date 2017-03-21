import React from 'react'
import _ from 'lodash'
import {
	Step,
	Stepper,
	StepButton,
} from 'material-ui/Stepper'

class StateLine extends React.Component {
  render() {
		let buttons;
		if(this.props.states != null) {
			const indexes = _.range(this.props.states.length) // create array long as states.length
			const steps = indexes.map((index) => {
				return (
					<Step key={index}>
						<StepButton onClick={() => this.props.setState(index)}>
						</StepButton>
					</Step>
					)
			})
			buttons = (
				<Stepper linear={false} activeStep={this.props.activeIndex}>
					{steps}
				</Stepper>
			)
	}
	else 
		buttons = <h2>Not Initialized StateLine yet!</h2>

	return (
		<div>
			{buttons}
		</div>
    )
  }
}

StateLine.propTypes = {
	states: React.PropTypes.array,
	setState:	React.PropTypes.func.isRequired,
	activeIndex: React.PropTypes.number.isRequired,
}

export default StateLine
