import { 
  ANIMATION_ON_TRUE,
  ANIMATION_ON_FALSE,
  CODE_SAMPLE_CHANGED,
	SET_OPEN_MEM_DRAWER,
	SET_STATE_LINE_INDEX,
	UPDATE_CPU_STATE,
} from '../constants'

import * as actions from '../actions'

const fillObjectTemplate = (type, payload) => {
  return {...{ type }, ...payload}
}

describe("Check actions", () => {
  it("Should updateCpuState", () => {
    const input = "state"
    const payload = {cpu_state: input}
    const result = fillObjectTemplate(UPDATE_CPU_STATE, payload)
    expect(actions.updateCpuState(input)).toEqual(result)
  })

  it("Should setStateLineIndex", () => {
    const input = 1
    const payload = {index: input}
    const result = fillObjectTemplate(SET_STATE_LINE_INDEX, payload)
    expect(actions.setStateLineIndex(input)).toEqual(result)
  })

  it("Should openMemoryDrawer", () => {
    const input = true
    const payload = {open: input}
    const result = fillObjectTemplate(SET_OPEN_MEM_DRAWER, payload)
    expect(actions.openMemoryDrawer(input)).toEqual(result)
  })

  it("Should AnimationOn", () => {
    expect(actions.AnimationOn(true))
      .toEqual({type: ANIMATION_ON_TRUE})
    expect(actions.AnimationOn(false))
    .toEqual({type: ANIMATION_ON_FALSE})
  })

  it("Should codeSampleChanged", () => {
    const input = true
    const payload = {value: input}
    const result = fillObjectTemplate(CODE_SAMPLE_CHANGED, payload)
    expect(actions.codeSampleChanged(input)).toEqual(result)
  })
})
