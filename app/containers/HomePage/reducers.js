import { fromJS } from 'immutable'

import { UPDATE_CPU_STATE, INITVAL } from './constants'

const initialState = fromJS({
	pipe: [INITVAL, INITVAL, INITVAL, INITVAL, INITVAL],
	registers: {
		R1: 0,
		R2: 0,
		R3: 0,
		PC: 0,
	}
})

function homePageReducer(state = initialState, action) {
  switch (action.type) {
		case UPDATE_CPU_STATE:
			return state.mergeDeep(action.cpu_state)
    default:
      return state;
  }
}

export default homePageReducer;
