import { UPDATE_PIPE } from './constants'

export function updatePipeline(pipe_state){
	return {
		type: UPDATE_PIPE,
		pipe: pipe_state
	}
}
