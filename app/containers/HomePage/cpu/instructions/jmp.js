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
/*
 * @throws {String} - exception when jump destination is wrong
 * TODO check if jump execution is here and also where destination is checked
 */
export function writeback(instruction, registers){
	console.log("writeback jmp")
	const dest = Number(instruction.params[0])
	console.log("jumping to", dest)
	if(dest <= (instruction.length-1) && dest !== 0)
		registers.state_reg.PC.setValue(dest)
	else
		throw "cannot jump out of code"
}

export default {
	checkParams,
	fetch,
	decode,
	execute,
	memaccess,
	writeback
}
