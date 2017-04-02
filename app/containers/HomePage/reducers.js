import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'

import { UPDATE_CPU_STATE,
	INITVAL,
	SET_STATE_LINE_INDEX,
	SET_OPEN_MEM_DRAWER
} from './constants'

const initial_cpu_state = fromJS({
	pipe: [INITVAL, INITVAL, INITVAL, INITVAL, INITVAL],
	registers: {
		R1: {value: 0, lock: false},
		R2: {value: 0, lock: false}, R3: {value: 0, lock: false},
		PC: {value: 0, lock: false},
	},
	ui: {
		mem_changes: [],
		notifications: [],
		reg_changes: [],
		state_line_msg: []
	},
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

const initial_state_line = fromJS({
	activeIndex: 0
})

function stateLine(state = initial_state_line, action){
	switch (action.type) {
		case SET_STATE_LINE_INDEX:
			return state.set('activeIndex', action.index)
		default:
			return state
	}
}

const initial_memory_state = fromJS({
	drawerOpen: false
})

function memory(state = initial_memory_state, action) {
	switch (action.type) {
		case SET_OPEN_MEM_DRAWER:
			return state.set('drawerOpen', action.open)
		default:
			return state
	}
}

const home_page_reducers = combineReducers({ 
	cpu: cpuReducer,
	animation,
	stateLine,
	memory,
})

export default home_page_reducers
