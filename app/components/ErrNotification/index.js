import React from 'react';
import styled from 'styled-components';

const ErrNotifcation = styled.div`
	position: absolute;
	left: 500px;
	height: 100px;
	width: 400px;
	background-color: lightblue;
`

class ErrNotification extends React.Component { // eslint-disable-line react/prefer-stateless-function
	componentWillMount(){
	 console.log("err nofif will mount")
	}
	componentWillUnmount(){
	 console.log("err unmount")
	}
  render() {
		const errors = this.props.errors.map((error, index) => {
			if(error.line)
				return (<p key={index}><b>{error.line}</b> {error.text}</p>)
			return (<p key={index}>{error.text}</p>)
		})

    return (
			<ErrNotifcation>
				{errors}
			</ErrNotifcation>
    )
  }
}

ErrNotification.propTypes = {
	errors : React.PropTypes.array.isRequired
};

export default ErrNotification;
