import { createSelector } from 'reselect'

const homeBaseSelector = (state) => state.get('home')
// 'home' is defined in ~(projectHome)/app/routes.js in injectingReducer

export const baseState = createSelector(
	homeBaseSelector,
	(homeState) => homeState
)

export const pipeState = createSelector(
	homeBaseSelector,
	(homeState) => homeState.get('pipe')
)
