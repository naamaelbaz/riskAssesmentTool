import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QuestionItem from './QuetionItem.tsx';
import '@testing-library/jest-dom';
import DropDown from '../DropDown/DropDown.tsx'; // Mock DropDown

// Mock DropDown component
jest.mock('../DropDown/DropDown.tsx', () => (props) => (
  <div onClick={() => props.onSelect(['option1'])}>
    <p>{props.title}</p>
    {props.options.map((option) => (
      <button key={option} onClick={() => props.onSelect([option])}>
        {option}
      </button>
    ))}
  </div>
));

// Sample data for the test
const mockQuestion = {
  id: 'Q1',
  question: 'What is your security level?',
  example: 'Choose the security level you require',
  multi: false,
};

const mockOptions = ['Low', 'Medium', 'High'];

const mockSelectedValue = 'Medium';

const mockOnSelect = jest.fn();

// Test suite for QuestionItem
describe('QuestionItem Component', () => {
  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  test('renders the question and options correctly', () => {
    render(
      <QuestionItem
        question={mockQuestion}
        options={mockOptions}
        selectedValue={mockSelectedValue}
        onSelect={mockOnSelect}
      />
    );

    // Check that the question is rendered
    expect(screen.getByText('What is your security level?')).toBeInTheDocument();

    // Check that the options are rendered in the DropDown component
    mockOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  test('displays tooltip when hovering over the icon', () => {
    render(
      <QuestionItem
        question={mockQuestion}
        options={mockOptions}
        selectedValue={mockSelectedValue}
        onSelect={mockOnSelect}
      />
    );

    // Tooltip content verification
    expect(screen.getByLabelText('Choose the security level you require')).toBeInTheDocument();

  });

  test('calls onSelect function when an option is selected', () => {
    render(
      <QuestionItem
        question={mockQuestion}
        options={mockOptions}
        selectedValue={mockSelectedValue}
        onSelect={mockOnSelect}
      />
    );

    const optionButton = screen.getByText('Low');
    fireEvent.click(optionButton);

    // Check if the onSelect function is called with the correct value
    expect(mockOnSelect).toHaveBeenCalledWith('Q1', ['Low']);
  });

  test('filters question text correctly', () => {
    // Question with a colon
    const mockQuestionWithColon = {
      ...mockQuestion,
      question: 'Security level: Choose the level of encryption',
    };

    render(
      <QuestionItem
        question={mockQuestionWithColon}
        options={mockOptions}
        selectedValue={mockSelectedValue}
        onSelect={mockOnSelect}
      />
    );

    // The filtered text should exclude everything before and including the first colon
    expect(screen.getByText('Choose the level of encryption')).toBeInTheDocument();
  });

  test('renders question without colon properly', () => {
    const mockQuestionWithoutColon = {
      ...mockQuestion,
      question: 'What is your name?',
    };

    render(
      <QuestionItem
        question={mockQuestionWithoutColon}
        options={mockOptions}
        selectedValue={mockSelectedValue}
        onSelect={mockOnSelect}
      />
    );

    // Check that the full question is displayed if there is no colon
    expect(screen.getByText('What is your name?')).toBeInTheDocument();
  });
});
