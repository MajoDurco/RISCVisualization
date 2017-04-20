import {
	FIRST_OPERAND,
} from '../../constants'
import { dataHazzardOccur } from './hazards'
import * as ui_template from '../ui_templates'
import { regCheck, numberCheck } from './checkers'

/*
 * @param {String[]} params - array of instruction parameters
 * @return {Boolean} - tells if params are valid(true)
 */
export function checkParams(params, length){
	// JMP {REG/LINE}
  const first_op = numberCheck(params[FIRST_OPERAND])
  if(first_op !== false){ // LINE
    if(first_op > length || first_op <= 0) {
      return `Wrong jump destination, cannot jump on line ${first_op}`
    }
    return true // LINE, ok
  }
  if(regCheck(params[FIRST_OPERAND]))
    return true
	return false
}

export function fetch(instruction, registers, ui){
	ui.addTo(ui_template.fetch_template(instruction.instruction), 'state_line_msg')
}
export function decode(instruction, registers, ui){
	ui.addTo(ui_template.decode_template(instruction.instruction), 'state_line_msg')
}
export function execute(instruction, registers, ui, pipeline){
  let dest = numberCheck(instruction.params[FIRST_OPERAND])
  if(dest !== false) { // LINE
    ui.addTo(`${instruction.instruction} instruction has calculated destination to be the line ${dest} `, 'state_line_msg')
  }
  else { // REGISTER
    dataHazzardOccur(ui, registers, instruction.params[FIRST_OPERAND])
    dest = registers[instruction.params[FIRST_OPERAND]].value
    ui.addTo(`${instruction.instruction} instruction has calculated destination from ${instruction.params[FIRST_OPERAND]} register to be the line ${dest}`, 'state_line_msg')
  } 
  pipeline.stacks.jump_stack.push(dest)
}
export function memaccess(instruction, registers, ui, pipeline){
  const dest = pipeline.stacks.jump_stack[0]
	ui.addTo(`${instruction.instruction} instruction will jump to ${dest} line`, 'state_line_msg')
}
export function writeback(instruction, registers, ui, pipeline){
  const dest = pipeline.stacks.jump_stack.shift()
  registers.PC.value = dest
	ui.addTo(ui_template.memRegChange('PC'), 'reg_changes')
  ui.addTo(`${instruction.instruction} has jumped to line ${dest}, which PC register contains`, 'state_line_msg')
}

export default {
	checkParams,
	fetch,
	decode,
	execute,
	memaccess,
	writeback
}
