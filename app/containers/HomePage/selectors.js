import { createSelector } from 'reselect'

const homeSelector = (state) => state.get('home')
// 'home' is defined in ~(projectHome)/app/routes.js in injectingReducer

export const baseHomeSelector = createSelector(
	homeSelector,
	(home_page) => home_page
)

export const pipeSelector = createSelector(
	homeSelector,
	(home_page) => home_page.get('pipe')
)

export const regSelector = createSelector(
	homeSelector,
	(home_page) => home_page.get('registers')
)
