import { fromJS, toJS } from 'immutable'

import { UPDATE_PIPE, INITVAL } from './constants'

const initialState = fromJS({pipe: [INITVAL, INITVAL, INITVAL, INITVAL,  INITVAL]})

function homePageReducer(state = initialState, action) {
  switch (action.type) {
		case UPDATE_PIPE:
			return state.mergeDeep(action.pipe)
    default:
      return state;
  }
}

export default homePageReducer;
