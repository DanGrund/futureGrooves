import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Header from './Header';
import Button from '../Button/Button';

describe('<Header/>', () => {

  it('should display a single h1 tag', () => {
    const wrapper = shallow(<Header/>);
    expect(wrapper.find('h1')).to.have.length(1);
  });

  it('should trigger our logStuff', () => {
    const logStuff = sinon.spy()
    const wrapper = mount(<Button handleClick={logStuff} />)
    wrapper.simulate('click')
    expect(logStuff.calledOnce).to.equal(true)
  })
});
