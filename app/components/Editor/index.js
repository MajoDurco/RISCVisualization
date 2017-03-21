import React from 'react';
import AceEditor from 'react-ace'

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
					theme="monokai"
					fontSize={20}
					onChange={(text) => {TEXT = text}}
					onLoad={() => {TEXT = defVal}}
					defaultValue={defVal}
					width={'450'}
					editorProps={{$blockScrolling: true}}
				/>
				<button onClick={() => this.props.run(TEXT)}>Run</button>
			</div>
    );
  }
}

Editor.propTypes = {
	run: React.PropTypes.func.isRequired
};

export default Editor;
