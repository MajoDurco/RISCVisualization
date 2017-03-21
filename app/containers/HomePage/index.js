import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { fromJS } from 'immutable'
import RaisedButton from 'material-ui/RaisedButton'

import { updateCpuState, animation, resetAnimation, showInstErrNotif, hideInstErrNotif } from './actions'
import { baseHomeSelector, pipeSelector, regSelector, animationSelector, animationOpen, editorSelector } from './selectors'
import getInstructions from './parser'
import cpu from './cpu/cpu'

// components
import { Row, Column } from 'hedron'
import Editor from '../../components/Editor/index'
import Pipeline from '../../components/Pipeline/index'
import Registers from '../../components/Registers/index'
import StateLine from '../../components/StateLine/index'
import AnimationTest from '../../components/AnimationTest/index'
import ErrNotifcation from '../../components/ErrNotification/index'

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

	constructor(props){
		super(props)
		this.arrState = null // array of immutable states of cpu
		this.arrStateActiveIndex = null 
	}

	run(text){
			let processed_instructions = getInstructions(text)
			if('valid' in processed_instructions){
				this.props.showInstErrNotif(fromJS(processed_instructions.annotations))
				return
			}
			this.props.hideInstErrNotif() // hide err window
			//instructions are OK
			this.arrState = cpu(processed_instructions)
			this.arrStateActiveIndex = 0
			this.props.updateCpuState(this.arrState[this.arrStateActiveIndex])
			console.log("arrstate", this.arrState)
			console.log("arrstate index", this.arrStateActiveIndex)
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
		console.log("HomePage", this)
		const pipeState = this.props.pipeState.toJS()
		// console.log("pipestate", pipeState)
		const regState = this.props.regState.toJS()
		// console.log("regState", regState)
		this.open = this.props.animation.get('open')
		let editor_err = this.props.editor.toJS()
		console.log("err editor", editor_err)
		if(editor_err.errors.length !== 0)
			editor_err = (<ErrNotifcation errors={editor_err.errors} />)
		else
			editor_err = null

    return (
			<Row divisions={6} debug={true}>
				<Column lg={2}>
					<Editor run={this.run.bind(this)} />
					<button onClick={() => {this.nextState()}}>NextState</button>
				</Column>
				<Column lg={4}>
					<Pipeline pipe_state={pipeState} />
					<Registers reg_state={regState} />
				</Column>
				<StateLine states={this.arrState} setState={(index) => this.setLineState(index)} />
			<button onClick={() => {this.props.animate()}}>Animate</button>
			<AnimationTest animate={this.open} />
			{editor_err}
			</Row>
    );
  }
}

HomePage.propTypes = {

}

const mapStateToProps = createStructuredSelector({
	baseState : baseHomeSelector,
	pipeState : pipeSelector,
	regState  : regSelector,
	editor    : editorSelector,
	animation : animationSelector,
	open      : animationOpen,
})

function mapDispatchToProps(dispatch){
	return {
		updateCpuState: (cpu_state) => dispatch(updateCpuState(cpu_state)),
		animate: ()                 => dispatch(animation()),
		resetAnimation: ()          => dispatch(resetAnimation()),
		showInstErrNotif: (errors)  => dispatch(showInstErrNotif(errors)),
		hideInstErrNotif: ()        => dispatch(hideInstErrNotif()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
