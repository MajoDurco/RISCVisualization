import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import styled, { keyframes } from 'styled-components'

import { updateCpuState, animation, resetAnimation } from './actions'
import { baseHomeSelector, pipeSelector, regSelector, animationSelector, animationOpen } from './selectors'
import getInstructions from './parser'
import cpu from './cpu/cpu'

// components
import { Row, Column } from 'hedron'
import EditorWrapper from '../../components/EditorWrapper/index'
import Pipeline from '../../components/Pipeline/index'
import Registers from '../../components/Registers/index'
import StateLine from '../../components/StateLine/index'
import AnimationTest from '../../components/AnimationTest/index'

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
	constructor(props){
		super(props)
		this.arrState = null // array of immutable states of cpu
		this.arrStateActiveIndex = null 
	}
	run(text){
		try{
			let processed_instructons = getInstructions(text)
			this.arrState = cpu(processed_instructons)
			this.arrStateActiveIndex = 0
			this.props.updateCpuState(this.arrState[this.arrStateActiveIndex])
			console.log("arrstate", this.arrState)
			console.log("arrstate index", this.arrStateActiveIndex)
		} 
		catch (err){
			console.log(err)
		}
	}

	nextState(){
		if(this.arrState != null) {
			this.arrStateActiveIndex++
			if(this.arrStateActiveIndex >= this.arrState.length)
				this.arrStateActiveIndex = (this.arrState.length-1)
			this.props.updateCpuState(this.arrState[this.arrStateActiveIndex])
		}
	}

	setLineState(index){
		this.arrStateActiveIndex = index // TODO check index value
		this.props.updateCpuState(this.arrState[this.arrStateActiveIndex])
	}

  render() {
		console.log("HomePage props", this.props)
		const pipeState = this.props.pipeState.toJS()
		// console.log("pipestate", pipeState)
		const regState = this.props.regState.toJS()
		console.log('Open', this.props.open)
		this.open = this.props.animation.get('open')
		console.log(this.open)
		// console.log("regState", regState)
		// console.log(this)
    return (
			<Row divisions={6} debug={true}>
				<Column lg={2}>
					<EditorWrapper run={this.run.bind(this)} />
					<button onClick={() => {this.nextState()}}>NextState</button>
				</Column>
				<Column lg={4}>
					<Pipeline pipe_state={pipeState} />
					<Registers reg_state={regState} />
				</Column>
				<StateLine states={this.arrState} setState={(index) => this.setLineState(index)} />
			<button onClick={() => {this.props.animate()}}>Animate</button>
			<button onClick={() => {this.props.resetAnimation()}}>Reset</button>
			<AnimationTest animate={this.open}/>
			</Row>
    );
  }
}

HomePage.propTypes = {

}

const mapStateToProps = createStructuredSelector({
	baseState: baseHomeSelector,
	pipeState: pipeSelector,
	regState: regSelector,
	animation: animationSelector,
	open: animationOpen,
})

function mapDispatchToProps(dispatch){
	return {
		updateCpuState: (cpu_state) => dispatch(updateCpuState(cpu_state)),
		animate: () => dispatch(animation()),
		resetAnimation: () => dispatch(resetAnimation()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
