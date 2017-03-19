import React from 'react';
import { Link } from 'react-router'
// import { FormattedMessage } from 'react-intl';

// import messages from './messages';

export default class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
		<div>
      <h1>
				Page Not Found
			</h1>
			<h1>
				Go Back <Link to='/'>Home</Link>
      </h1>
		</div>
    );
  }
}
