import React from 'react'
import _ from 'lodash'

import Header from '../SectionHeader/index'
import {
  Cell,
  Empty,
  Instruction,
  PipeContainer,
  PipeRow,
  Stage,
  StageShort,
} from './styles'

import HoverDiv from '../HoverDiv/index'

class Pipeline extends React.PureComponent { 
  
  isActive(row_index, cell_index, instruction){
    const lastindex = 4
    return ((row_index + cell_index === lastindex) && (typeof instruction === 'string') ? true : false)
  }

  shiftGen(position){
    let shifted = []
    for(let i=0; i<position; i++){
      shifted.push(<Empty key={i} />)
    }
    return shifted
  }

  hoverContent(instruction){
    if(typeof(instruction) === 'object'){
      return `${instruction.instruction} ${instruction.params.join(' ')}`
    }
    else{ // INITVAL of ENDVAL which is string
      return "No Instruction"
    }
  }

  render() {
    let stages = ["FETCH", "DECODE", "EXECUTE", "MEM ACCESS", "WRITEBACK"]
    let stages_short = ["F", "D", "E", "M", "W"] // use for small displays
    // generate shift divs base on index
    let pipe_state = this.props.pipe_state.toJS()
    // reverse pipestate in order to start showing instructions from bottom of pipeline not top
    _.reverse(pipe_state)
    pipe_state = pipe_state.map((instruction, row_index) => {
      let instruction_name
      if(typeof(instruction) === 'object') // else is INITVAL of ENDVAL which is string
        instruction_name = instruction.instruction
      else // no need to write ENDVAL and INITVAL values
        instruction_name = (<br />) 
      const shift = this.shiftGen(row_index)
      // content for hover div INSTURCTION and param
      const instruction_hover = this.hoverContent(instruction)
      // creation of each cell
      const cells = _.range(5).map((x, cell_index) => {
        // make proper borders on sides
        let position = " "
        if (cell_index === 0)
          position = "first"
        if (cell_index === 4)
          position = "last"
        // show active execution cell
        const activeIndex = this.isActive(row_index, cell_index, instruction_name)
        const animationOn = this.props.animationOn && activeIndex
        return (
          <Cell 
            activeIndex={activeIndex}
            animation={animationOn}
            key={cell_index}
            position={position} 
          >
            <Stage>{stages[cell_index]}</Stage>
            <StageShort>{stages_short[cell_index]}</StageShort>
            <Instruction>{instruction_name}</Instruction>
          </Cell>
        )
      })
      // wrap cells into row
      return (
        <PipeRow debug={true} key={row_index}>
          {shift}
          {cells}
          <HoverDiv>
            {instruction_hover}
          </HoverDiv>
        </PipeRow>
        )
    })
    return (
      <div>
        <Header 
          message="Pipeline" 
          size="150%"
        />
        <PipeContainer>
          {pipe_state}
        </PipeContainer>
      </div>
    )
  }
}

Pipeline.propTypes = {
 animationOn: React.PropTypes.bool.isRequired,
 pipe_state: React.PropTypes.object.isRequired,
}

export default Pipeline
