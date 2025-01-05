// App.test.tsx
import 'react-native';
import React from 'react';
import App from '../App';  // Pastikan pathnya benar

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});
