import React from 'react'
import _ from 'lodash'
import {
	Step,
	Stepper,
	StepButton,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import NextIcon from 'material-ui/svg-icons/navigation/chevron-right'
import PrevIcon from 'material-ui/svg-icons/navigation/chevron-left'

import Center from './centerDivElements'
/*
 * @desc renders stateline which represents all state of simulation
 */
class StateLine extends React.Component {

	renderText(){
		const messages = this.props.ui.state_line_msg.map((msg, index) => (
			<p key={index}>{msg}</p>
		))
		if (messages.length === 0)
			return ""
    return _.reverse(messages) // reverses array to be describing states from top of pipeline to the bottom
	}

  render() {
		let buttons;
		if(this.props.states != null) { // if initialized
			const next_disable = this.props.activeIndex === (this.props.states.length-1) ? true : false
			const prev_disable = this.props.activeIndex === 0 ? true : false
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
				<div>
					<Center>
						<RaisedButton 
							disabled={prev_disable}
							icon={<PrevIcon />}
							label="Previous Step"
							onTouchTap={() => this.props.prev()}
						/>
						<RaisedButton 
							disabled={next_disable}
							icon={<NextIcon />}
							label="Next Step"
							labelPosition="before"
							onTouchTap={() => this.props.next()}
						/>
					</Center>
					<Stepper linear={false} activeStep={this.props.activeIndex}>
						{steps}
					</Stepper>
				</div>
			)
	}
	else 
		buttons = <h2>Not Initialized StateLine yet!</h2>

	return (
		<div>
			{buttons}
			{this.renderText()}
		</div>
    )
  }
}

StateLine.propTypes = {
	activeIndex: React.PropTypes.number,
	next: React.PropTypes.func,
	prev: React.PropTypes.func,
	setState:	React.PropTypes.func.isRequired,
	states: React.PropTypes.array,
	ui: React.PropTypes.object,
}

export default StateLine
