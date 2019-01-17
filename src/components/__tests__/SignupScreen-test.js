import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import SignupScreen from '../../screens/SignupScreen';

describe('Login screen test', () => {
  it('renders the loading screen', async () => {
    const tree = renderer.create(<SignupScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
