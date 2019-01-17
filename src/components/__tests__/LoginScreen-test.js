import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import LoginScreen from '../../screens/LoginScreen';

describe('Login screen test', () => {
  it('renders the loading screen', async () => {
    const tree = renderer.create(<LoginScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
