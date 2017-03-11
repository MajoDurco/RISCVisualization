import React from 'react'
import styled from 'styled-components'

import cpu from './cpu.png'

const Navig = styled.div`
	margin: 0;
	padding: 0;
	height: 40px;
	width: 100%;

	& * {
		display: inline;
	}
`

const ImgCpu = styled.img`
	height: inherit;
	width: 50px;
	margin-right: 15px;
`

function Nav() {
  return (
		<Navig>
			<ImgCpu src={cpu} />
			<h3>RISC Visualization Tool</h3>
		</Navig>
  );
}

export default Nav
