import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RecipeDetail from './Screens/RecipeDetail';
import { getFeedback, addFeedback } from './database/Sqlite';

jest.mock('./database/Sqlite.ts', () => ({
  getFeedback: jest.fn(),
  addFeedback: jest.fn(),
}));

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setParams: jest.fn(),
};

describe('RecipeDetail Component', () => {
  const mockRoute = {
    params: {
      id: 1,
      title: 'nasi garam',
      image: 'https://example.com/recipe-image.jpg',
      ingredients: ['garam', 'nasi'],
      instructions: ['masukan nasi', 'masukan garam'],
    },
  };

  it('memuat feedback dengan benar', async () => {
    const mockGetFeedback = getFeedback as jest.Mock;
    mockGetFeedback.mockResolvedValue([{ id: 1, feedbackText: 'Enak sekali!' }]);

    const { getByText } = render(
      <RecipeDetail route={mockRoute as any} navigation={mockNavigation as any} />
    );

    await waitFor(() => expect(getByText('Enak sekali!')).toBeTruthy());
  });

  it('menambah feedback dengan benar', async () => {
    const mockGetFeedback = getFeedback as jest.Mock;
    const mockAddFeedback = addFeedback as jest.Mock;

    mockGetFeedback.mockResolvedValue([]);
    mockAddFeedback.mockResolvedValue(undefined);

    const { getByPlaceholderText, getByText } = render(
      <RecipeDetail route={mockRoute as any} navigation={mockNavigation as any} />
    );

    const feedbackInput = getByPlaceholderText('Tambah feedback');
    fireEvent.changeText(feedbackInput, 'Resep yang luar biasa!');
    
    const sendButton = getByText('Kirim Feedback');
    fireEvent.press(sendButton);

    await waitFor(() => {
      expect(mockAddFeedback).toHaveBeenCalledWith(1, 'Resep yang luar biasa!');
    });
  });
});
