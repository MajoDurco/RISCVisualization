import { fromJS } from 'immutable'
import _ from 'lodash'

export const UPDATE_CPU_STATE = 'app/HomePage/UPDATE_CPU_STATE'
export const SET_STATE_LINE_INDEX = 'app/HomePage/SET_STATE_LINE_INDEX'
export const SET_OPEN_MEM_DRAWER = 'app/HomePage/SET_OPEN_MEM_DRAWER'
export const ANIMATION_ON_TRUE = 'app/HomePage/ANIMATION_ON_TRUE'
export const ANIMATION_ON_FALSE = 'app/HomePage/ANIMATION_ON_FALSE'
export const CODE_SAMPLE_CHANGED = 'app/HomePage/CODE_SAMPLE_CHANGED'

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
    SHIFTL : 3, // SHIFTL {REG}{REG}{REG}
    SHIFTR : 3, // SHIFTR {REG}{REG}{REG}
    SUB    : 3, // SUB {REG}{REG}{REG}
    XOR    : 3, // XOR {REG}{REG}{REG}
}

export const REGISTER_REGEX = /^R(\d{1,2})$/

export const DATA_REGS = 16 // number of data registers

export const INITVAL = "INIT"
export const ENDVAL = "END"

// empty line in editor
export const EMPTY = "EMPTY"

export const FIRST_OPERAND = 0
export const SECOND_OPERAND = 1
export const THIRD_OPERAND = 2

export const JUMP_TRESHOLD = 1000

export const ANIMATION_DURATION = 1  // sec

export const MEM_LENGTH = 32
const memory = _.range(MEM_LENGTH).map(() => 0)

export const INIT_STATE = fromJS({
  pipe: [INITVAL, INITVAL, INITVAL, INITVAL, INITVAL],
  registers: {
    R1: {value: 0, order: 1, lock: 0},
    R2: {value: 0, order: 2, lock: 0},
    R3: {value: 0, order: 3, lock: 0},
    R4: {value: 0, order: 4, lock: 0},
    R5: {value: 0, order: 5, lock: 0},
    R6: {value: 0, order: 6, lock: 0},
    R7: {value: 0, order: 7, lock: 0},
    R8: {value: 0, order: 8, lock: 0},
    R9: {value: 0, order: 9, lock: 0},
    R10: {value: 0, order: 10, lock: 0},
    R11: {value: 0, order: 11, lock: 0},
    R12: {value: 0, order: 12, lock: 0},
    R13: {value: 0, order: 13, lock: 0},
    R14: {value: 0, order: 14, lock: 0},
    R15: {value: 0, order: 15, lock: 0},
    R16: {value: 0, order: 16, lock: 0},
    PC: {value: 0, order: 99, lock: 0},
  },
  memory,
  ui: {
    mem_changes: [],
    notifications: [],
    reg_changes: [],
    state_line_msg: [],
  },
})
