// src/components/__tests__/ButtonComponent.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ButtonComponent from '../components/ButtonComponent'; // pastikan path ini sesuai

describe('<ButtonComponent />', () => {
  it('renders correctly with the given label', () => {
    const { getByText } = render(<ButtonComponent label="Click Me" onPress={() => {}} />);
    
    // Memastikan label "Click Me" muncul di UI
    getByText('Click Me');
  });

  it('calls onPress when button is clicked', () => {
    const onPressMock = jest.fn(); // Membuat mock function untuk onPress
    const { getByText } = render(<ButtonComponent label="Click Me" onPress={onPressMock} />);
    
    // Menemukan tombol berdasarkan teks dan mensimulasikan klik
    fireEvent.press(getByText('Click Me'));
    
    // Memastikan mock function dipanggil sekali setelah tombol ditekan
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
