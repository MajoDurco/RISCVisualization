import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { Row, Column } from 'hedron'

import NamedDiv from '../NamedDiv/index'

const RegContext = styled.div`
  background-color: ${props => props.change ? `lightblue` : `none`};
  display: inline-block;
`

class Registers extends React.Component { // eslint-disable-line react/prefer-stateless-function

  isChanged(reg_name){
    const found = this.props.ui.reg_changes.find((reg) => reg.name === reg_name)
    return found ? true : false
  }

  render() {
    const reg_list = _.toPairs(this.props.reg_state)
    // [[reg<String>, {value:Number, lock:Boolean}], [...],..]
    const registers = reg_list.map((register) => {
      const name = register[0]
      const value = register[1].value
      const changed = this.isChanged(name)
      return (
      <Column lg={1} md={2} sm={2} xs={4} key={name}>
        <NamedDiv header={name} >
          <RegContext change={changed}>
            <span>{value}</span>
          </RegContext>
        </NamedDiv>
      </Column>
      )
    })
    return (
      <Row debug={true}>
        {registers}
      </Row>
    );
  }
}

Registers.propTypes = {
  reg_state : React.PropTypes.object.isRequired,
  ui        : React.PropTypes.object.isRequired
};

export default Registers;
