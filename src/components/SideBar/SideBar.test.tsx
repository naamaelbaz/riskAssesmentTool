import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SidebarProgress from './SideBar';
import '@testing-library/jest-dom';

jest.mock('@mui/icons-material', () => ({
  CrisisAlert: () => <div data-testid="CrisisAlertIcon">CrisisAlertIcon</div>,
  ModelTraining: () => <div data-testid="ModelTrainingIcon">ModelTrainingIcon</div>,
  Construction: () => <div data-testid="ConstructionIcon">ConstructionIcon</div>,
  Menu: () => <div data-testid="MenuIcon">MenuIcon</div>,
}));

const mockDomainList = [
  { id: 1, value: 'Impact' },
  { id: 2, value: 'Capabilty' },
  { id: 3, value: 'Model Type & Risk' },
];

const mockCurrentDomain = 'Impact';
const mockOnDomainChange = jest.fn();
const mockOnToggle = jest.fn();

describe('SidebarProgress Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders icons when sidebar is open', () => {
    render(
      <SidebarProgress
        domainList={mockDomainList}
        currentDomain={mockCurrentDomain}
        onDomainChange={mockOnDomainChange}
        isOpen={true}
        onToggle={mockOnToggle}
      />
    );

    expect(screen.getByTestId('CrisisAlertIcon')).toBeInTheDocument();
    expect(screen.getByTestId('ModelTrainingIcon')).toBeInTheDocument();
    expect(screen.getByTestId('ConstructionIcon')).toBeInTheDocument();
  });

test('highlights the active domain', () => {
  render(
    <SidebarProgress
      domainList={mockDomainList}
      currentDomain={mockCurrentDomain}
      onDomainChange={mockOnDomainChange}
      isOpen={true}
      onToggle={mockOnToggle}
    />
  );

  const activeLabel = screen.getByText('Impact');

  // Go up to the `.step` wrapper (which has the `current` class)
  const stepWrapper = activeLabel.closest('.step');
  expect(stepWrapper).toHaveClass('current');
});



  test('calls onDomainChange when another domain is clicked', () => {
    render(
      <SidebarProgress
        domainList={mockDomainList}
        currentDomain={mockCurrentDomain}
        onDomainChange={mockOnDomainChange}
        isOpen={true}
        onToggle={mockOnToggle}
      />
    );

    fireEvent.click(screen.getByText('Capability'));
    expect(mockOnDomainChange).toHaveBeenCalledWith('Capability');
  });

  test('renders Menu icon when sidebar is closed and calls onToggle when clicked', () => {
    render(
      <SidebarProgress
        domainList={mockDomainList}
        currentDomain={mockCurrentDomain}
        onDomainChange={mockOnDomainChange}
        isOpen={false}
        onToggle={mockOnToggle}
      />
    );

    expect(screen.getByTestId('MenuIcon')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('MenuIcon'));
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

test('shows domain names when sidebar is open', () => {
  render(
    <SidebarProgress
      domainList={mockDomainList}
      currentDomain={mockCurrentDomain}
      onDomainChange={mockOnDomainChange}
      isOpen={true}
      onToggle={mockOnToggle}
    />
  );

  const impactLabel = screen.getByText('Impact');
  const parent = impactLabel.closest('.step');
  expect(parent).not.toBeNull();
  expect(parent).toHaveClass('current'); 
  expect(screen.getByText('Capability')).toBeInTheDocument();
  expect(screen.getByText('Model Type & Risk')).toBeInTheDocument();
});


  test('hides domain names when sidebar is closed', () => {
    render(
      <SidebarProgress
        domainList={mockDomainList}
        currentDomain={mockCurrentDomain}
        onDomainChange={mockOnDomainChange}
        isOpen={false}
        onToggle={mockOnToggle}
      />
    );

    expect(screen.queryByText('Impact')).not.toBeInTheDocument();
    expect(screen.queryByText('Capability')).not.toBeInTheDocument();
    expect(screen.queryByText('Model Type & Risk')).not.toBeInTheDocument();
  });
});
