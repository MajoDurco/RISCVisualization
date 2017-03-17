import { UPDATE_CPU_STATE } from './constants'

export function updateCpuState(cpu_state){
	return {
		type: UPDATE_CPU_STATE,
		cpu_state: cpu_state,
	}
}
