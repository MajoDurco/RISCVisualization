import {
	REGISTER_REGEX,
	DATA_REGS,
	FIRST_OPERAND,
	SECOND_OPERAND,
	THIRD_OPERAND,
} from '../../constants'
import { dataHazzardOccur } from './hazards'
import * as ui_template from '../ui_templates'

/*
 * @param {String[]} params - array of instruction parameters
 * @return {Boolean} - tells if params are valid(true)
 */
export function checkParams(params){
	if(params.every((param) => {
			const match = param.match(REGISTER_REGEX)
			if(match != null && Number(match[1]) <= DATA_REGS) // match[1] is number after R, R11 -> 11
				return true
			else
				return false
		})
	)
		return true
	else
		return false
}

export function fetch(instruction, registers, ui){
	ui.addTo(ui_template.fetch_template(instruction.instruction), 'state_line_msg')
}
export function decode(instruction, registers, ui){
	ui.addTo(ui_template.decode_template(instruction.instruction), 'state_line_msg')
}
export function execute(instruction, registers, ui){
	ui.addTo(ui_template.execute_template(instruction), 'state_line_msg')
	// checking both operators for lock
	dataHazzardOccur(ui,
	registers[instruction.params[FIRST_OPERAND]],
	registers[instruction.params[SECOND_OPERAND]])
	// locking destination
	registers[instruction.params[FIRST_OPERAND]].lock = true
}
export function memaccess(instruction, registers, ui){
	ui.addTo(ui_template.memaccess_template(instruction.instruction, false), 'state_line_msg')
}
export function writeback(instruction, registers, ui){
	const first_reg = registers[instruction.params[SECOND_OPERAND]].value
	const second_reg = registers[instruction.params[THIRD_OPERAND]].value
	registers[instruction.params[FIRST_OPERAND]].value = first_reg + second_reg
	// unlock destination
	registers[instruction.params[FIRST_OPERAND]].lock = false
	//log + ui
	ui.addTo(ui_template.writeback_template(
	instruction.instruction,
	registers[instruction.params[FIRST_OPERAND]].value,
	instruction.params[THIRD_OPERAND]
	), 'state_line_msg')
	// register change
	ui.addTo(ui_template.registerChange(instruction.params[FIRST_OPERAND]), 'reg_changes')
}

export default {
	checkParams,
	fetch,
	decode,
	execute,
	memaccess,
	writeback
}
