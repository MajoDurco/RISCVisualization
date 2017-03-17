/*
 * @param {String[]} params - array of instruction parameters
 * @return {Boolean} - tells if params are valid(true)
 */
export function checkParams(params){
	// TODO registers
	// lines are checked in memaccess with exception
	return true
}

export function fetch(){
	console.log("fetched jmp")
}
export function decode(){
	console.log("decode jmp")
}
export function execute(instruction){
	console.log(`execute ${instruction.instruction}`)
}
export function memaccess(){
	console.log("memaccess jmp")
}
// TODO check if jump execution is here and also where destination is checked
export function writeback(instruction, registers){
	const dest = Number(instruction.params[0])
	console.log("jumping to", dest)
	registers.PC = dest
}

export default {
	checkParams,
	fetch,
	decode,
	execute,
	memaccess,
	writeback
}
