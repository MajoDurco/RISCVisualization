import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import NotificationSystem from 'react-notification-system'
import { Row, Column } from 'hedron'

import { updateCpuState, animation, resetAnimation, showInstErrNotif, hideInstErrNotif } from './actions'
import { baseHomeSelector, pipeSelector, regSelector, animationSelector, animationOpen, editorSelector, uiSelector } from './selectors'
import getInstructions from './parser'
import cpu from './cpu/cpu'

// components
import Editor from '../../components/Editor/index'
import Pipeline from '../../components/Pipeline/index'
import Registers from '../../components/Registers/index'
import StateLine from '../../components/StateLine/index'
import ErrNotification from '../../components/ErrNotification/index'

export class HomePage extends React.PureComponent {

	constructor(props){
		super(props)
		this.arrState = null // array of immutable states of cpu
		this.arrStateActiveIndex = null 
	}
	
	componentDidMount(){
		this.notificationSystem = this.refs.notificationSystem
	}

	run(text){
			let processed_instructions = getInstructions(text)
			if('valid' in processed_instructions){
				this._clearNotifications()
				this._addNotification(null, "Error in code", 'error', 0, 'tc',
					(<ErrNotification errors={processed_instructions.annotations} />)) 
				return
			}
			//instructions are OK
			this._clearNotifications()
			this._addNotification(null, "Run succesful")

			this.arrState = cpu(processed_instructions)
			this.arrStateActiveIndex = 0
			this.props.updateCpuState(this.arrState[this.arrStateActiveIndex])
			this.arrState.forEach((state) => {
			 console.log(state.toJS())
			})
			// console.log("arrstate", this.arrState)
			// console.log("arrstate index", this.arrStateActiveIndex)
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

	_clearNotifications(){
		this.notificationSystem.clearNotifications()
	}

	_addNotification(message, title=null,  level='success', autoDismiss=5, position='tr', children=null){
		this.notificationSystem.addNotification({
			message,
			title,
			level,
			autoDismiss,
			position,
			children,
		})
	}

  render() {
		console.log("HomePage", this)
		this.open = this.props.animation.get('open')
		console.log('UI', this.props.ui)
    return (
		<div>
			<NotificationSystem ref="notificationSystem" />
			<Row divisions={6} debug={true}>
				<Column lg={2}>
					<Editor run={this.run.bind(this)} />
					<button onClick={() => {this.nextState()}}>NextState</button>
				</Column>
				<Column lg={4}>
					<Pipeline pipe_state={this.props.pipeState} />
					<Registers reg_state={this.props.regState} ui={this.props.ui} />
				</Column>
				<StateLine states={this.arrState} setState={(index) => this.setLineState(index)} activeIndex={this.arrStateActiveIndex} ui={this.props.ui} />
			</Row>
		</div>
    );
  }
}

HomePage.propTypes = {
	pipeState: React.PropTypes.array.isRequired,
	regState: React.PropTypes.object.isRequired,
	updateCpuState: React.PropTypes.func.isRequired,
	ui: React.PropTypes.object.isRequired,
}

const mapStateToProps = createStructuredSelector({
	baseState : baseHomeSelector,
	pipeState : pipeSelector,
	regState  : regSelector,
	ui        : uiSelector,
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
