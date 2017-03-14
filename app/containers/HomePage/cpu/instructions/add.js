import { REGISTER_REGEX, DATA_REGS } from '../../constants'

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

export function fetch(){
	console.log("fetched add")
}
export function decode(){
	console.log("decode add")
}
export function execute(instruction){
	console.log(`execute ${instruction.instruction},
	${instruction.params[0]} = ${instruction.params[1]} + ${instruction.params[2]}`)
}
export function memaccess(){
	console.log("memaccess add")
}
export function writeback(instruction, registers){
	const dest_reg = registers.data_reg[instruction.params[0]]
	const first_reg = registers.data_reg[instruction.params[1]]
	const second_reg = registers.data_reg[instruction.params[2]]
	const result_value = first_reg.getValue() + second_reg.getValue()
	console.log("writeback add result", result_value)
	dest_reg.setValue(result_value)
}

export default {
	checkParams,
	fetch,
	decode,
	execute,
	memaccess,
	writeback
}
