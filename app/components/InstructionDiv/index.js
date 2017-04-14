import React from 'react'
import styled from 'styled-components'
import Info from 'material-ui/svg-icons/action/info'
import Divider from 'material-ui/Divider'

import Bubble from '../Bubble/index'

const LOW_RESOLUTION = '460px'

const InstructionContainer = styled.div`
  cursor: pointer;
  margin-top: 20px;
  position: relative;
  span:hover ~ div {
    display: block;
  }
  svg:hover ~ div {
    display: block;
  }
`
const HidenDiv = styled.div`
  display: none;
  position: absolute;
  right: 0;
  z-index: 5;
`
const InstructionsContainer = styled.div`
  font-size: 90%;
  font-weight: bold;

  @media (max-width: ${LOW_RESOLUTION}){
    font-size: 70%;
  }
`

const One = styled.span`
  color: #e0262c;
`

const Two = styled.span`
  color: #0ea513;
`

const Three = styled.span`
  color: #0f2bdd;
`

class InstructionDiv extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <InstructionContainer>
        <span>Instructions</span>
        <Info />
        <HidenDiv>
          <Bubble width={"450px"} height={"500px"} left={380}>
            <InstructionsContainer>
              <b>ADD</b> <One>REG1</One> <Two>REG2</Two> <Three>REG3</Three> | <One>REG1</One> = <Two>REG2</Two> + <Three>REG3</Three><br />
              <b>SUB</b> <One>REG1</One> <Two>REG2</Two> <Three>REG3</Three> | <One>REG1</One> = <Two>REG2</Two> - <Three>REG3</Three><br />
              <Divider />
              <b>AND</b> <One>REG1</One> <Two>REG2</Two> <Three>REG3</Three> | <One>REG1</One> = <Two>REG2</Two> AND <Three>REG3</Three><br />
              <b>OR</b> <One>REG1</One> <Two>REG2</Two> <Three>REG3</Three> | <One>REG1</One> = <Two>REG2</Two> OR <Three>REG3</Three><br />
              <b>NOR</b> <One>REG1</One> <Two>REG2</Two> <Three>REG3</Three> | <One>REG1</One> = <Two>REG2</Two> NOR <Three>REG3</Three><br />
              <b>XOR</b> <One>REG1</One> <Two>REG2</Two> <Three>REG3</Three> | <One>REG1</One> = <Two>REG2</Two> XOR <Three>REG3</Three><br />
              <Divider />
              <b>JMP</b> <One>REG1/LINE</One> |  => <One>REG1/LINE</One><br />
              <b>BEQ</b> <One>REG1</One> <Two>REG2</Two> <Three>REG3/LINE</Three> | if <One>REG1</One> == <Two>REG2</Two>=><Three>REG3/LINE</Three><br />
              <b>BNE</b> <One>REG1</One> <Two>REG2</Two> <Three>REG3/LINE</Three> | if <One>REG1</One> != <Two>REG2</Two>=><Three>REG3/LINE</Three><br />
              <b>BGT</b> <One>REG1</One> <Two>REG2</Two> <Three>REG3/LINE</Three> | if <One>REG1</One> > <Two>REG2</Two>=><Three>REG3/LINE</Three><br />
              <b>BLT</b> <One>REG1</One> <Two>REG2</Two> <Three>REG3/LINE</Three> | if <One>REG1</One> {"<"} <Two>REG2</Two>=><Three>REG3/LINE</Three><br />
              <Divider />
              <b>LOAD</b> <One>REG1</One> <Two>MEM-INDEX</Two> | <One>REG1</One> = <Two>MEM-INDEX</Two><br />
              <b>STORE</b> <One>MEM-INDEX</One> <Two>REG1</Two> | <One>MEM-INDEX</One> = <Two>REG1</Two><br />
              <Divider />
              <b>SHIFTL</b> <One>REG1</One> <Two>REG2</Two> <Three>REG3</Three> | <One>REG1</One> = <Two>REG2</Two> {"<<"} <Three>REG3</Three><br />
              <b>SHIFTR</b> <One>REG1</One> <Two>REG2</Two> <Three>REG3</Three> | <One>REG1</One> = <Two>REG2</Two> >> <Three>REG3</Three><br />
              <Divider />
              <b>NOP</b><br />
              <Divider />
              <b>MOV</b> <One>MEM-INDEX</One> <Two>NUMBER</Two> | <One>MEM-INDEX</One> = <Two>NUMBER</Two><br />
            </InstructionsContainer>
          </Bubble>
        </HidenDiv>
      </InstructionContainer>
    );
  }
}

InstructionDiv.propTypes = {

};

export default InstructionDiv;
