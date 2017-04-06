import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import { Row, Column } from 'hedron'

const Cell = styled(Column)`
   border: 1px solid;
   border-left: none;
   border-right: none;
   padding: 0;
   text-align: center;

   @media (max-width: 860px){
    width: 13%;
   };
`
const PipeRow = styled(Row)`
  margin-bottom: -1px;

  div:first-child {
    border-left: 1px solid;
  };
  div:last-child {
    border-right: 1px solid;
  };
`

const Stage = styled.p`
  margin:0;
  opacity: 0.6;
  font-size: small;

 @media (max-width: 600px){
  display: none;
 };
`

const StageShort = styled.p`
  margin:0;
  opacity: 0.6;
  font-size: small;
  display: none;
   
  @media (max-width: 600px){
    display: initial;
  };

`
const Instruction = styled.p`
  margin:0;
`

const PipeContainer = styled.div`
`

class Pipeline extends React.PureComponent { 
  render() {
    let stages = ["FETCH", "DECODE", "EXECUTE", "MEM ACCESS", "WRITEBACK"]
    let stages_short = ["F", "D", "E", "M", "W"]
    const pipe_state = this.props.pipe_state.map((instruction, index) => {
      if(typeof(instruction) === 'object') // else is INITVAL of ENDVAL which is string
        instruction = instruction.instruction
      const pipe_rest = _.range(4).map((x, index) => (
          <Cell lg={1} md={1} sm={1} xs={1} key={index}>
            <Stage>{stages[index+1]}</Stage>
            <StageShort>{stages_short[index+1]}</StageShort>
            <Instruction>{instruction}</Instruction>
          </Cell>
      ))
      return (
        <PipeRow debug={true} key={index}>
          <Cell 
            lg={1} lgShift={index} 
            md={1} mdShift={index}
            sm={1} smShift={index}
            xs={1} xsShift={index}
          >
            <Stage>{stages[0]}</Stage>
            <StageShort>{stages_short[0]}</StageShort>
            <Instruction>{instruction}</Instruction>
          </Cell>
          {pipe_rest}
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
