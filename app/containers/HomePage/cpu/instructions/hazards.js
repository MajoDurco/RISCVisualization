import React from 'react'
import Warn from 'material-ui/svg-icons/action/report-problem'

export function dataHazzardOccur(ui, registers, ...registers_check){
  let hazzard_registers = []
  registers_check.forEach(register => {
    if(registers[register].lock !== 0) 
      hazzard_registers.push(register)
  })
  if (hazzard_registers.length){
    hazzard_registers.forEach(register => {
      ui.addTo(
      <span>
        <Warn color="red" />
        {` Possible hazzard with register ${register} , check if any instruction is not changing register's value `}
        <Warn color="red" />
      </span>
      , 'state_line_msg')
    })
  }
}
