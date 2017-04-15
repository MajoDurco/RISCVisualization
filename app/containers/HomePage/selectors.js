import { createSelector } from 'reselect'

/*
 * State tree:
 *   home: {
 *     cpu: {...}<Immutable>
 *     animation: {...}<Immutable>
 *     stateLine: {...}<Immutable>
 *     memoryTab: {...}<Immutable>
 *     editor: {...}<Immutable>
 *   }<Immutable>
 */

const homeSelector = (state) => state.get('home')
// 'home' is defined in ~(projectHome)/app/routes.js in injectingReducer

// CPU
export const baseHomeSelector = createSelector(
	homeSelector,
	(home_page) => home_page
)

export const cpuSelector = createSelector(
	homeSelector,
  (home_page) => {
    return home_page.get('cpu')
  }
)

export const pipeSelector = createSelector(
	cpuSelector,
	(cpu) => cpu.get('pipe')
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

export const animationOn = createSelector(
	animationSelector,
	(animation) => animation.get('on')
)

// EDITOR
export const editorSelector = createSelector(
	homeSelector,
	(home) => home.get('editor')
)

export const codeSampleSelector = createSelector(
  editorSelector,
	(editor) => editor.get('code_sample')
)
