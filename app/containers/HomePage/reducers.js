import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'

import { 
  CODE_SAMPLE_CHANGED,
	INIT_STATE,
	SET_STATE_LINE_INDEX,
	SET_OPEN_MEM_DRAWER,
	UPDATE_CPU_STATE,
  ANIMATION_ON_TRUE,
  ANIMATION_ON_FALSE,
} from './constants'

const initial_cpu_state = INIT_STATE

export function cpuReducer(state = initial_cpu_state, action) {
  switch (action.type) {
		case UPDATE_CPU_STATE:
			return action.cpu_state
    default:
      return state;
  }
}

const initial_animation_state = fromJS({
  on: false
})

export function animation(state = initial_animation_state, action){
	switch (action.type) {
		case ANIMATION_ON_FALSE:
			return state.set('on', false)
		case ANIMATION_ON_TRUE:
			return state.set('on', true)
		default:
			return state
	}
}

const initial_state_line = fromJS({
  activeIndex: 0  // statline not initialized
})

export function stateLine(state = initial_state_line, action){
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

export function memoryTab(state = initial_memory_state, action) {
	switch (action.type) {
		case SET_OPEN_MEM_DRAWER:
			return state.set('drawerOpen', action.open)
		default:
			return state
	}
}

const initial_editor_state = fromJS({
	code_sample: 'default'
})

export function editor(state= initial_editor_state, action){
  switch (action.type){
    case CODE_SAMPLE_CHANGED:
      return state.set('code_sample', action.value)
    default: 
      return state
  }
}

const home_page_reducers = combineReducers({ 
	cpu: cpuReducer,
	animation,
	stateLine,
	memoryTab,
  editor,
})

export default home_page_reducers
