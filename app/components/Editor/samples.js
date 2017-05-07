const arithmetic = `MOV 0 1
MOV 1 5
LOAD R1 0
LOAD R2 1
NOP # need wait for R2 value
NOP
ADD R3 R1 R2
SUB R4 R1 R2
AND R5 R1 R2
OR R6 R1 R2
NOR R7 R1 R2
XOR R8 R1 R2
SHIFTL R9 R1 R2
SHIFTR R10 R2 R1`

const jumps = `MOV 0 5
MOV 1 9
LOAD R1 0
LOAD R2 1
NOP
JMP 7 # jump to line 7
BNE R1 R2 R2 # jump to line 9
BGT R2 R1 10
BEQ R2 R1 1
STORE 3 R3
NOP`

const hazzard = `MOV 0 5
MOV 1 9
LOAD R1 0
LOAD R2 1
ADD R3 R1 R2 # registers have their old values`

const jump_loop = `NOP
JMP 1 # infinite loop with jump`

const runtime_err = `MOV 0 -1
LOAD R1 0
NOP
NOP
JMP R1 # invalid line number in R1`

export default {
  default: '', // don't remove
  empty: '', // don't remove
  arithmetic,
  jumps,
  hazzard,
  jump_loop,
  runtime_err,
}
