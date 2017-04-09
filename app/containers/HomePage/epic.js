import 'rxjs'
import Rx from 'rxjs/Rx'
import { combineEpics } from 'redux-observable'

import { 
  SET_STATE_LINE_INDEX,
  ANIMATION_DURATION,
  ANIMATION_ON_TRUE
} from './constants'

import { AnimationOn } from './actions'

// SET_STATE_LINE_INDEX --> ANIMATION_ON_TRUE --> ANIMATION_DURATION sec --> ANIMATION_ON_FALSE
 
const animationOnTrue$ = action$ => 
  action$.ofType(SET_STATE_LINE_INDEX)
  .mapTo(AnimationOn(true))

const animationOnFalse$ = action$ => 
  action$.ofType(ANIMATION_ON_TRUE)
  .switchMap(() => 
    Rx.Observable.of(1)
    .delay(ANIMATION_DURATION*1000)
    .mapTo(AnimationOn(false))
  )

export default combineEpics(
  animationOnTrue$,
  animationOnFalse$
)
