import Immutable from 'immutable'

import {PIPELINE_INITVAL, PIPELINE_ENDVAL} from '../constants'

/*
 * @param {instructions} - instructions in format:
 * 	[
 * 	 {instruction: "ADD", params: ["r1", "r2", "r3"]},
 * 	 ...
 * 	]
 * @return 
 */
export default function cpu(instructions){
	let pipe = Pipeline(instructions)
	const registers = Registers()
	registers.data_reg.R1.setValue(9)
	console.log(registers.data_reg.R1.getValue())
	const attList = []

	attList.push(Immutable.fromJS(pipe.attrs))
	do {
		pipe.nextCycle()
		attList.push(Immutable.fromJS(pipe.attrs))
	} while(pipe.isEnd() === false)
	//print attList
	attList.forEach((element) => {
		console.log("cpu", element.toJS())
	})
	return attList
}

/* Object Pipeline for each call nextCycle() will update attrs object which
 * is a represenation of pipeline state
 * @param {instructions_len} length of instrucion array from parser
 * @return new Object with methods & attibutes
 */
function Pipeline(instructions){
	let end = false
	let index_of_next_instruction = 0
	let attrs = {
		// fetch, decode, execute, memory access, write back
		pipe: [PIPELINE_INITVAL, PIPELINE_INITVAL, PIPELINE_INITVAL, PIPELINE_INITVAL, PIPELINE_INITVAL]
	}

	let moveInstrucionIndexes = () => {
		if(index_of_next_instruction >= (instructions.length)){
			// pipeline hits end
			rotateInstructionIn(PIPELINE_ENDVAL)
			if (attrs.pipe.every((pipe_instuction) => pipe_instuction === PIPELINE_ENDVAL))
				end = true
		}
		else {
			rotateInstructionIn(instructions[index_of_next_instruction])
			index_of_next_instruction++
		}
	}
	
	let rotateInstructionIn = (i_index) => {
		attrs.pipe.pop()
		attrs.pipe.unshift(i_index)
	}
	return {
		init(){
			attrs.pipe.fill(PIPELINE_INITVAL)
		},
		nextCycle(){
			moveInstrucionIndexes()
		},
		isEnd(){
			return end
		},
		attrs
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
	let actual_value = null
	return {
		name,
		setValue(value){
			actual_value = value
			return actual_value
		},
		getValue(){
			return actual_value
		}
	}
}
