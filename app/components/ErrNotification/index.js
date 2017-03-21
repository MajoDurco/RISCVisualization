import React from 'react';

class ErrNotification extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
		const errors = this.props.errors.map((error, index) => {
			if(error.line)
				return (<p key={index}>
						<b>Line: {error.line}</b> {error.text}
					</p>)
			return (<p key={index}>
					{error.text}
				</p>)
		})

    return (
			<div>
				{errors}
			</div>
    )
  }
}

ErrNotification.propTypes = {
	errors : React.PropTypes.array.isRequired
};

export default ErrNotification;
