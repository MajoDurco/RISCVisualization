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
  render() {
    let stages = ["FETCH", "DECODE", "EXECUTE", "MEM ACCESS", "WRITEBACK"]
    let stages_short = ["F", "D", "E", "M", "W"] // use for small displays

    // generate shift divs base on index
    const shiftGen = (position) => {
      let shifted = []
      for(let i=0; i<position; i++){
        shifted.push(<Empty key={i} />)
      }
      return shifted
    }

    const pipe_state = this.props.pipe_state.map((instruction, index) => {
      if(typeof(instruction) === 'object') // else is INITVAL of ENDVAL which is string
        instruction = instruction.instruction
      const shift = shiftGen(index)
      // creation of each cell
      const pipe = _.range(5).map((x, index) => {
      let position = " "
      if (index === 0)
        position = "first"
      if (index === 4)
        position = "last"
      return (
        <Cell position={position} key={index}>
          <Stage>{stages[index]}</Stage>
          <StageShort>{stages_short[index]}</StageShort>
          <Instruction>{instruction}</Instruction>
        </Cell>
      )
      })
      return (
        <PipeRow debug={true} key={index}>
          {shift}
          {pipe}
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
 pipe_state: React.PropTypes.array.isRequired
}

export default Pipeline
