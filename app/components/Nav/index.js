import React from 'react'
import styled from 'styled-components'

import { media } from '../media.js'
import cpu from './cpu.png'
import { Link } from 'react-router'

const Navig = styled.div`
	margin: 0;
	padding: 0;
	width: 100uv;

	& * {
		display: inline;
		height: 50px;
		width: 50px;

		${media.tablet`
			height: 35px;
			width: 35px;
		`}
		${media.phone`
			height: 25px;
			width: 25px;
		`}
	}
`

const ImgCpu = styled.img`
	margin: 0 20px;
`

const NavLink = styled(Link)`
	text-decoration: none;
`

function Nav() {
  return (
		<Navig>
			<NavLink to='/'>
				<ImgCpu src={cpu} />
				<h3>RISC Visualization Tool</h3>
			</NavLink>
		</Navig>
  );
}

export default Nav
