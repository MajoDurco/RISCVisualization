export const UPDATE_PIPE = 'app/HomePage/UPDATE_PIPE'

export const INSTRUCTIONS = { 
	ADD   : 3, // ADD {REG}{REG}{REG}
	SUB   : 3, // SUB {REG}{REG}{REG}
	LOAD  : 2, //	LOAD {REG}{MEM}
	STORE : 2, // STORE {MEM}{REG}
	MOV   : 2, // MOV {VALUE}{MEM}
	AND   : 3, // AND {REG}{REG}{REG}
	OR    : 3, //	OR {REG}{REG}{REG}
	JMP   : 1, // JMP {REG/LINE}
}

export const REGISTER_REGEX = /^R(\d{1,2})$/

export const DATA_REGS = 16 // number of data registers

export const ERR_VALID_INSTRUCTION = "Instructions aren't valid"
export const ERR_NO_INSTRUCTIONS = "No instructions found"

export const INITVAL = "INIT"
export const ENDVAL = "END"
