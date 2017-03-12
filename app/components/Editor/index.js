import React from 'react';
import AceEditor from 'react-ace'
// import styled from 'styled-components';

import 'brace/theme/solarized_dark'

var TEXT = ""

class Editor extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
		const defVal = `add R1 R2 R3 ${'\n'}`
    return (
			<div>
				<AceEditor 
					theme="solarized_dark"
					fontSize={16}
					onChange={(text) => { TEXT = text }}
					onLoad={() => {TEXT = defVal}}
					defaultValue={defVal}
					width={'450'}
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
