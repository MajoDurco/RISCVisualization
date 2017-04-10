import { fromJS } from 'immutable'
import _ from 'lodash'

export const UPDATE_CPU_STATE = 'app/HomePage/UPDATE_CPU_STATE'
export const SET_STATE_LINE_INDEX = 'app/HomePage/SET_STATE_LINE_INDEX'
export const SET_OPEN_MEM_DRAWER = 'app/HomePage/SET_OPEN_MEM_DRAWER'
export const ANIMATION_ON_TRUE = 'app/HomePage/ANIMATION_ON_TRUE'
export const ANIMATION_ON_FALSE = 'app/HomePage/ANIMATION_ON_FALSE'

export const INSTRUCTIONS = { 
	ADD    : 3, // ADD {REG}{REG}{REG}
	AND    : 3, // AND {REG}{REG}{REG}
  BEQ    : 3, // BEQ {REG}{REG}{LINE/REG}
  BGT    : 3, // BGT {REG}{REG}{LINE/REG}
  BLT    : 3, // BLT {REG}{REG}{LINE/REG}
  BNE    : 3, // BNE {REG}{REG}{LINE/REG}
	JMP    : 1, // JMP {REG/LINE}
	LOAD   : 2, // LOAD {REG}{MEM}
	MOV    : 2, // MOV {MEM_INDEX}{VALUE}
  NOP    : 0, // NOP
  NOR    : 3, // NOR {REG}{REG}{REG}
	OR     : 3, // OR {REG}{REG}{REG}
	STORE  : 2, // STORE {MEM}{REG}
	SHIFTL : 3, // SHIFTL {REG}
	SHIFTR : 3, // SHIFTR {REG}
	SUB    : 3, // SUB {REG}{REG}{REG}
  XOR    : 3, // XOR {REG}{REG}{REG}
}

export const REGISTER_REGEX = /^R(\d{1,2})$/

export const DATA_REGS = 16 // number of data registers

export const INITVAL = "INIT"
export const ENDVAL = "END"

export const FIRST_OPERAND = 0
export const SECOND_OPERAND = 1
export const THIRD_OPERAND = 2

export const ANIMATION_DURATION = 1  // sec

export const MEM_LENGTH = 32
const memory = _.range(MEM_LENGTH).map(() => 0)

export const INIT_STATE = fromJS({
	pipe: [INITVAL, INITVAL, INITVAL, INITVAL, INITVAL],
	registers: {
		R1: {value: 0, lock: false},
		R2: {value: 0, lock: false},
		R3: {value: 0, lock: false},
		PC: {value: 0, lock: false},
	},
	memory,
	ui: {
		mem_changes: [],
		notifications: [],
		reg_changes: [],
		state_line_msg: [],
	},
})
