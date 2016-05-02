import React from 'react';
import SkinDeep from 'skin-deep';
import { expect } from 'chai';

import { VeteranAddressSection } from '../../../../src/client/components/personal-information/VeteranAddressSection';
import { makeField } from '../../../../src/client/reducers/fields';

describe('<VeteranAddressSection>', () => {
  const nullAddress = {
    street: makeField(''),
    city: makeField(''),
    country: makeField(''),
    state: makeField(''),
    zipcode: makeField(''),
  };
  const mockEmail = makeField('mock@aol.com', true);

  it('Sanity check the component renders', () => {
    const tree = SkinDeep.shallowRender(<VeteranAddressSection data={{ address: nullAddress, email: makeField(''), emailConfirmation: makeField('') }}/>);
    const vdom = tree.getRenderOutput();
    expect(vdom.props.children).to.exist;
  });

  describe('Email confimration', () => {
    it('does not include `error` prop when matches Email', () => {
      const tree = SkinDeep.shallowRender(
        <VeteranAddressSection data={{ address: nullAddress, email: mockEmail, emailConfirmation: mockEmail }}/>);
      const emailInputs = tree.everySubTree('Email');
      expect(emailInputs).to.have.lengthOf(2);
      expect(emailInputs[1].props.error).to.be.undefined;
    });

    it('does include `error` prop when does not match Email', () => {
      const tree = SkinDeep.shallowRender(
        <VeteranAddressSection data={{ address: nullAddress, email: makeField(''), emailConfirmation: mockEmail }}/>);
      const emailInputs = tree.everySubTree('Email');
      expect(emailInputs).to.have.lengthOf(2);
      expect(emailInputs[1].props.error).to.not.be.undefined;
    });
  });
});