import 'rxjs'
import { combineEpics } from 'redux-observable'

const home_epic = action$ => action$.ofType('ANIMATE')
	.delay(1000)
	.mapTo({type: 'RESET'})

export default combineEpics(
	home_epic
)
