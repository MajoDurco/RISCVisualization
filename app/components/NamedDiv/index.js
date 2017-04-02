import React from 'react'
import styled from 'styled-components'

const Panel = styled.div`
 // box-shadow: 1px 1px 1px rgba(0, 0, 0, .2);
 // -webkit-box-shadow: 1px 1px 1px rgba(0, 0, 0, .2);
 padding: 5px;
`

const PanelHeader = styled.div`
	background: ${props => props.background_color};
	border: 1px solid ${props => props.border_color};
  border-bottom: none;
  border-top-left-radius: 5px;
  border-top-right-radius: 20px;
  display: inline-block;
	padding: 5px 15px 5px 5px;
  position: relative;
	font-weight: bold;
	font-size: large;
  top: 2px;
	z-index: 1;

	& * {
		display: inline;
	}
`

const PanelContent = styled.div`
	background: ${(props) => props.background_color};
	border: 1px solid ${props => props.border_color};
	border-radius: 0 5px 5px 5px;
	padding: 5px;
	position: relative;

	& * {
		margin-top:0;
	}
`

class NamedDiv extends React.PureComponent { 
  render() {
		const background_color = this.props.background_color ? this.props.background_color : '#ffffff'
		const border_color = this.props.border_color ? this.props.border_color : '#0076e5'
    return (
			<Panel>
				<PanelHeader background_color={background_color} 
					border_color={border_color}
				>
					<p>{this.props.header}</p>
				</PanelHeader>
				<PanelContent background_color={background_color} 
					border_color={border_color}
				>
					{this.props.children}
				</PanelContent>
			</Panel>
    )
  }
}

NamedDiv.propTypes = {
	background_color: React.PropTypes.string,
	border_color: React.PropTypes.string,
	children: React.PropTypes.element.isRequired,
	header: React.PropTypes.string
}

export default NamedDiv
