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
export function execute(instruction, registers, ui){
  dataHazzardOccur(ui,
  registers[instruction.params[FIRST_OPERAND]],
  registers[instruction.params[SECOND_OPERAND]])
  if(numberCheck(instruction.params[THIRD_OPERAND]) === false) // destiation register
    dataHazzardOccur(ui, registers[instruction.params[FIRST_OPERAND]])
	// log
	ui.addTo(`Jump destination computed`, 'state_line_msg')
}
export function memaccess(instruction, registers, ui){
	ui.addTo(ui_template.memaccess_template(instruction.instruction, false), 'state_line_msg')
}
// TODO check if jump execution is here and also where destination is checked
export function writeback(instruction, registers, ui){
	const first_op = registers[instruction.params[FIRST_OPERAND]].value
	const second_op = registers[instruction.params[SECOND_OPERAND]].value
  const is_jumping = (first_op === second_op)

  let dest = numberCheck(instruction.params[THIRD_OPERAND])
  if(dest !== false) { // LINE
    if(is_jumping){
      registers.PC.value = dest
      ui.addTo(`Jumped to ${dest} line, PC changed accordingly`, 'state_line_msg')
      ui.addTo(ui_template.memRegChange('PC'), 'reg_changes')
      return true
    }
    else {
      ui.addTo(`${first_op} is not equal ${second_op}, jump is not executed`, 'state_line_msg')
      return false
    }
  }
  else { // REGISTER
    if(is_jumping) {
      dest = registers[instruction.params[FIRST_OPERAND]].value
      registers.PC.value = dest
      ui.addTo(`Jumped to ${dest} line from ${instruction.params[FIRST_OPERAND]} register, PC changed accordingly`, 'state_line_msg')
      ui.addTo(ui_template.memRegChange('PC'), 'reg_changes')
      return true
    }
    else {
      ui.addTo(`${first_op} is not equal ${second_op}, jump is not executed`, 'state_line_msg')
      return false
    }
  } 
}

export default {
	checkParams,
	fetch,
	decode,
	execute,
	memaccess,
	writeback
}
