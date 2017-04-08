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
export function execute(instruction, registers, ui){
  // checkt for lock if param is register
  if(numberCheck(instruction.params[FIRST_OPERAND]) === false) // REGISTER
    dataHazzardOccur(ui, registers[instruction.params[FIRST_OPERAND]])
	// log
	ui.addTo(`Jump destination computed`, 'state_line_msg')
}
export function memaccess(instruction, registers, ui){
	ui.addTo(ui_template.memaccess_template(instruction.instruction, false), 'state_line_msg')
}
// TODO check if jump execution is here and also where destination is checked
export function writeback(instruction, registers, ui){
  let dest = numberCheck(instruction.params[FIRST_OPERAND])
  if(dest !== false) { // LINE
    registers.PC.value = dest
    ui.addTo(`Jumped to ${dest} line, PC changed accordingly`, 'state_line_msg')
  }
  else { // REGISTER
    dest = registers[instruction.params[FIRST_OPERAND]].value
    registers.PC.value = dest
    ui.addTo(`Jumped to ${dest} line from ${instruction.params[FIRST_OPERAND]} register, PC changed accordingly`, 'state_line_msg')
  } 
	ui.addTo(ui_template.memRegChange('PC'), 'reg_changes')
}

export default {
	checkParams,
	fetch,
	decode,
	execute,
	memaccess,
	writeback
}
