import React from 'react'
import styled from 'styled-components'

const Header = styled.h1`
  color: #000000;
  display: inline-block;
  font-size: ${props => props.size ? props.size : `200%` };
  font-variant: small-caps;
  margin: 0;
  opacity: 0.7;
  padding: 0 20px;
  text-shadow: 1px 1px #8c8f91;
  ${props => props.stylex}
`

function SectionHeader({ message, size, stylex }) {
  return (
    <Header size={size} stylex={stylex}>
        {message}
    </Header>
  )
}

SectionHeader.propTypes = {
  message: React.PropTypes.string.isRequired,
  size: React.PropTypes.string,
  stylex: React.PropTypes.string,
}

export default SectionHeader
