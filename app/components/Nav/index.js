import React from 'react'
import styled from 'styled-components'

import { media } from '../media.js'
import cpu from './cpu.png'
import { Link } from 'react-router'
import Header from '../SectionHeader/index'

const Navig = styled.div`
	margin: 0;
	padding: 0;
	width: 100uv;

	& * {
		display: inline;
		height: 40px;
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
  vertical-align: top;
`

const NavLink = styled(Link)`
	text-decoration: none;
`

function Nav() {
  return (
		<Navig>
			<NavLink to='/'>
				<ImgCpu src={cpu} />
        <Header message="RISC Visualization Tool" />
			</NavLink>
		</Navig>
  );
}

export default Nav
