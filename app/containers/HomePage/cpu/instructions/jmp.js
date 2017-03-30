import {
	FIRST_OPERAND,
} from '../../constants'
import * as ui_template from '../ui_templates'
/*
 * @param {String[]} params - array of instruction parameters
 * @return {Boolean} - tells if params are valid(true)
 */
export function checkParams(params){
	// TODO registers
	// lines are checked in memaccess with exception
	return true
}

export function fetch(instruction, registers, ui){
	ui.addTo(ui_template.fetch_template(instruction.instruction), 'state_line_msg')
}
export function decode(instruction, registers, ui){
	ui.addTo(ui_template.decode_template(instruction.instruction), 'state_line_msg')
}
export function execute(instruction, registers, ui){
	// checking both operators for lock
	// dataHazzardOccur(ui, registers[instruction.params[FIRST_OPERAND]])
	// TODO if now param is only number not register yet so no datahazzards can occur
	// log
	ui.addTo(`Jump destination computed`, 'state_line_msg')
}
export function memaccess(instruction, registers, ui){
	ui.addTo(ui_template.memaccess_template(instruction.instruction, false), 'state_line_msg')
}
// TODO check if jump execution is here and also where destination is checked
export function writeback(instruction, registers, ui){
	const dest = Number(instruction.params[0])
	registers.PC.value = dest

	ui.addTo(`Jumped to ${dest} line, PC changed accordingly`, 'state_line_msg')
	ui.addTo(ui_template.registerChange('PC'), 'reg_changes')
}

export default {
	checkParams,
	fetch,
	decode,
	execute,
	memaccess,
	writeback
}
