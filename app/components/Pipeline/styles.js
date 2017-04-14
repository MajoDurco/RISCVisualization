import { Row } from 'hedron'
import styled from 'styled-components'

import { pulse } from '../animations'
import { ANIMATION_DURATION } from '../../containers/HomePage/constants'

export const SHORTEN_STAGES = "800px"
export const LOW_RESOLUTION = "375px"
export const LOW_RES_WIDTH = "11%"
export const HOVER_DIV_BREAK = "500px"

export const Cell = styled.div`
  animation-name: ${props => props.animation ? `${pulse}` : "none"};
  animation-duration: ${ANIMATION_DURATION}s;
  background: ${props => props.activeIndex ? "#94f7ed" : "none"};
  border: 1px solid;
  border-left: ${props => props.position === "first" ? "1px solid" : "none"};
  border-right: ${props => props.position === "last" ? "1px solid" : "none"};
  padding: 0;
  text-align: center;
  width: 10%;

  @media (max-width: ${LOW_RESOLUTION}){
  width: ${LOW_RES_WIDTH};
  }
`

export const Empty = styled.div`
  visibility: hidden;
  width: 10%;

  @media (max-width: ${LOW_RESOLUTION}){
  width: ${LOW_RES_WIDTH};
  }
`

export const PipeRow = styled(Row)`
  margin-bottom: -1px;
  position: relative;
  cursor: pointer;

  div:last-child {
    display: none; 
  }

  &:hover div:last-child {
    background: #fff;
    display: block;
    height: auto;
    left: 41%;
    position: absolute;
    top: 105%;
    width: auto;
    z-index: 1;
  }
`

export const Stage = styled.p`
  margin:0;
  opacity: 0.6;
  font-size: small;

 @media (max-width: ${SHORTEN_STAGES}){
  display: none;
 }
`

export const StageShort = styled.p`
  margin:0;
  opacity: 0.6;
  font-size: small;
  display: none;
   
  @media (max-width: ${SHORTEN_STAGES}){
    display: initial;
  }
`

export const Instruction = styled.p`
  margin:0;
`

export const PipeContainer = styled.div`
`
