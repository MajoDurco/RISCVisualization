import Immutable from 'immutable'

import { INITVAL, ENDVAL } from '../constants'

/*
 * @param {instructions} - instructions in format:
 * 	[
 * 	 {instruction: "ADD", params: ["r1", "r2", "r3"]},
 * 	 ...
 * 	]
 * @return 
 */
export default function cpu(instructions){
	const registers = Registers()
	const pipeline = Pipeline()
	let allStates = []

	while (nextStep(instructions, registers, pipeline)) {
		allStates.push(Immutable.fromJS({
			pipeline: pipeline.pipeline_state, 
			registers
			}
		))
	}
	// allStates.forEach((element) => {
		// console.log("cpu", element.toJS())
	// })
	return allStates
}

/* Object Pipeline for each call nextCycle() will update pipeline_state object which
 * is a represenation of pipeline state
 * @param {instructions_len} length of instrucion array from parser
 * @return new Object with methods & attibutes
 */
function Pipeline(){
	let pipeline_state = {
		// fetch, decode, execute, memory access, write back
		pipe: [INITVAL, INITVAL, INITVAL, INITVAL, INITVAL]
	}
	return {
		init(){
			pipeline_state.pipe.fill(INITVAL)
		},
		pushInstructionIn(instruction){
			pipeline_state.pipe.pop()
			pipeline_state.pipe.unshift(instruction)
		},
		pipeline_state
	}
}

function Registers(){
	const data_reg = {
		R1 : Register("R1")	
	}
	const state_reg = {
		PC: Register("PC")
	}
	return {
		data_reg,
		state_reg
	}
}

function Register(name){
	let actual_value = 0 // init value of register
	return {
		name,
		setValue(value){
			actual_value = value
			return actual_value
		},
		alterValue(fn){
			actual_value = fn(actual_value)
			return actual_value
		},
		getValue(){
			return actual_value
		}
	}
}

/*
 * move
 * execute
 */
function nextStep(instructions, registers, pipeline){
	// PC++
	let PC = registers.state_reg.PC.getValue()
	// PC max val is last line(instruction)
	if(PC >= instructions.length) {
		registers.state_reg.PC.setValue(PC-1)
		pipeline.pushInstructionIn(ENDVAL)
		console.log("pushing ENDVAL in pipeline")
		if (pipeline.pipeline_state.pipe.every((instruction) => instruction === ENDVAL))
			return false // pipeline is empty
	}
	else {
		pipeline.pushInstructionIn(instructions[PC])
		console.log(`now going to execute ${instructions[PC].instruction} with params: ${instructions[PC].params}`)
	}
	return true
}
