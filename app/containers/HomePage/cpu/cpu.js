import Immutable from 'immutable'

import { INITVAL, ENDVAL } from '../constants'
import instCode from './instructions/index'

/*
 * @param { {instruction: String, params: String[]}[] } instructions - array of objects which
 * @return {Array} - contains all states for redux
 */
export default function cpu(instructions){
	const registers = Registers()
	const pipeline = Pipeline()
	let allStates = []

	registers.R2 = 2
	registers.R3 = 4
	allStates.push(Immutable.fromJS({ 
		pipe: pipeline.pipeline_state.pipe,
		registers 
	}))// save init state
	while (nextStep(instructions, registers, pipeline)) {
		allStates.push(Immutable.fromJS({
			pipe: pipeline.pipeline_state.pipe, 
			registers
			}
		))
		console.log(" -------- CYCLE ---------")
	}
	allStates.push(Immutable.fromJS({ 
		pipe: pipeline.pipeline_state.pipe,
		registers 
	}))// save end state
	allStates.forEach((element, index) => {
		console.log("state index", index)
		console.log("state array", element.toJS())
	})
	return allStates
}

/*
 * @desc - Factory function for pipeline which for each call nextCycle() will update pipeline_state object 
 * which is a represenation of pipeline actual state
 * @return {Object} - object of pipeline
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

/*
 * @desc - takes care of creating all needed registers
 * @return {Object} - return all registers(date_regs, state_regs) in one object 
 */
function Registers(){
	let registers = {
		R1: 0,
		R2: 0,
		R3: 0,
		PC: 0,
	}
	return registers
}

/*
 * @desc - Factory function for register creation
 * @param {String} name - name of creating register
 * @return {Object} - new register
 */
// function Register(name){
	// let actual_value = {value: 0}// init value of register
	// return {
		// name,
		// actual_value,
		// setValue(value){
			// actual_value.value = value
			// return actual_value.value
		// },
		// alterValue(fn){
			// actual_value.value = fn(actual_value.value)
			// return actual_value.value
		// },
		// getValue(){
			// return actual_value.value
		// }
	// }
// }

/*
 * @desc - call executon of each instruction in pipeline, after that increment PC which points on next instruction then push it into pipeline
 * TODO push in the beginning of execution?
 * @param { {instruction: String, params: String[]}[] } instructions - array of objects which
 * represents parsed instructions from editor, index === editor line
 * @param {Object} registers - ref to Registers object
 * @param {Object} pipeline - ref to Pipeline object
 * @return {Boolean} - indicator of the end of calcutation, false === end
 */
function nextStep(instructions, registers, pipeline){
	let should_inc_PC = true
	// execute instruction in pipeline
	pipeline.pipeline_state.pipe.forEach((instruction, index) => {
		if(instruction !== INITVAL && instruction !== ENDVAL){
			const inst_functions = instCode[instruction.instruction]
			const functions = [inst_functions.fetch, inst_functions.decode, inst_functions.execute, inst_functions.memaccess, inst_functions.writeback]
			if (index === 4) { // writeback
				functions[index](instruction, registers)
				if(instruction.instruction === "JMP"){
					//check if jump destination is correct
					if(register.PC <= (instructions.length-1) && register.PC <= 0){
						console.log("jump on wrong destination") // TODO make exception on this or something
						return false
					}
					should_inc_PC = false
					pipeline.init()
				}
			}
			else
				functions[index](instruction, registers)
		}
	})
	// PC++
	if(should_inc_PC)
		registers.PC += 1 
	// PC max val is last line(instruction)
	// move next instruction into the pipeline
	if(registers.PC >= instructions.length) {
		registers.PC -= 1
		pipeline.pushInstructionIn(ENDVAL)
		if (pipeline.pipeline_state.pipe.every((instruction) => instruction === ENDVAL))
			return false // pipeline is empty
	}
	else {
		pipeline.pushInstructionIn(instructions[registers.PC])
		console.log(`${instructions[registers.PC].instruction} pushed into pipeline with params: ${instructions[registers.PC].params}`)
	}
	return true
}
