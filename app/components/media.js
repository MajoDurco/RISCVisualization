import React from 'react'
import { css } from 'styled-components'
import { BreakpointProvider } from 'hedron'

const sizes = {
  giant: 1900,
  desktop: 1280,
  tablet: 768,
  phone: 376
}

export const media = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})

export const HedronMedia = (props) => (
  <BreakpointProvider breakpoints={{
    lg: 1800, // 1880 lower md, lg 1880 up
    md: 1100, // 1164 lower sm
    sm: 600, // 446 lower xs
  }}>
    {props.children}
  </BreakpointProvider>
)
