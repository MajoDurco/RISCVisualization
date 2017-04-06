import { MEM_LENGTH } from '../../constants'
import * as ui_template from '../ui_templates'

/*
 * @params {String[]} params - array of instruction parameters, length is already
 * checked in getInstrucions() in HomePage
 * @return {Boolean} - tells if params are valid(true)
 */
export function checkParams(params){
  // mem index
  const mem_index = Number(params[0])
  const value = Number(params[1])
  if(isNaN(mem_index)) {
    console.log("mem index wrong")
    return false
  }
  if( ! (mem_index >= 0 && mem_index < MEM_LENGTH)) {
    console.log("mem index out of range")
    return false
  }
  // value
  if(isNaN(value)){
    console.log("value not a number")
    return false
  }
  return true
}

export function fetch(instruction, registers, ui){
  ui.addTo(ui_template.fetch_template(instruction.instruction), 'state_line_msg')
}
export function decode(instruction, registers, ui){
  ui.addTo(ui_template.decode_template(instruction.instruction), 'state_line_msg')
}
export function execute(instruction, registers, ui){
  ui.addTo('mov executed', 'state_line_msg')
}
export function memaccess(instruction, registers, ui){
  ui.addTo('MOV memaccess', 'state_line_msg')
}
export function writeback(instruction, registers, ui, memory){
  const mem_index = Number(instruction.params[0])
  const value = Number(instruction.params[1])
  memory[mem_index] = value
  ui.addTo(`MOV has written ${value} into memory index ${mem_index}`, 'state_line_msg')
}

export default {
  checkParams,
  fetch,
  decode,
  execute,
  memaccess,
  writeback
}
