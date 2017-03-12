import { REGISTER_REGEX, DATA_REGS } from '../../constants'

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
	console.log("writeback add")
	const dest_reg = registers.data_reg[instruction.params[0]]
	const first_reg = registers.data_reg[instruction.params[1]]
	const second_reg = registers.data_reg[instruction.params[2]]
	const result_value = first_reg.getValue() + second_reg.getValue()
	console.log("writeback result", result_value)
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
