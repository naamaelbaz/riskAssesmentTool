import React from 'react';
import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DropDown from './DropDown'; // adjust the path as needed
import '@testing-library/jest-dom';

describe('DropDown component', () => {
  const options = [
    { id: 1, value: 'Apple' },
    { id: 2, value: 'Banana' },
    { id: 3, value: 'Cherry' },
  ];

  test('renders dropdown with title', () => {
    render(
      <DropDown
        options={options}
        onSelect={() => {}}
        title="Select Fruit"
        selVal=""
      />
    );
    expect(screen.getByText('Select Fruit')).toBeInTheDocument();
  });

  test('opens and closes dropdown on click', () => {
    render(
      <DropDown
        options={options}
        onSelect={() => {}}
        title="Select Fruit"
        selVal=""
      />
    );
    const header = screen.getByTestId('dropdown-header');
    fireEvent.click(header);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    fireEvent.click(header);
    expect(screen.queryByPlaceholderText('Search...')).not.toBeInTheDocument();
  });

  test('filters options based on search input', () => {
    render(
      <DropDown
        options={options}
        onSelect={() => {}}
        title="Select Fruit"
        selVal=""
      />
    );
    fireEvent.click(screen.getByTestId('dropdown-header'));
    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'Ban' },
    });
    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });

  test('shows "No options found" when no matches', () => {
    render(
      <DropDown
        options={options}
        onSelect={() => {}}
        title="Select Fruit"
        selVal=""
      />
    );
    fireEvent.click(screen.getByTestId('dropdown-header'));
    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'Zucchini' },
    });
    expect(screen.getByText('No options found')).toBeInTheDocument();
  });

  test('selects an option in single select mode', () => {
    const handleSelect = jest.fn();
    render(
      <DropDown
        options={options}
        onSelect={handleSelect}
        title="Select Fruit"
        selVal=""
      />
    );
    fireEvent.click(screen.getByTestId('dropdown-header'));
    fireEvent.click(screen.getByText('Banana'));
    expect(handleSelect).toHaveBeenCalledWith(['Banana']);
  });

  test('selects multiple options in multi-select mode', () => {
    const handleSelect = jest.fn();
    const Wrapper = () => {
      const [selected, setSelected] = useState<string[]>([]);
    
      return (
        <DropDown
          options={options}
          onSelect={(val) => {
            handleSelect(val);
            setSelected(val);
          }}
          title="Select Fruit"
          selVal={selected} 
          multiSelect={true}
        />
      );
    };
  
    render(<Wrapper />);
  
    fireEvent.click(screen.getByTestId('dropdown-header'));
    fireEvent.click(screen.getByText('Apple'));
    fireEvent.click(screen.getByText('Cherry'));
  
    // Wait for React to re-render
    expect(handleSelect).toHaveBeenCalledWith(['Apple']);
    expect(handleSelect).toHaveBeenCalledWith(['Apple', 'Cherry']);
  });
  
});
