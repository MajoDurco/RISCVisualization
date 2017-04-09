import styled from 'styled-components'

export const close_button = {
	position: `fixed`,
	top: `40vh`,
	right: 0,
	transform: `rotate(-90deg)`,
	"transformOrigin": `bottom right`,
	"msTransform": `rotate(-90deg)`,
	"WebkitTransform": `rotate(-90deg)`,
}

export const open_button = {
	position: `absolute`,
	top: `40vh`,
	left: `0`,
	"transformOrigin": `left bottom`,
	transform: `rotate(90deg)`,
	"msTransform": `rotate(90deg)`,
	"WebkitTransform": `rotate(90deg)`,
}

export const open_icon = {
	transform: `rotate(-90deg)`,
	"msTransform": `rotate(-90deg)`,
	"WebkitTransform": `rotate(-90deg)`,
}

export const close_icon = {
	transform: `rotate(90deg)`,
	"msTransform": `rotate(90deg)`,
	"WebkitTransform": `rotate(90deg)`,
}

export const MemoryDrawer = styled.div`
 div:first-child {
    z-index: 1;
 }
`
