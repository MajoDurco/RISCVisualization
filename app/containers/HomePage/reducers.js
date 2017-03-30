import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'

import { UPDATE_CPU_STATE,
	INITVAL,
  ERR_INSTR_NOTIF_VISIBLE,
  ERR_INSTR_NOTIF_HIDDEN,
	} from './constants'

const initial_cpu_state = fromJS({
	pipe: [INITVAL, INITVAL, INITVAL, INITVAL, INITVAL],
	registers: {
		R1: {value: 0, lock: false},
		R2: {value: 0, lock: false},
		R3: {value: 0, lock: false},
		PC: {value: 0, lock: false},
	},
	ui: {
		mem_changes: [],
		notifications: [],
		reg_changes: [],
		state_line_msg: []
	}
})

function cpuReducer(state = initial_cpu_state, action) {
  switch (action.type) {
		case UPDATE_CPU_STATE:
			return action.cpu_state
			// return state.mergeDeep(action.cpu_state)
    default:
      return state;
  }
}

const init_editor_state = fromJS({
	errors: []
})

function editorReducer(state = init_editor_state, action){
	switch (action.type){
		case ERR_INSTR_NOTIF_VISIBLE:
			return state.set('errors', action.errors)
		case ERR_INSTR_NOTIF_HIDDEN:
			return init_editor_state
		default: 
			return state
	}
} 

function animation(state = fromJS({open: false}), action){
	switch (action.type) {
		case 'ANIMATE':
			return state.set('open', true)
		case 'RESET':
			return state.set('open', false)
		default:
			return state
	}
}

const home_page_reducers = combineReducers({ 
	cpu: cpuReducer,
	editor: editorReducer,
	animation
	})

export default home_page_reducers
