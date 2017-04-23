import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { Row } from 'hedron'

import NamedDiv from '../NamedDiv/index'
import Header from '../SectionHeader/index'
import ColumnNoPadding from '../ColumnNoPadding/index'
import HoverDiv from '../HoverDiv/index'

const RegDiv = styled.div`
  cursor: ${props => props.hover ? 'pointer' : 'default'};
  margin-right: 15px;

  & > div:last-child {
    display: none; 
  }

  &:hover > div:last-child {
    display: block;
    height: auto;
    position: absolute;
    width: auto;
    z-index: 2;
  }
`

const ConversionHeader = styled.h5`
  margin: 0;
`
const ConversionValue = styled.span`
  margin-left: 10px;
`

class Registers extends React.Component { // eslint-disable-line react/prefer-stateless-function

  isChanged(reg_name){
    const found = this.props.ui.reg_changes.find((reg) => reg.name === reg_name)
    // if founded
    return found ? true : false 
  }

  createRegister(register, hover){
      const name = register[0]
      const value = register[1].value
      const changed = this.isChanged(name)
      const animation = changed && this.props.animationOn
      return (
      <ColumnNoPadding lg={1} md={2} sm={2} xs={4} key={name}>
        <RegDiv hover={hover}>
          <NamedDiv
            header={name}
            animation={animation}
            changed={changed} 
          >
            <div>
              <span>{value}</span>
            </div>
          </NamedDiv>
          {hover 
            ? <HoverDiv>
                <ConversionHeader>Binary:</ConversionHeader>
                <ConversionValue>{value.toString(2)}</ConversionValue>
                <ConversionHeader>Hex:</ConversionHeader>
                <ConversionValue>{value.toString(16)}</ConversionValue>
              </HoverDiv>
            : <span />
          }
        </RegDiv>
      </ColumnNoPadding>
      )
  }

  render() {
    // [[reg<String>, {value:Number, lock:Boolean}], [...],..]
    const reg_list = _.sortBy(_.toPairs(this.props.reg_state), reg => reg[1].order)
      .filter(reg => reg[0] !== "PC")
    const PC = this.createRegister(["PC", this.props.reg_state.PC], false)
    const registers = reg_list.map((element) => this.createRegister(element, true))

  return (
    <div>
      <Header 
        message="Registers" 
        size="150%" 
      />
      <Row>
        {PC}
      </Row>
      <Header 
        message="Data registers" 
        size="100%" 
      />
      <Row>
        {registers}
      </Row>
    </div>
  )}
}

Registers.propTypes = {
  reg_state : React.PropTypes.object.isRequired,
  ui          : React.PropTypes.object.isRequired,
  animationOn : React.PropTypes.bool
}

export default Registers
