import React from 'react';

import Nav from '../../components/Nav/index'

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div>
				<Nav />
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}
