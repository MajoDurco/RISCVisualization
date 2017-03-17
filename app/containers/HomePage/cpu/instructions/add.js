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
	const first_reg = registers[instruction.params[1]]
	const second_reg = registers[instruction.params[2]]
	registers[instruction.params[0]] = first_reg + second_reg
	console.log("writeback add result", registers[instruction.params[0]])
}

export default {
	checkParams,
	fetch,
	decode,
	execute,
	memaccess,
	writeback
}
