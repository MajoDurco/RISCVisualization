import React from 'react';

import Editor from '../Editor/index'

class EditorWrapper extends React.Component { // eslint-disable-line react/prefer-stateless-function
	shouldComponentUpdate(){
		return false
	}

  render() {
    return (
			<Editor run={this.props.run} />
    );
  }
}

EditorWrapper.propTypes = {

};

export default EditorWrapper;
