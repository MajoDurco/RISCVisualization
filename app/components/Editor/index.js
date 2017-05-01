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
              primaryText='Choose Code' 
            />
            <MenuItem 
              value={'arithmetic'}
              primaryText='Arithmetic Instr.'
            />
            <MenuItem 
              value={'jumps'}
              primaryText='Jump & Branch Instr.'
            />
            <MenuItem 
              value={'hazzard'}
              primaryText='Data hazzard example'
            />
            <MenuItem 
              value={'jump_loop'}
              primaryText='Jump infinite loop'
            />
            <MenuItem 
              value={'runtime_err'}
              primaryText='Runtime error'
            />
            <MenuItem 
              value={'empty'}
              primaryText='Empty editor'
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
