import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  test('renders button with text', () => {
    render(<Button text="Click Me" color="text-white" />);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('applies custom classes', () => {
    render(
      <Button
        text="Styled Button"
        color="text-red-500"
        bgColor="bg-blue-200"
        wBorder="border border-solid"
      />
    );
    const textSpan = screen.getByText('Styled Button');
    const button = textSpan.closest('div.button')!;
    expect(button.className).toContain('bg-blue-200');
    expect(button.className).toContain('text-red-500');
    expect(button.className).toContain('border');
    expect(button.className).toContain('border-solid');
  });
  
  

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button text="Click Me" color="text-black" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button
        text="Disabled Button"
        color="text-black"
        onClick={handleClick}
        disabled={true}
      />
    );
    fireEvent.click(screen.getByText('Disabled Button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('renders an icon if provided', () => {
    const DummyIcon = () => <svg data-testid="icon" />;
    render(
      <Button
        text="Icon Button"
        color="text-black"
        Icon={DummyIcon}
      />
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
