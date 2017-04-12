import React from 'react'
import styled from 'styled-components'
import { namedDivHeadAni, namedDivBodyAni } from '../animations'
import { ANIMATION_DURATION } from '../../containers/HomePage/constants'

const Panel = styled.div`
 padding: 5px;
`

const PanelHeader = styled.div`
  animation-name: ${props => props.animation ? `${namedDivHeadAni}` : `none`};
  animation-duration: ${ANIMATION_DURATION}s;
  background: ${props => props.changed ? `lightblue` : props.background_color};

  border: 1px solid ${props => props.border_color};
  border-bottom: none;
  border-top-left-radius: 5px;
  border-top-right-radius: 20px;
  display: inline-block;
  padding: 5px 10px 5px 5px;
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
  animation-name: ${props => props.animation ? `${namedDivBodyAni}` : `none`};
  animation-duration: ${ANIMATION_DURATION}s;

  background: ${props => props.changed ? `lightblue` : props.background_color};
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
        <PanelHeader 
          animation={this.props.animation}
          background_color={background_color} 
          border_color={border_color}
          changed={this.props.changed}
        >
          <p>{this.props.header}</p>
        </PanelHeader>
        <PanelContent 
          animation={this.props.animation}
          background_color={background_color} 
          border_color={border_color}
          changed={this.props.changed}
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
  header: React.PropTypes.string,
  animation: React.PropTypes.bool,
  changed: React.PropTypes.bool
}

export default NamedDiv
