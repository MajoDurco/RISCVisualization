import { createSelector } from 'reselect'

const homeSelector = (state) => state.get('home')
// 'home' is defined in ~(projectHome)/app/routes.js in injectingReducer

// CPU
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
	(cpu) => cpu.get('pipe').toJS()
)

export const regSelector = createSelector(
	cpuSelector,
	(cpu) => cpu.get('registers').toJS()
)

export const uiSelector = createSelector(
	cpuSelector,
	(cpu) => cpu.get('ui').toJS()
)

export const memorySelector = createSelector(
	cpuSelector,
	(cpu) => cpu.get('memory').toJS()
)

// STATE LINE
export const stateLineSelector = createSelector(
	homeSelector,
	(home) => home.get('stateLine')
)

export const stateLineIndexSelector = createSelector(
	stateLineSelector,
	(state_line) => state_line.get('activeIndex')
)

// MEMORY TAB
export const memoryTabSelector = createSelector(
	homeSelector,
	(home) => home.get('memoryTab')
)

export const memDrawerOpenSelector = createSelector(
	memoryTabSelector,
	(state_line) => state_line.get('drawerOpen')
)

// ANIMATION
export const animationSelector = createSelector(
	homeSelector,
	(home) => home.get('animation')
)

export const animationOpen= createSelector(
	animationSelector,
	(animation) => animation.get('open')
)
