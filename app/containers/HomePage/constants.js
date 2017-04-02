export const UPDATE_CPU_STATE = 'app/HomePage/UPDATE_CPU_STATE'
export const SET_STATE_LINE_INDEX = 'app/HomePage/SET_STATE_LINE_INDEX'
export const SET_OPEN_MEM_DRAWER = 'app/HomePage/SET_OPEN_MEM_DRAWER'

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

export const INITVAL = "INIT"
export const ENDVAL = "END"

export const FIRST_OPERAND = 0
export const SECOND_OPERAND = 1
export const THIRD_OPERAND = 2
