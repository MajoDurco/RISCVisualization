import { createSelector } from 'reselect'

const homeSelector = (state) => state.get('home')
// 'home' is defined in ~(projectHome)/app/routes.js in injectingReducer

export const baseHomeSelector = createSelector(
	homeSelector,
	(home_page) => home_page
)

export const cpuSelector = createSelector(
	homeSelector,
	(home_page) => home_page.get('cpu')
)

export const pipeSelector = createSelector(
	cpuSelector,
	(cpu) => cpu.get('pipe')
)

export const regSelector = createSelector(
	cpuSelector,
	(cpu) => cpu.get('registers')
)

export const animationSelector = createSelector(
	homeSelector,
	(home) => home.get('animation')
)

export const animationOpen= createSelector(
	animationSelector,
	(animation) => animation.get('open')
)
