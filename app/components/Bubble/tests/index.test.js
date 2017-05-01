import React from 'react';
import renderer from 'react-test-renderer'

import Buble from '../index';

describe('<Buble />', () => {
  it('Snapshots bubble component', () => {
    const buble = renderer.create(
      <Buble height={'100px'} width={'100px'} />
    ).toJSON()
    expect(buble).toMatchSnapshot()
  })
})
