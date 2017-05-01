import { fromJS } from 'immutable'

import * as reducers from '../reducers'
import * as actions from '../actions'

// export function updateCpuState(cpu_state){
// export function setStateLineIndex(index){
// export function openMemoryDrawer(open){
// export function codeSampleChanged(value){

describe("cpuReducer", () => {
  it("Should change state to new one", () => {
    const initial_cpu_state = fromJS({})
    const next_state = fromJS({next: "state"})
    expect(reducers.cpuReducer(initial_cpu_state,
      actions.updateCpuState(next_state))
        .equals(next_state))
      .toBeTruthy()
  })
})

describe("animation", () => {

  const initial_animation_state = fromJS({
    on: false
  })

  it("Should turn animation on", () => {
    expect(reducers.animation(initial_animation_state,
      actions.AnimationOn(true))
        .get('on'))
      .toBeTruthy()
  })

  it("Shoult turn animation off", () => {
    expect(reducers.animation(initial_animation_state,
      actions.AnimationOn(false))
        .get('on'))
      .toBeFalsy()
  })
})
