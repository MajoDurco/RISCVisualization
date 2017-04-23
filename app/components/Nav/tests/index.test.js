import React from 'react'
import renderer from 'react-test-renderer'

import Nav from '../index'

it('nav renders correctly', () => {
  const navigation_bar = renderer.create(
    <Nav />
  ).toJSON();
  expect(navigation_bar).toMatchSnapshot();
});
