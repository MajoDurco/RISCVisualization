import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import {
	Step,
	Stepper,
	StepButton,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import NextIcon from 'material-ui/svg-icons/navigation/chevron-right'
import PrevIcon from 'material-ui/svg-icons/navigation/chevron-left'

import Header from '../SectionHeader/index'
import {Center, StepsContainer } from './centerDivElements'

const StateText = styled.div`
  columns: 2 300px;
  column-rule: 2px solid #ccc;
  p {
    margin: 0 25px;
    display: list-item;
    font-size: 125%;
    page-break-inside: avoid;
  }
`
const NotInitStatement = styled.h1`
  text-align: center;
`

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
    return messages 
	}

  render() {
		let buttons;
    let stateline_text = ""
		if(this.props.states != null) { // if initialized
			const next_disable = this.props.activeIndex === (this.props.states.length-1) ? true : false
			const prev_disable = this.props.activeIndex === 0 ? true : false
			const indexes = _.range(this.props.states.length) // create array long as states.length
      stateline_text = this.renderText()

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
          <StepsContainer>
            <Stepper linear={false} activeStep={this.props.activeIndex}>
              {steps}
            </Stepper>
          </StepsContainer>
        </div>
			)
	}
  else {
    buttons = <NotInitStatement>Run the Visualization to see all possible states!</NotInitStatement>
    stateline_text = ""
  }

	return (
		<div>
      <Header 
        message="States"
        size="150%"
      />
			{buttons}
      <StateText>
        {stateline_text}
      </StateText>
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
