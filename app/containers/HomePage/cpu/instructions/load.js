import * as ui_template from '../ui_templates'
import { regCheck, memCheck, numberCheck } from './checkers'
import { 
  FIRST_OPERAND,
  SECOND_OPERAND,
} from '../../constants'

export function checkParams(params){
	// LOAD {REG}{MEM}
  // reg
	if(!regCheck(params[FIRST_OPERAND]))
		return false
  // mem
  const mem_index = numberCheck(params[SECOND_OPERAND])
  if(mem_index === false )
    return false
  if(!memCheck(mem_index))
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
	ui.addTo(`Execution of LOAD`, 'state_line_msg')
  // lock
	registers[instruction.params[FIRST_OPERAND]].lock = true
}
export function memaccess(instruction, registers, ui){
	ui.addTo(ui_template.memaccess_template(instruction.instruction, true), 'state_line_msg')
}
export function writeback(instruction, registers, ui, memory){
	const reg_name = registers[instruction.params[FIRST_OPERAND]]
  const mem_index = Number(instruction.params[SECOND_OPERAND])
  // assign 
	registers[instruction.params[FIRST_OPERAND]].value = memory[mem_index]
  // unlock
	registers[instruction.params[FIRST_OPERAND]].lock = false
  // log, ui
	ui.addTo(`LOAD has written ${memory[mem_index]} value from memory index of ${mem_index} into register ${reg_name}`, 'state_line_msg')
	ui.addTo(ui_template.memRegChange(instruction.params[FIRST_OPERAND]), 'reg_changes')
}

export default {
	checkParams,
	fetch,
	decode,
	execute,
	memaccess,
	writeback
}
