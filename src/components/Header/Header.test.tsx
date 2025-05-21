import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Header component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    render(<Header />);
  });

  test('renders the logo text', () => {
    expect(screen.getByText('RiskAssesML')).toBeInTheDocument();
  });

  test('navigates to home when the icon is clicked', () => {
    const icon = screen.getByTestId('SecurityIcon'); // use test id selector instead of role
    fireEvent.click(icon);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
  
});
