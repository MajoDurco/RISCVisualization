import React from 'react'
import { connect } from 'react-redux'
//import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'

//import messages from './messages'
import { updatePipeline } from './actions'
import { baseState, pipeState } from './selectors'
import getInstructions from './parser'
import cpu from './cpu/cpu'
// components
import { Row, Column } from 'hedron'
import Editor from '../../components/Editor/index'
import Pipeline from '../../components/Pipeline/index'

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
	constructor(props){
		super(props)
		this.arrState = null
		this.arrStateActiveIndex = null
	}
	run(text){
		try{
			let processed_instructons = getInstructions(text)
			this.arrState = cpu(processed_instructons)
			this.arrStateActiveIndex = 0
			this.props.updatePipeline(this.arrState[this.arrStateActiveIndex])
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
			this.props.updatePipeline(this.arrState[this.arrStateActiveIndex])
		}
	}

  render() {
		console.log("HomePage props", this.props)
		const pipeState = this.props.pipeState.toJS()
    return (
			<Row divisions={6} debug={true}>
				<Column lg={2}>
					<Editor run={this.run.bind(this)} />
					<button onClick={() => {this.nextState()}}>NextState</button>
				</Column>
				<Column lg={4}>
					<Pipeline pipe_state={pipeState}/>
				</Column>
			</Row>
    );
  }
}

const mapStateToProps = createStructuredSelector({
	baseState: baseState,
	pipeState: pipeState
})

function mapDispatchToProps(dispatch){
	return {
		updatePipeline: (pipe_state) => dispatch(updatePipeline(pipe_state)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
