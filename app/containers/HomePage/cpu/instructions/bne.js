import {
	FIRST_OPERAND,
  SECOND_OPERAND,
  THIRD_OPERAND
} from '../../constants'
import { dataHazzardOccur } from './hazards'
import * as ui_template from '../ui_templates'
import { regCheck, numberCheck } from './checkers'

/*
 * @param {String[]} params - array of instruction parameters
 * @return {Boolean} - tells if params are valid(true)
 */
export function checkParams(params, length){ // JMP {REG/LINE}
  // BEQ {REG}{REG}{LINE/REG}
  if(regCheck(params[FIRST_OPERAND]) && regCheck(params[SECOND_OPERAND])) {
    const destination = numberCheck(params[THIRD_OPERAND])
    if(destination !== false){ // LINE
      if(destination > length || destination <= 0)
        return `Wrong jump destination, cannot jump on line ${destination}`
      return true // LINE, ok
    }
    if(regCheck(params[THIRD_OPERAND]))
      return true
  }
	return false
}

export function fetch(instruction, registers, ui){
	ui.addTo(ui_template.fetch_template(instruction.instruction), 'state_line_msg')
}
export function decode(instruction, registers, ui){
	ui.addTo(ui_template.decode_template(instruction.instruction), 'state_line_msg')
}
export function execute(instruction, registers, ui, pipeline){
	const first_op = registers[instruction.params[FIRST_OPERAND]].value
	const second_op = registers[instruction.params[SECOND_OPERAND]].value
  const is_jumping = (first_op !== second_op)

  dataHazzardOccur(ui, registers,
  instruction.params[FIRST_OPERAND],
  instruction.params[SECOND_OPERAND])

  let dest = numberCheck(instruction.params[THIRD_OPERAND])
  if(is_jumping){
    if(!dest) { // REGISTER
      dataHazzardOccur(ui, registers, instruction.params[THIRD_OPERAND])
      dest = registers[instruction.params[FIRST_OPERAND]].value
    }
    ui.addTo(`${instruction.instruction} instruction has calculated that ${instruction.params[FIRST_OPERAND]}(${first_op}) is not equal with ${instruction.params[SECOND_OPERAND]}(${second_op}) so jump is going to be executed in next stage to  line ${dest}`, 'state_line_msg')
    pipeline.stacks.branch_stack.push(dest)
  }
  else { // condition of false
    ui.addTo(`${instruction.instruction} instruction has calculated that ${instruction.params[FIRST_OPERAND]}(${first_op}) is equal with ${instruction.params[SECOND_OPERAND]}(${second_op}) so jump is NOT going to be executed`, 'state_line_msg')
  }
}
export function memaccess(instruction, registers, ui, pipeline){
	const first_op = registers[instruction.params[FIRST_OPERAND]].value
	const second_op = registers[instruction.params[SECOND_OPERAND]].value
  const is_jumping = (first_op !== second_op)

  if(is_jumping){
    const dest = pipeline.stacks.branch_stack[0]
    ui.addTo(`${instruction.instruction} instruction will jump to ${dest} line`, 'state_line_msg')
  }
  else 
    ui.addTo(`${instruction.instruction} instruction won't jump, because branch condition was false`, 'state_line_msg')
}
export function writeback(instruction, registers, ui, pipeline){
	const first_op = registers[instruction.params[FIRST_OPERAND]].value
	const second_op = registers[instruction.params[SECOND_OPERAND]].value
  const is_jumping = (first_op !== second_op)

  if(is_jumping){
    const dest = pipeline.stacks.branch_stack.shift()
    registers.PC.value = dest
    ui.addTo(ui_template.memRegChange('PC'), 'reg_changes')
    ui.addTo(`${instruction.instruction} has jumped to line ${dest}, which PC register contains`, 'state_line_msg')
  }
  else
    ui.addTo(`${instruction.instruction} has just passed through writeback, because branch condition was false`, 'state_line_msg')
    
  return is_jumping
}

export default {
	checkParams,
	fetch,
	decode,
	execute,
	memaccess,
	writeback
}
