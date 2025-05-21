import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "./HomePage";
import { BrowserRouter as Router } from "react-router-dom";

// ✅ Define the mock function outside the mock factory
const mockNavigate = jest.fn();

// ✅ Use jest.mock with static return for useNavigate
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");

  return {
    __esModule: true,
    ...originalModule,
    useNavigate: () => mockNavigate,
  };
});

// ✅ Mock components
jest.mock("../../components/Header/Header.tsx", () => () => <div>Header Mock</div>);
jest.mock("../../components/Button/Button.tsx", () => ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => <button onClick={onClick}>{text}</button>);
jest.mock("../../components/Footer/Footer.tsx", () => () => <div>Footer Mock</div>);

describe("HomePage", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders the page with header, buttons, and content", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    expect(screen.getByText(/Welcome To RiskAssesML/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Your go-to tool for assessing the risk of ML systems against AML threats./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
    expect(screen.getByText(/Learn More/i)).toBeInTheDocument();
    expect(screen.getByText(/Recent Updates/i)).toBeInTheDocument();
    expect(screen.getByText(/New ML models integrated for better risk analysis - Oct 2023/i)).toBeInTheDocument();
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
  });

  it("navigates to '/form' when 'Get Started' button is clicked", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    fireEvent.click(screen.getByText(/Get Started/i));
    expect(mockNavigate).toHaveBeenCalledWith("/form");
  });

  it("navigates to '/login' when 'Learn More' button is clicked", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    fireEvent.click(screen.getByText(/Learn More/i));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
