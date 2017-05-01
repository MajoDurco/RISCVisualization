import React from 'react'
import Immutable from 'immutable'
import Warn from 'material-ui/svg-icons/action/report-problem'

import { INITVAL, ENDVAL, INIT_STATE, EMPTY, JUMP_TRESHOLD } from '../constants'
import instCode from './instructions/index'
import { memRegChange } from './ui_templates'

/*
 * @param { {instruction: String, params: String[]}[] } instructions - array of objects which
 * @return {Array} - contains all states for redux
 */
export default function cpu(instructions){
  const registers = Registers()
  const pipeline = Pipeline()
  const ui = UserInterface()
  let memory = INIT_STATE.get('memory').toJS() //[0,0....0].length === 32 console.log(memory)

  let PC_jumps = {}

  let allStates = []

	ui.addTo(`Initial state, program has run succesfully`, 'state_line_msg')
  while (true){
    let should_inc_PC;
    try {
      should_inc_PC = nextStep(instructions, registers, pipeline, ui, memory) 
      if(!should_inc_PC){ // only when jumping
        const exceeded = handleMaxJumps(PC_jumps, registers)
        if(exceeded){
          return null
        }
      }
    }
    catch (err) { // runtime error
      runtimeErrHandler(ui, err)
      break
    }
    if(!should_inc_PC){ // only when jumping, check if jump destination is not EMPTY line, if so skip this and dont need to push this state
      // if(handleEmptyLineJump(instructions, registers)){ // only if under PC is EMPTY line skip it
        // incrementPC(instructions, registers, pipeline, ui, should_inc_PC) // skip empty instrucion
        // incrementPC(instructions, registers, pipeline, ui, true) // skip empty pipe state
      // } 
      incrementPC(instructions, registers, pipeline, ui, should_inc_PC) // skip empty instruction or empty pipeline
      continue
    }
    allStates.push(Immutable.fromJS({  // save state
      pipe: pipeline.pipeline_state.pipe,
      registers, 
      memory,
      ui: ui.ui,
    }))
    ui.clearUi() // init ui for next cycle, fresh one
    let should_continue = incrementPC(instructions, registers, pipeline, ui, should_inc_PC)
    if(!should_continue)
      break
  }
	ui.addTo(`You've reached the last state`, 'state_line_msg')
  allStates.push(Immutable.fromJS({ 
    pipe: pipeline.pipeline_state.pipe,
    registers,
    memory,
    ui: ui.ui,
  }))// save end state
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
    pipe: INIT_STATE.get('pipe').toJS()
  }
  let stacks = {
    execute_stack: [],
    mem_access_stack: [],
    jump_stack: [],
    branch_stack: []
  }

  return {
    init(){
      pipeline_state.pipe.fill(INITVAL)
      for(let stack in stacks){
       stacks[stack] = []
      }
    },
    pushInstructionIn(instruction){
      pipeline_state.pipe.pop()
      pipeline_state.pipe.unshift(instruction)
    },
    pipeline_state,
    stacks
  }
}

/*
 * @desc - takes care of creating all needed registers
 * @return {Object} - return all registers(date_regs, state_regs) in one object 
 */
function Registers(){
  return INIT_STATE.get('registers').toJS()
}

/*
 * @desc initialize lock value to zero for each register
 */
function initRegisterLock(registers){
  for(let register in registers){
    registers[register].lock = 0
  }
}

/*
 * @desc - call executon of each instruction in pipeline
 * @param { {instruction: String, params: String[]}[] } instructions - array of objects which
 * represents parsed instructions from editor, index === editor line
 * @param {Object} registers - ref to Registers object
 * @param {Object} pipeline - ref to Pipeline object
 * @param {Object} ui - ref to Ui object
 * @param {Array<Number>} memory - memory array
 * @return {Boolean} - true if pc should increment or false when jumping
 */
function nextStep(instructions, registers, pipeline, ui, memory){
  let should_inc_PC = true
  // execute instruction in pipeline
  pipeline.pipeline_state.pipe.forEach((instruction, index) => {
    if(instruction !== INITVAL && instruction !== ENDVAL && instruction !== EMPTY) {
      const inst_functions = instCode[instruction.instruction]
      const functions = [inst_functions.fetch, inst_functions.decode, inst_functions.execute, inst_functions.memaccess, inst_functions.writeback]
      if (index === 4){ // writeback
        if(['BEQ', 'BNE', 'BLT', 'BGT', 'JMP'].find((instr) => instr === instruction.instruction))
          should_inc_PC = handleJumps(instruction, instructions.length, registers, pipeline, ui, memory, functions[index])
        else
          functions[index](instruction, registers, ui, pipeline, memory) // not jump instruction
      }
      else
        functions[index](instruction, registers, ui, pipeline, memory) // not writeback
    }
  })
  return should_inc_PC
}

/*
 * @desc handle jump execution, cancel defaul PC inrementation
 * @param { {instruction: String, params: String[]}[] } instructions - array of objects which
 * represents parsed instructions from editor, index === editor line
 * @param {Number} instructions_len - number of lines from editor
 * @param {Object} registers - ref to Registers object
 * @param {Object} pipeline - ref to Pipeline object
 * @param {Object} ui - ref to Ui object
 * @param {Array<Number>} memory - memory array
 * @param {Function(instruction, registers, ui, memory)} exec_function - jump execution function(writeback)
 * @return {Boolean} - if should PC increment
 * @throws {String} - when jump destination is unreachable
 */
function handleJumps(instruction, instructions_len, registers, pipeline, ui, memory, exec_function){
  let should_inc_PC = true
  const jumpExecute = exec_function(instruction, registers, ui, pipeline, memory) // execute jump and move PC
  if(instruction.instruction === "JMP"){
    //check if jump destination is correct
    if(registers.PC.value >= instructions_len || registers.PC.value <= 0)
      throw(`Cannot jump to line ${registers.PC.value}!`)
    should_inc_PC = false
    ui.removeAllFromStateLineExceptLast() // remove all mesages except jump one
    pipeline.init()
    initRegisterLock(registers)
  }
  else { // branch jumps
    if(jumpExecute === true) {  // branch condition is true
      if(registers.PC.value >= instructions_len || registers.PC.value <= 0)
        throw(`Cannot jump to line ${registers.PC.value}!`)
      should_inc_PC = false
      ui.removeAllFromStateLineExceptLast() // remove all mesages except jump one
      pipeline.init()
      initRegisterLock(registers)
    }
  }
  return should_inc_PC
}

/*
 * @desc - increment PC which points on next instruction and push new instruction into pipeline
 * @param { {instruction: String, params: String[]}[] } instructions - array of objects which
 * represents parsed instructions from editor, index === editor line
 * @param {Object} registers - ref to Registers object
 * @param {Object} pipeline - ref to Pipeline object
 * @param {Object} ui - ref to Ui object
 * @return {Boolean} - indicator of the end of computation, false === end
 */
function incrementPC(instructions, registers, pipeline, ui, should_inc_PC){
  let new_index = registers.PC.value
  if(should_inc_PC)
      new_index = getNewPCIndex(instructions, registers.PC.value)

  // PC is fine and poiting on next instruction, if jump is used PC is not updated and has old value
  if(new_index) {    
    registers.PC.value = new_index
    ui.addTo(memRegChange('PC'), 'reg_changes')
    pipeline.pushInstructionIn(instructions[registers.PC.value])
  }
  else { // end of instructions no more to process start pushing ENDVAL
    pipeline.pushInstructionIn(ENDVAL)
    if (pipeline.pipeline_state.pipe.every((instruction) => instruction === ENDVAL))
      return false // pipeline is empty
  }
  return true // keep going
}

/*
 * @desc - calculate new PC index based on actual position, skipping empty lines
 * @param { {instruction: String, params: String[]}[] } instructions - array of objects which
 * represents parsed instructions from editor, index === editor line
 * @param {Number} actual_index - actual PC value
 * @return {Boolean/Number} - end of instrustion array(false) of next index for PC
 */
function getNewPCIndex(instructions, actual_index){
  let next_index = null
  for(let i=actual_index; i<instructions.length; i++){
    if (i === actual_index) // skip actual index want to move
      continue
    if(typeof instructions[i] === 'object'){
      next_index = i
      break
    }
  }
  if(next_index === null)
    return false
  return next_index
}

/*
 * @desc - check if actual instruction on which PC points is EMPTY line
 * @param { {instruction: String, params: String[]}[] } instructions - array of objects which
 * represents parsed instructions from editor, index === editor line
 * @param {Object} registers - ref to Registers object
 * @return {Boolean} - Empty(true)
 */
function handleEmptyLineJump(instructions, registers){
  return instructions[registers.PC.value] === EMPTY ? true : false
}

/*
 * @desc - factory function for userinterface, like reg/mem changed stateline messages and annotations
 * @return {Object} - ui object and functions for altering this ui object
 */
function UserInterface(){
  let ui = INIT_STATE.get('ui').toJS()
  return {
    ui,
    addTo(element, ...arrays){
      arrays.forEach((ui_array) => {
        try{
          ui[ui_array].push(element)
        }
        catch(ReferenceError){ // console log err try push as much as you can
          console.error(`In UserInterface ${ui_array} doesn't exists in ui obj`)
        }
      })
    },
    removeAllFromStateLineExceptLast(){
      const last_message = ui.state_line_msg.pop()
      ui.state_line_msg = [last_message]
    },
    clearSpecificUiMember(member){
      try{
        ui[member] = []
      }
      catch(ReferenceError){
        console.error(`Ui object has no ${member}, cannot be cleared`)
      }
    },
    clearUi(){
      for(let element in ui){
        ui[element] = []
      }
    },
  }
}

/*
 * @desc - take care of clear stateline messages then add runtime msg
 * @param {Object} ui - ref to Ui object
 * @param {String} message - error message
 */
function runtimeErrHandler(ui, message){
  ui.clearSpecificUiMember('state_line_msg')
	ui.addTo(
      <span>
        <Warn color="red" />
        {` Runtime Error Occured ${message} `}
        <Warn color="red" />
      </span>
  , 'state_line_msg')
}

/*
 * @desc - need to handle infinite loop caused by jumps by my own do not let browser say a word,
 *   for each PC destination value has own counter and if the counter reach the threshold stop the execution
 * @param {{PC_value: counter<Number>}} PC_jumps - object where each PC has own jump counter
 * @param {Number} JUMP_TRESHOLD - max jumps on the same destination, if reached stop program
 * @param {Object} registers - ref to Registers object
 */
function handleMaxJumps(PC_jumps, registers){
  const PC = registers.PC.value
  if(PC in PC_jumps){ // jump was executed in past to the same destination
    PC_jumps[PC] += 1
  }
  else {
    PC_jumps[PC] = 1
  }
  for(let jump_counter in PC_jumps){
    if(PC_jumps[jump_counter] >= JUMP_TRESHOLD)
      return `Jump exceeded ${JUMP_TRESHOLD} jump threshold!`
  }
  return false
}
