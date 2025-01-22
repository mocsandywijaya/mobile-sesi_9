import React from 'react';
import renderer, { act } from 'react-test-renderer';
import App from '../src/App'

jest.mock('./database/Sqlite.ts', () => ({
  initDatabase: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: any) => children,
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: jest.fn().mockImplementation(() => {
    return {
      Navigator: ({ children }: any) => children,
      Screen: ({ children }: any) => children,
    };
  }),
}));

describe('App Component', () => {
    it('renders correctly', async () => {
      let tree: renderer.ReactTestRenderer | undefined;
      await act(async () => {
        tree = renderer.create(<App />);
      });
      expect(tree!.toJSON()).toMatchSnapshot(); 
    });
  });
  
