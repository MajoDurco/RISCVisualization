import AceEditor from 'react-ace'
import PlayCircle from 'material-ui/svg-icons/av/play-circle-outline'
import RaisedButton from 'material-ui/RaisedButton'
import React from 'react';
import styled from 'styled-components'
import 'brace/theme/monokai'

import HoverDiv from '../HoverDiv/index.js'
import SectionHeader from '../SectionHeader/index'

const EditorHeader = styled.div`
  padding-right: 5%;
  display: flex;
  justify-content: space-between;
`

var TEXT = ""

class Editor extends React.Component {

  shouldComponentUpdate(){
  return false
  }

  render() {
		const defVal = `add R1 R2 R3 ${'\n'}`

    return (
      <div>
        <EditorHeader>
          <SectionHeader message="Editor" size="150%" />
          <HoverDiv />
        </EditorHeader>
        <AceEditor 
          className="editor"
          theme="monokai"
          fontSize={20}
          onChange={(text) => {TEXT = text}}
          onLoad={() => {TEXT = defVal}}
          defaultValue={defVal}
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
	run: React.PropTypes.func.isRequired
};

export default Editor;
