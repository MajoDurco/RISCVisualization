import { FIRST_OPERAND, SECOND_OPERAND, THIRD_OPERAND } from '../constants'

export function fetch_template(instruction){
  return `Instruction ${instruction} has been fetched`
}
export function decode_template(instruction){
  return `Instruction ${instruction} has been decoded`
}
export function execute_template(instruction, operator, result, first, second){
  return `Instruction ${instruction.instruction} has been executed, 
  ${instruction.params[FIRST_OPERAND]}(${result}) = ${instruction.params[SECOND_OPERAND]}(${first}) ${operator} ${instruction.params[THIRD_OPERAND]}(${second})`
}
export function memaccess_template(instruction, is_accssed){
  if(is_accssed)
    return `Instruction ${instruction} has accessed memory`
  else
    return `Instruction ${instruction} has been forwarded to the next stage without accessing memory` 
}
export function writeback_template(instruction, result, destination){
  return `Instruction ${instruction} has written ${result} into the register ${destination}`
}

export function memRegChange(target){
  return {name: target} // target for register is name like R1 and for memory index
}
