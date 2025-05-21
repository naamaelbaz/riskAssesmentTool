import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DashboardPage from './DashboardPage';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

const mockData = {
  attacks: [
    {
      attackId: 'attack-1',
      attack_name: 'SQL Injection',
      objective: 'Integrity',
      score: 7.5,
      description: 'SQL injection attack',
    },
    {
      attackId: 'attack-2',
      attack_name: 'Cross-Site Scripting',
      objective: 'Privacy',
      score: 5.2,
      description: 'XSS attack',
    },
  ],
};

jest.mock('../../data/mitigations-data.json', () => [
  {
    name: 'SQL Injection Mitigation',
    description: 'Use prepared statements.',
    implementationSteps: [
      { step: 'Step 1', description: 'Validate input', complexity: 'Medium', effectivenessScore: 7 },
      { step: 'Step 2', description: 'Escape input', complexity: 'High', effectivenessScore: 8 },
    ],
    effectivenessScore: 7.5,
    resourceRequirement: 'Medium',
    applicableAttacks: ['attack-1'],
  },
  {
    name: 'XSS Mitigation',
    description: 'Sanitize user input.',
    implementationSteps: [
      { step: 'Step 1', description: 'Escape HTML', complexity: 'High', effectivenessScore: 8 },
      { step: 'Step 2', description: 'Use CSP', complexity: 'Low', effectivenessScore: 6 },
    ],
    effectivenessScore: 7,
    resourceRequirement: 'Low',
    applicableAttacks: ['attack-2'],
  },
], { virtual: true });

describe('DashboardPage', () => {
  it('renders dashboard with data', async () => {
    render(
      <MemoryRouter>
        <DashboardPage data={mockData} />
      </MemoryRouter>
    );

    expect(screen.getByText(/ML Security Risk Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/SQL Injection/i)).toBeInTheDocument();
    expect(screen.getByText(/Cross-Site Scripting/i)).toBeInTheDocument();
  });

  test('displays mitigation summary when "View Implementation Steps" is clicked', async () => {
    render(
      <MemoryRouter>
        <DashboardPage data={mockData} />
      </MemoryRouter>
    );
  
    const xssAttackItem = await screen.findByText(/Cross-Site Scripting/i, { exact: false });
    expect(xssAttackItem).toBeInTheDocument();
  
    // Click the attack item to see mitigations
    await userEvent.click(xssAttackItem);
  
    // Click the "View Implementation Steps" button
    const viewStepsButton = await screen.findByRole('button', { name: /View Implementation Steps/i });
    expect(viewStepsButton).toBeInTheDocument();
  
    await userEvent.click(viewStepsButton);
  
    // Now check for the mitigation summary header
    const mitigationHeader = await screen.findByTestId('Mitigation');
    expect(mitigationHeader).toBeInTheDocument();
  });
  

  test('displays the correct risk scores and levels', async () => {
    render(
      <MemoryRouter>
        <DashboardPage data={mockData} />
      </MemoryRouter>
    );

    const integrityRiskItems = screen.getAllByText((_, el) =>
      el?.textContent?.includes('Integrity Risk') ?? false
    );
    expect(integrityRiskItems.length).toBeGreaterThan(0);

    const privacyRiskItems = screen.getAllByText(/Privacy Risk/i);
    expect(privacyRiskItems.length).toBeGreaterThan(0);
  });

  it('displays implementation steps when a mitigation is selected', async () => {
    render(
      <MemoryRouter>
        <DashboardPage data={mockData} />
      </MemoryRouter>
    );

    const attackButton = screen.getByText(/SQL Injection/i);
    await userEvent.click(attackButton);

    await screen.findByText(/SQL Injection Mitigation/i);

    const mitigationButton = screen.getByText(/SQL Injection Mitigation/i);
    await userEvent.click(mitigationButton);

    const implementationHeaders = screen.getAllByText(/Implementation Steps/i);
    expect(implementationHeaders.length).toBeGreaterThan(0);

    expect(screen.getByText(/Step 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Step 2/i)).toBeInTheDocument();
  });

  it('refreshes data when the refresh button is clicked', async () => {
    render(
      <MemoryRouter>
        <DashboardPage data={mockData} />
      </MemoryRouter>
    );

    const refreshButton = screen.getByRole('button', { name: /Refresh Data/i });
    await userEvent.click(refreshButton);

    expect(refreshButton).toHaveTextContent(/Refreshing.../i);
  });

  it('displays the correct overall risk values', async () => {
    render(
      <MemoryRouter>
        <DashboardPage data={mockData} />
      </MemoryRouter>
    );

    const overallRiskElements = screen.getAllByText(/Overall Risk/i);
    expect(overallRiskElements.length).toBeGreaterThan(0);

    expect(screen.getByText('7.5')).toBeInTheDocument(); // Integrity score
    expect(screen.getByText('5.2')).toBeInTheDocument(); // Privacy score

    const integrityItems = screen.getAllByText((_, el) =>
      el?.textContent?.includes('Integrity Risk') ?? false
    );
    expect(integrityItems.length).toBeGreaterThan(0);

    await waitFor(() => {
      const privacyItems = screen.getAllByText(/Privacy Risk/i);
      expect(privacyItems.length).toBeGreaterThan(0);
    });
  });
});
