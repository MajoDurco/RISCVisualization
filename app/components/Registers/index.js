import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { Row, Column } from 'hedron'

import NamedDiv from '../NamedDiv/index'
import Header from '../SectionHeader/index'

const RegContext = styled.div`
  // background-color: ${props => props.change ? `lightblue` : `none`};
`

class Registers extends React.Component { // eslint-disable-line react/prefer-stateless-function

  isChanged(reg_name){
    const found = this.props.ui.reg_changes.find((reg) => reg.name === reg_name)
    // if founded
    return found ? true : false 
  }

  render() {
    const reg_list = _.toPairs(this.props.reg_state) // [[reg<String>, {value:Number, lock:Boolean}], [...],..]
    const registers = reg_list.map((register) => {
    const name = register[0]
    const value = register[1].value
    const changed = this.isChanged(name)
    const animation = changed && this.props.animationOn
    return (
    <Column lg={1} md={2} sm={2} xs={4} key={name}>
      <NamedDiv 
        header={name}
        animation={animation}
        changed={changed} 
      >
        <RegContext>
          <span>{value}</span>
        </RegContext>
      </NamedDiv>
    </Column>
    )
  })
  return (
    <div>
      <Header 
        message="Registers" 
        size="150%" 
      />
      <Row debug={true}>
        {registers}
      </Row>
    </div>
  );
  }
}

Registers.propTypes = {
  reg_state : React.PropTypes.object.isRequired,
  ui          : React.PropTypes.object.isRequired,
  animationOn : React.PropTypes.bool
}

export default Registers;
