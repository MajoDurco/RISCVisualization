import { fromJS, toJS } from 'immutable'

import { UPDATE_PIPE, PIPELINE_INITVAL } from './constants'

const initialState = fromJS({pipe: [PIPELINE_INITVAL, PIPELINE_INITVAL, PIPELINE_INITVAL, PIPELINE_INITVAL,  PIPELINE_INITVAL]})

function homePageReducer(state = initialState, action) {
  switch (action.type) {
		case UPDATE_PIPE:
			return state.mergeDeep(action.pipe)
    default:
      return state;
  }
}

export default homePageReducer;
