import { keyframes } from 'styled-components'

export const pulse = keyframes`
  from {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
`

export const pulseMemVal = keyframes`
  from {
    transform: scale3d(1, 1, 1);
    font-size: 1.5em;
  }

  50% {
    transform: scale3d(1.1, 1.1, 1.1);
    font-size: 2em;
  }

  to {
    transform: scale3d(1, 1, 1);
    font-size: 1.5em 
  }
`

export const namedDivHeadAni = keyframes`
  from {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
`

export const namedDivBodyAni = keyframes`
  from {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.05, 1.1, 1.1);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
`
