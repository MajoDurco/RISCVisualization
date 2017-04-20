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
  // lock destination register 
	registers[instruction.params[FIRST_OPERAND]].lock += 1

	ui.addTo(`LOAD instruction has computed source memory index address`, 'state_line_msg')
}
export function memaccess(instruction, registers, ui, pipeline, memory){
  const mem_index = Number(instruction.params[SECOND_OPERAND])

  pipeline.stacks.mem_access_stack.push(memory[mem_index]) // push memory value into stack
	ui.addTo(`LOAD has loaded ${memory[mem_index]} value from memory index ${mem_index}`, 'state_line_msg')
}
export function writeback(instruction, registers, ui, pipeline, memory){
  const mem_index = Number(instruction.params[SECOND_OPERAND])
	const reg_name = instruction.params[FIRST_OPERAND]
  const result = pipeline.stacks.mem_access_stack.shift()
  // assign 
	registers[instruction.params[FIRST_OPERAND]].value = result
  // unlock destination register 
	registers[instruction.params[FIRST_OPERAND]].lock -= 1
  // log, ui
	ui.addTo(`LOAD has written ${memory[mem_index]} value into the ${reg_name} register`, 'state_line_msg')
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
