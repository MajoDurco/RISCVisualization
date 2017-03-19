import 'rxjs'
import { combineEpics } from 'redux-observable'

const home_epic = action$ => {
	console.log("in home page epic", action$)
	return action$.filter(action => action.type === 'AHOJ').mapTo({type: "xixi"})
}

export default combineEpics(
	home_epic
)
