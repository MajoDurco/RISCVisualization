import React from 'react';

import _ from 'lodash'
// import styled from 'styled-components';

class Registers extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
		const reg_list = _.toPairs(this.props.reg_state) // [[REG, VALUE],[...], ...]
		const registers = reg_list.map((register) => {
			const name = register[0]
			const value = register[1]
			return (
			<div key={name}>
				<p><b>{name}</b></p>
				<p>{value}</p>
			</div>
			)
		})
    return (
      <div>
				{registers}
      </div>
    );
  }
}

Registers.propTypes = {
	reg_state: React.PropTypes.object.isRequired
};

export default Registers;
