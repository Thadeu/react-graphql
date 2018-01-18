import React from 'react';
import App from '@app/index';
import { shallow, mount } from 'enzyme';

it('renders title and subtitle', () => {
  const wrapper = shallow( 
    <App /> 
  );

  // expect(wrapper.text()).toContain('GraphQL')
  // expect(wrapper).toMatchSnapshot()
});