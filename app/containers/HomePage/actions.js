import { 
	UPDATE_CPU_STATE,
	SET_STATE_LINE_INDEX,
	SET_OPEN_MEM_DRAWER,
} from './constants'

export function updateCpuState(cpu_state){
	return {
		type: UPDATE_CPU_STATE,
		cpu_state: cpu_state,
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

export function animation(){
	return {
		type: 'ANIMATE'
	}
}

export function resetAnimation(){
	return {
		type: 'RESET'
	}
}
