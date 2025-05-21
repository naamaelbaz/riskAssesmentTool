// Mocks MUST be defined before other imports to work properly with ESM
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...original,
    useNavigate: () => mockNavigate,
  };
});

// Now import everything else
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock child components
jest.mock('./components/Header/Header', () => () => <div>Header Mock</div>);
jest.mock('./components/Footer/Footer', () => () => <div>Footer Mock</div>);

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders header component', () => {
  render(<App />);
  expect(screen.getByText('Header Mock')).toBeInTheDocument();
});

test('renders footer component', () => {
  render(<App />);
  expect(screen.getByText('Footer Mock')).toBeInTheDocument();
});

test('renders main content correctly', () => {
  render(<App />);
  expect(
    screen.getByText(/Your go-to tool for assessing the risk of ML systems/i)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/New ML models integrated for better risk analysis - Oct 2023/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/About Us/i)).toBeInTheDocument();
});

test('navigates to the correct page when a link is clicked', () => {
  render(<App />);

  const learnMoreLink = screen.getByText(/learn more/i);
  fireEvent.click(learnMoreLink);

  expect(mockNavigate).toHaveBeenCalledWith('/login'); // Adjust path if needed
});
