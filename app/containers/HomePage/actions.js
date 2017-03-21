import { UPDATE_CPU_STATE, ERR_INSTR_NOTIF_VISIBLE, ERR_INSTR_NOTIF_HIDDEN } from './constants'

export function updateCpuState(cpu_state){
	return {
		type: UPDATE_CPU_STATE,
		cpu_state: cpu_state,
	}
}

export function showInstErrNotif(errors){
	return {
		type: ERR_INSTR_NOTIF_VISIBLE,
		errors
	}
}

export function hideInstErrNotif(){
	return {
		type: ERR_INSTR_NOTIF_HIDDEN
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
