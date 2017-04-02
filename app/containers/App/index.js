import React from 'react';

import Nav from '../../components/Nav/index'
import { HedronMedia } from '../../components/media'

export default class App extends React.PureComponent {

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
			<HedronMedia>
				<div>
					<Nav />
					{React.Children.toArray(this.props.children)}
				</div>
			</HedronMedia>
    );
  }
}
