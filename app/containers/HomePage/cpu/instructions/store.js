import * as ui_template from '../ui_templates'
import { dataHazzardOccur } from './hazards'
import { regCheck, memCheck, numberCheck } from './checkers'
import { 
  FIRST_OPERAND,
  SECOND_OPERAND,
} from '../../constants'

export function checkParams(params){
	// STORE {MEM}{REG}
  // mem
  const mem_index = numberCheck(params[FIRST_OPERAND])
  if(mem_index === false )
    return false
  if(!memCheck(mem_index))
    return false
  // reg
	if(!regCheck(params[SECOND_OPERAND]))
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
	dataHazzardOccur(ui, registers[instruction.params[SECOND_OPERAND]])
	ui.addTo(`Execution of STORE`, 'state_line_msg')
}
export function memaccess(instruction, registers, ui){
	ui.addTo(ui_template.memaccess_template(instruction.instruction, true), 'state_line_msg')
}
export function writeback(instruction, registers, ui, memory){
  const mem_index = Number(instruction.params[FIRST_OPERAND])
	const reg_name = registers[instruction.params[SECOND_OPERAND]]
  const reg_value = reg_name.value
  // assign 
  memory[mem_index] = reg_value
  // log, ui
	ui.addTo(`STORE has written ${reg_value} from ${reg_name} into memory index of ${mem_index}`, 'state_line_msg')
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
