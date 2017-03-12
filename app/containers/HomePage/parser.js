import { INSTRUCTIONS,
	ERR_VALID_INSTRUCTION,
	ERR_NO_INSTRUCTIONS
} from './constants'

import instruction_checker from './cpu/instructions/index'

/*
 * @param {text} instrucions from editor
 * @exception
 * @return 
 *  parsed_instructions
 */
export default function getInstructions(text){
		const parsed_instructions = parse(text)
		if (parsed_instructions === null)
			throw ERR_NO_INSTRUCTIONS
		console.log("valid?", verifyInstructions(parsed_instructions)) 
		if(!verifyInstructions(parsed_instructions))
			throw ERR_VALID_INSTRUCTION
		parsed_instructions.unshift('') // add empty element to the beginning to have each instruction on the same index as on line in editor
		return parsed_instructions
}

/*
 * @param {text} text from ace editor
 * @return :
 * 	 null when {text} is empty,
 *	 parsed instruction in format:
 *		[{
 *			instruction: NAME,
 *			params: [PARAM1, PARAM2]
 *		 },
 *		...]
 *		
 */
export function parse(text){
	const instruction_pos = 0
	const instruction_offset = 1
	try{
		if (!isEmpty(text)) {
			let parsed = []
			text.split('\n').map((line) => {
				if(!isEmpty(line)) // ignore empty lines
				{
					let space_splited = line.split(' ')
					//remove empty spaces and trim each word
					space_splited = space_splited
						.filter((word) => {
							if (!isEmpty(word))
								return true
							return false
						}).map((word) => word.trim())
					parsed.push({
						instruction: space_splited[instruction_pos].toUpperCase(),
						params:space_splited.slice(instruction_offset)
					})
				}
			})
			return parsed
		}
		else
			return null
	}
	catch (err){ 
		console.log(err)
	}
	return null
}	

/*
 * @param {instructions}
 * @return 
 * 	bool
 */
export function verifyInstructions(instructions, rules=INSTRUCTIONS){
	return instructions.every((instr) => {
		const instruction_name = instr.instruction.toUpperCase()
		if( instruction_name in rules){
			if(instr.params.length === rules[instruction_name]) {
				if(instruction_checker[instruction_name].checkParams(instr.params))
					return true
			}
		}
		return false
	})
}

/*
 * @param {str} - controled string
 * @excption
 * @return 
 * 	bool
 */
export function isEmpty(str){
	if (typeof(str) !== 'string')
		throw TypeError("isEmpty takes string as parameter not " + typeof(str))
	const zero_length = 0
	return (str.length === zero_length || !str.trim())
}
