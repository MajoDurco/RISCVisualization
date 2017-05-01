import { 
  ANIMATION_ON_TRUE,
  ANIMATION_ON_FALSE,
  CODE_SAMPLE_CHANGED,
	SET_OPEN_MEM_DRAWER,
	SET_STATE_LINE_INDEX,
	UPDATE_CPU_STATE,
} from './constants'

export function updateCpuState(cpu_state){
	return {
		type: UPDATE_CPU_STATE,
		cpu_state
	}
}

export function setStateLineIndex(index){
	return {
		type: SET_STATE_LINE_INDEX,
		index
	}
}

export function openMemoryDrawer(open){
	return {
		type: SET_OPEN_MEM_DRAWER,
		open
	}
}

export function AnimationOn(on){
  if(on)
    return {type: ANIMATION_ON_TRUE}
  else
    return {type: ANIMATION_ON_FALSE}
}

export function codeSampleChanged(value){
  return {
    type: CODE_SAMPLE_CHANGED,
    value
  }
}
