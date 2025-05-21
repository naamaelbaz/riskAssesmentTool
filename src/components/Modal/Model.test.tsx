import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal component', () => {
  const mockOnClose = jest.fn();
  const testMessage = 'This is a success message';

  beforeEach(() => {
    render(<Modal onClose={mockOnClose} message={testMessage} />);
  });

  test('renders the modal with the given message', () => {
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  test('renders close and check icons', () => {
    const closeIcon = screen.getByTestId('CloseIcon');
    const checkIcon = screen.getByTestId('CheckCircleIcon');
    expect(closeIcon).toBeInTheDocument();
    expect(checkIcon).toBeInTheDocument();
  });
  
  test('calls onClose when close icon is clicked', () => {
    const closeIcon = screen.getByTestId('CloseIcon');
    fireEvent.click(closeIcon);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  
});
