import 'rxjs'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineEpics } from 'redux-observable'

// for adding new epics lazily
const epic$ = new BehaviorSubject(combineEpics());
export const rootEpic = (action$, store) =>
  epic$.mergeMap(epic =>
    epic(action$, store)
  );
// sometime later...add another Epic, keeping the state of the old ones
// epic$.next(asyncEpic1);

export default epic$
