import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import NotificationSystem from 'react-notification-system'
import { Row, Column } from 'hedron'

import { 
  openMemoryDrawer,
  setStateLineIndex,
  updateCpuState,
  codeSampleChanged,
} from './actions' 

import { 
  animationOn,
  animationSelector,
  baseHomeSelector,
  memDrawerOpenSelector,
  memorySelector,
  pipeSelector,
  regSelector,
  stateLineIndexSelector,
  uiSelector,
  codeSampleSelector,
} from './selectors'
import getInstructions from './parser'
import cpu from './cpu/cpu'
import { JUMP_TRESHOLD } from './constants'

// components
import Editor from '../../components/Editor/index'
import ErrNotification from '../../components/ErrNotification/index'
import JumpTresholdExceeded from '../../components/JumpTresholdExceeded'
import Memory from '../../components/Memory/index'
import MemoryState from '../../components/MemoryState/index'
import Pipeline from '../../components/Pipeline/index'
import Registers from '../../components/Registers/index'
import StateLine from '../../components/StateLine/index'
import ColumnNoPadding from '../../components/ColumnNoPadding/index'

export class HomePage extends React.PureComponent {

  constructor(props){
    super(props)
    this.arrState = null // array of immutable states of cpu
    // this.arrStateActiveIndex = null 
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
    //init stateline to index 0
    this.props.setStateLineIndex(0)

    this.arrState = cpu(processed_instructions)
    if(this.arrState === null){ // infinite jump loop
      this._addNotification(null, 'Error', 'error', 15, 'tc', (
        <JumpTresholdExceeded 
          message={`Code exceeded jump threshold ${JUMP_TRESHOLD} jumps!`} 
          text={"Code execution has been stopped, because infinite jump loop can occur!"}
        />
      )) 
      this.props.updateCpuState(this.arrState[0])
      return
    }
    //run successful
    this._clearNotifications()
    this._addNotification(null, "Run succesful")

    this.props.updateCpuState(this.arrState[0])
  }

  nextState(){
    let actual_index = this.props.stateLineIndex
    actual_index++
    if( !(actual_index >= this.arrState.length)) {
      this.props.setStateLineIndex(actual_index)
      this.props.updateCpuState(this.arrState[actual_index])
    }
  }

  prevState(){
    let actual_index = this.props.stateLineIndex
    actual_index--
    if( !(actual_index < 0)){
      this.props.setStateLineIndex(actual_index)
      this.props.updateCpuState(this.arrState[actual_index])
    }
  }

  setLineState(index){
    this.props.setStateLineIndex(index)
    this.props.updateCpuState(this.arrState[index])
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
    return (
    <div>
      <NotificationSystem ref="notificationSystem" />
      <div>
        <Row>
          <ColumnNoPadding xs={11} sm={11} md={5} lg={3}>
            <Editor 
              run={this.run.bind(this)} 
              code_sample={this.props.codeSample}
              code_sample_change={(value) => this.props.codeSampleChanged(value)}
            />
          </ColumnNoPadding>
          <Column xs={12} sm={12} md={7} lg={9}>
            <Row>
              <ColumnNoPadding>
                <Pipeline 
                  pipe_state={this.props.pipeState}
                  activeIndex={this.props.stateLineIndex}
                  animationOn={this.props.animationOn}
                />
              </ColumnNoPadding>
            </Row>
            <Row>
              <ColumnNoPadding>
                <Registers 
                  reg_state={this.props.regState} 
                  ui={this.props.ui}
                  animationOn={this.props.animationOn}
                />
              </ColumnNoPadding>
            </Row>
          </Column>
        </Row>
        <Row>
          <Column>
            <StateLine states={this.arrState} 
              setState={(index) => this.setLineState(index)} 
              activeIndex={this.props.stateLineIndex} 
              ui={this.props.ui}
              next={() => this.nextState()}
              prev={() => this.prevState()}
            />
          </Column>
        </Row>
        <Memory 
          isOpen={this.props.memDrawerOpen} 
          setOpen={(open) => {this.props.openMemoryDrawer(open)}}
        >
          <MemoryState 
            memory={this.props.memory}
            ui={this.props.ui}
            animationOn={this.props.animationOn}
          />
        </Memory>
      </div>
    </div>
    );
  }
}

HomePage.propTypes = {
  animationOn: React.PropTypes.bool,
  animation: React.PropTypes.object,
  baseState: React.PropTypes.object,
  codeSampleChanged: React.PropTypes.func,
  codeSample: React.PropTypes.string,
  memDrawerOpen: React.PropTypes.bool,
  memory: React.PropTypes.array,
  openMemoryDrawer: React.PropTypes.func,
  pipeState: React.PropTypes.object.isRequired, // Immutable
  regState: React.PropTypes.object.isRequired,
  setStateLineIndex: React.PropTypes.func,
  stateLineIndex: React.PropTypes.number,
  ui: React.PropTypes.object.isRequired,
  updateCpuState: React.PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  animation      : animationSelector,
  animationOn    : animationOn,
  baseState      : baseHomeSelector,
  codeSample     : codeSampleSelector,
  memDrawerOpen  : memDrawerOpenSelector,
  memory         : memorySelector,
  pipeState      : pipeSelector,
  regState       : regSelector,
  stateLineIndex : stateLineIndexSelector,
  ui             : uiSelector,
})

function mapDispatchToProps(dispatch){
  return {
    openMemoryDrawer: (open)    => dispatch(openMemoryDrawer(open)),
    setStateLineIndex: (index)  => dispatch(setStateLineIndex(index)),
    updateCpuState: (cpu_state) => dispatch(updateCpuState(cpu_state)),
    codeSampleChanged: (value)  => dispatch(codeSampleChanged(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
