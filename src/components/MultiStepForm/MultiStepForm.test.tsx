import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MultiStepForm from './MultiStepForm';
import '@testing-library/jest-dom';

// Mock data for questionsStorage and options
const mockQuestionsStorage = [
  { id: 'Q1', domain: 'Security', optId: 1, question: 'What is your security level?' },
  { id: 'Q2', domain: 'Security', optId: 2, question: 'Do you use encryption?' },
];

const mockOptions = [
  { id: 1, value: ['Low', 'Medium', 'High'] },
  { id: 2, value: ['Yes', 'No'] },
];

// Mock the imported modules
jest.mock('../../Schemas/step1schema.tsx', () => ({
  questionsStorage: [
    { id: 'Q1', domain: 'Security', optId: 1, question: 'What is your security level?' },
    { id: 'Q2', domain: 'Security', optId: 2, question: 'Do you use encryption?' },
  ],
  options: [
    { id: 1, value: ['Low', 'Medium', 'High'] },
    { id: 2, value: ['Yes', 'No'] },
  ],
}));

// Mock the QuestionItem component
jest.mock('../QuetionItem/QuetionItem.tsx', () => (props) => {
  const { question, options, selectedValue, onSelect } = props;
  return (
    <div>
      <p>{question.question}</p>
      {options.map((option) => (
        <button key={option} onClick={() => onSelect(question.id, option)}>
          {option}
        </button>
      ))}
    </div>
  );
});

describe('MultiStepForm Component', () => {
  const domain = 'Security';
  const allDomains = [{ id: 1, value: 'Security' }];
  const currentDomain = 'Security';

  let selectedAnswers = {};
  let selectedAllDomainAns = {};

  const setSelectedAnswers = jest.fn((newAnswers) => {
    selectedAnswers = newAnswers;
  });

  const setSelectedAllDomainAns = jest.fn((newAllDomainAns) => {
    selectedAllDomainAns = newAllDomainAns;
  });

  const onDomainChange = jest.fn();

  beforeEach(() => {
    selectedAnswers = {};
    selectedAllDomainAns = {};
    setSelectedAnswers.mockClear();
    setSelectedAllDomainAns.mockClear();
    onDomainChange.mockClear();
  });

  test('renders the first question', () => {
    render(
      <MultiStepForm
        domain={domain}
        selectedAnswers={selectedAnswers}
        setSelectedAnswers={setSelectedAnswers}
        selectedAllDomainAns={selectedAllDomainAns}
        setSelectedAllDomainAns={setSelectedAllDomainAns}
        allDomains={allDomains}
        currentDomain={currentDomain}
        onDomainChange={onDomainChange}
      />
    );

    expect(screen.getByText('What is your security level?')).toBeInTheDocument();
  });

  test('navigates to the next question', () => {
    render(
      <MultiStepForm
        domain={domain}
        selectedAnswers={selectedAnswers}
        setSelectedAnswers={setSelectedAnswers}
        selectedAllDomainAns={selectedAllDomainAns}
        setSelectedAllDomainAns={setSelectedAllDomainAns}
        allDomains={allDomains}
        currentDomain={currentDomain}
        onDomainChange={onDomainChange}
      />
    );
   
    
    const nextButton = screen.getByTestId('forwards');
    fireEvent.click(nextButton);

    expect(screen.getByText('Do you use encryption?')).toBeInTheDocument();
  });

  test('selects an option and updates selectedAnswers', () => {
    render(
      <MultiStepForm
        domain={domain}
        selectedAnswers={selectedAnswers}
        setSelectedAnswers={setSelectedAnswers}
        selectedAllDomainAns={selectedAllDomainAns}
        setSelectedAllDomainAns={setSelectedAllDomainAns}
        allDomains={allDomains}
        currentDomain={currentDomain}
        onDomainChange={onDomainChange}
      />
    );

    const optionButton = screen.getByRole('button', { name: 'High' });
    fireEvent.click(optionButton);

    expect(setSelectedAnswers).toHaveBeenCalled();
  });

  test('submits the form and displays success modal', async () => {
    render(
      <MultiStepForm
        domain={domain}
        selectedAnswers={{ Q1: ['High'], Q2: ['Yes'] }}
        setSelectedAnswers={setSelectedAnswers}
        selectedAllDomainAns={selectedAllDomainAns}
        setSelectedAllDomainAns={setSelectedAllDomainAns}
        allDomains={allDomains}
        currentDomain={currentDomain}
        onDomainChange={onDomainChange}
      />
    );

    // Navigate to the last question
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    // Click the submit button
    const submitButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Your answers have been saved successfully!')).toBeInTheDocument();
    });
  });
});
