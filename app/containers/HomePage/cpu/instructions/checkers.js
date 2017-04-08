import { 
	REGISTER_REGEX,
  MEM_LENGTH,
	DATA_REGS,
} from '../../constants'


/*
 * @desc check if register exitst and has right format
 * @param {String} reg - register name
 * @return {Boolean} - true(valid)
 */
export function regCheck(reg){
  const match = reg.match(REGISTER_REGEX)
  if(match != null && Number(match[1]) <= DATA_REGS) // match[1] is number after R, R11 -> 11
    return true
  return false
}

/*
 * @desc check if index is not out of memory range
 * @param {Number} mem_index - memory index
 * @retrun {Boolean} - true(valid), false(off index)
 */
export function memCheck(mem_index){
  return (mem_index >= 0 && mem_index < MEM_LENGTH) ? true : false
}

/*
 * @desc function validate parameter as number
 * @param {Any} number - to be validated
 * @return {Boolean, Number} - if !number returns false else converted number
 */
export function numberCheck(number){
  const num = Number(number)
  if(isNaN(num))
    return false
  return num
}
