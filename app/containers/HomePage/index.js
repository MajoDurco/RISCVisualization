import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import NotificationSystem from 'react-notification-system'
import { Row, Column } from 'hedron'

import { 
  openMemoryDrawer,
  setStateLineIndex,
  updateCpuState,
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
} from './selectors'
import getInstructions from './parser'
import cpu from './cpu/cpu'

// components
import Editor from '../../components/Editor/index'
import ErrNotification from '../../components/ErrNotification/index'
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
    //instructions are OK
    this._clearNotifications()
    this._addNotification(null, "Run succesful")

    //init stateline to index 0
    this.props.setStateLineIndex(0)

    this.arrState = cpu(processed_instructions)
    this.props.updateCpuState(this.arrState[0])
    // this.arrState.forEach((state) => {
     // console.log(state.toJS())
    // })
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
    console.log("HomePage", this)
    this.open = this.props.animation.get('open')
    return (
    <div>
      <NotificationSystem ref="notificationSystem" />
      <div>
        <Row debug={true}>
          <ColumnNoPadding md={5} lg={3}>
            <Editor run={this.run.bind(this)} />
          </ColumnNoPadding>
          <Column md={7} lg={9}>
            <Row debug={true}>
              <Column>
                <Pipeline 
                  pipe_state={this.props.pipeState}
                  activeIndex={this.props.stateLineIndex}
                  animationOn={this.props.animationOn}
                />
              </Column>
            </Row>
            <Row debug={true}>
              <Column>
                <Registers 
                  reg_state={this.props.regState} 
                  ui={this.props.ui}
                  animationOn={this.props.animationOn}
                />
              </Column>
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
  pipeState: React.PropTypes.object.isRequired, // Immutable
  regState: React.PropTypes.object.isRequired,
  updateCpuState: React.PropTypes.func.isRequired,
  ui: React.PropTypes.object.isRequired,
}

const mapStateToProps = createStructuredSelector({
  animation      : animationSelector,
  animationOn    : animationOn,
  baseState      : baseHomeSelector,
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
