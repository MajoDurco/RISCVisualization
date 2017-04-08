import React from 'react'
import _ from 'lodash'

import {
  Cell,
  Empty,
  Instruction,
  PipeContainer,
  PipeRow,
  Stage,
  StageShort,
} from './styles'

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

  render() {
    let stages = ["FETCH", "DECODE", "EXECUTE", "MEM ACCESS", "WRITEBACK"]
    let stages_short = ["F", "D", "E", "M", "W"] // use for small displays
    // generate shift divs base on index
    // reverse pipestate in order to start showing instructions from bottom of pipeline not top
    let pipe_state = _.reverse(this.props.pipe_state)
    pipe_state = pipe_state.map((instruction, row_index) => {
      if(typeof(instruction) === 'object') // else is INITVAL of ENDVAL which is string
        instruction = instruction.instruction
      else // no need to write ENDVAL and INITVAL values
        instruction = (<br />) 
      const shift = this.shiftGen(row_index)
      // creation of each cell
      const cells = _.range(5).map((x, cell_index) => {
        // make proper borders on sides
        let position = " "
        if (cell_index === 0)
          position = "first"
        if (cell_index === 4)
          position = "last"
        // show active execution cell
        const activeIndex = this.isActive(row_index, cell_index, instruction)
        return (
          <Cell 
            activeIndex={activeIndex}
            animation={activeIndex}
            key={cell_index}
            position={position} 
          >
            <Stage>{stages[cell_index]}</Stage>
            <StageShort>{stages_short[cell_index]}</StageShort>
            <Instruction>{instruction}</Instruction>
          </Cell>
        )
      })
      // wrap cells into row
      return (
        <PipeRow debug={true} key={row_index}>
          {shift}
          {cells}
        </PipeRow>
        )
    })
    return (
      <PipeContainer>
        {pipe_state}
      </PipeContainer>
    )
  }
}

Pipeline.propTypes = {
 pipe_state: React.PropTypes.array.isRequired,
 activeIndex: React.PropTypes.number
}

export default Pipeline
