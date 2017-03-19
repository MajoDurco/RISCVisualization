import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'

import { UPDATE_CPU_STATE, INITVAL } from './constants'

const initial_cpu_state = fromJS({
	pipe: [INITVAL, INITVAL, INITVAL, INITVAL, INITVAL],
	registers: {
		R1: 0,
		R2: 0,
		R3: 0,
		PC: 0,
	}
})

function cpuReducer(state = initial_cpu_state, action) {
  switch (action.type) {
		case UPDATE_CPU_STATE:
			return state.mergeDeep(action.cpu_state)
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

const home_page_reducers = combineReducers({ 
	cpu: cpuReducer,
	animation
	})

export default home_page_reducers
