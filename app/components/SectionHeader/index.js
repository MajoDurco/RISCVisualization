import React from 'react'
import styled from 'styled-components'

const Header = styled.h1`
  color: #000000;
  display: inline-block;
  font-size: ${props => props.size ? props.size : `200%` };
  font-variant: small-caps;
  margin: 0;
  opacity: 0.6;
  padding: 0 20px;
  text-shadow: 1px 2px #0076E5;
`

function SectionHeader({ message, size }) {
  return (
    <Header size={size}>
        {message}
    </Header>
  )
}

SectionHeader.propTypes = {
  message: React.PropTypes.string.isRequired,
  size: React.PropTypes.string
}

export default SectionHeader
