import * as ui_template from '../ui_templates'
import { 
  FIRST_OPERAND,
  SECOND_OPERAND,
} from '../../constants'

import { memCheck, numberCheck } from './checkers'
/*
 * @params {String[]} params - array of instruction parameters, length is already
 * checked in getInstrucions() in HomePage
 * @return {Boolean} - tells if params are valid(true)
 */
export function checkParams(params){
  // mem index
  const mem_index = numberCheck(params[FIRST_OPERAND])
  if(mem_index === false )
    return false
  if(!memCheck(mem_index))
    return false
  // value
  if(numberCheck(params[SECOND_OPERAND]) === false)
    return false
  return true
}

export function fetch(instruction, registers, ui){
  ui.addTo(ui_template.fetch_template(instruction.instruction), 'state_line_msg')
}
export function decode(instruction, registers, ui){
  ui.addTo(ui_template.decode_template(instruction.instruction), 'state_line_msg')
}
export function execute(instruction, registers, ui){
  ui.addTo('MOV instruction has passed through exectuion stage', 'state_line_msg')
}
export function memaccess(instruction, registers, ui, pipeline, memory){
  const mem_index = Number(instruction.params[FIRST_OPERAND])
  const value = Number(instruction.params[SECOND_OPERAND])
  memory[mem_index] = value
  ui.addTo(`MOV instruction has written ${value} into memory index ${mem_index}`, 'state_line_msg')
  ui.addTo(ui_template.memRegChange(mem_index), 'mem_changes')
}
export function writeback(instruction, registers, ui){
  const mem_index = Number(instruction.params[FIRST_OPERAND])
  ui.addTo(`MOV instruction has just passed through writeback stage`, 'state_line_msg')
  ui.addTo(ui_template.memRegChange(mem_index), 'mem_changes')
}

export default {
  checkParams,
  fetch,
  decode,
  execute,
  memaccess,
  writeback
}
