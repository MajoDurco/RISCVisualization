import AceEditor from 'react-ace'
import PlayCircle from 'material-ui/svg-icons/av/play-circle-outline'
import RaisedButton from 'material-ui/RaisedButton'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import React from 'react'
import styled from 'styled-components'
import 'brace/theme/monokai'

import InstructionDiv from '../InstructionDiv/index.js'
import SectionHeader from '../SectionHeader/index'
import code_samples from './samples'

const EditorHeader = styled.div`
  padding-right: 5%;
  display: flex;
  justify-content: space-between;
`

var TEXT = ""

class Editor extends React.Component {

  shouldComponentUpdate(next_props){
    if(this.props.code_sample !== next_props.code_sample)
      return true
    return false
  }

  render() {
    return (
      <div>
        <EditorHeader>
          <SectionHeader 
            message="Editor"
            size="150%"
          />
          <DropDownMenu 
            onChange={(event, index, value) => { 
              this.props.code_sample_change(value)
              if(this.props.code_sample !== value) // if choosen the same option dont change TEXT
                TEXT = code_samples[value]
            }}
            value={this.props.code_sample}
          >
            <MenuItem 
              value={'default'}
              primaryText='Choose Example Code' 
            />
            <MenuItem 
              value={'simple'}
              primaryText='Simple'
            />
            <MenuItem 
              value={'empty'}
              primaryText='Empty'
            />
          </DropDownMenu>
          <InstructionDiv />
        </EditorHeader>
        <AceEditor 
          className="editor"
          theme="monokai"
          fontSize={20}
          onChange={(text) => {TEXT = text}}
          value={code_samples[this.props.code_sample]}
          editorProps={{$blockScrolling: true}}
        />
        <RaisedButton
          label="Run"
          backgroundColor="#a4c639"
          icon={<PlayCircle />}
          onClick={() => this.props.run(TEXT)}
        />
      </div>
    )
  }
}

Editor.propTypes = {
	run: React.PropTypes.func.isRequired,
  code_sample: React.PropTypes.string,
  code_sample_change: React.PropTypes.func
};

export default Editor;
