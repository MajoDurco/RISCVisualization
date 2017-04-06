import React from 'react';
import AceEditor from 'react-ace'
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton'
import PlayCircle from 'material-ui/svg-icons/av/play-circle-outline'

import 'brace/theme/monokai'

var TEXT = ""

class Editor extends React.Component {

  shouldComponentUpdate(){
  return false
  }

  render() {
		const defVal = `add R1 R2 R3 ${'\n'}`

    return (
      <div>
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
    );
  }
}

Editor.propTypes = {
	run: React.PropTypes.func.isRequired
};

export default Editor;
