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
export function execute(instruction, registers, ui, pipeline){
	const reg_name = registers[instruction.params[SECOND_OPERAND]]
  const reg_value = reg_name.value

  pipeline.stacks.mem_access_stack.push(reg_value) // push result into stack
	dataHazzardOccur(ui, registers, instruction.params[SECOND_OPERAND])
	ui.addTo(`STORE instruction has got value from the ${instruction.params[SECOND_OPERAND]} register`, 'state_line_msg')
}
export function memaccess(instruction, registers, ui, pipeline, memory){
	const reg_name = instruction.params[SECOND_OPERAND]
  const mem_index = Number(instruction.params[FIRST_OPERAND])
  const result = pipeline.stacks.mem_access_stack.shift()
  memory[mem_index] = result

	ui.addTo(`STORE instruction has written ${result} from the ${reg_name} register into memory index ${mem_index}`, 'state_line_msg')
  ui.addTo(ui_template.memRegChange(mem_index), 'mem_changes')
}
export function writeback(instruction, registers, ui){
	ui.addTo(`STORE instruction has just passed through writeback stage`, 'state_line_msg')
}

export default {
	checkParams,
	fetch,
	decode,
	execute,
	memaccess,
	writeback
}
