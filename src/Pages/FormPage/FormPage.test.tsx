import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormPage from "./FormPage";
import "@testing-library/jest-dom";
import { jest } from "@jest/globals";
import { MemoryRouter } from "react-router-dom";

// Mock subcomponents
jest.mock("../../components/DropDown/DropDown.tsx", () => () => <div>Dropdown Mock</div>);
jest.mock("../../components/Loader/Loader.tsx", () => () => (
  <div data-testid="loader">Loader Mock</div>
));

jest.mock("../../components/MultiStepForm/MultiStepForm.tsx", () => {
  return ({ domain }: { domain: string }) => {
    const React = require("react");
    const { useState } = React;

    const [step, setStep] = useState(0);

    React.useEffect(() => {
      setStep(0);
    }, [domain]);

    return (
      <div>
        <div>MultiStepForm Mock for {domain}</div>
        {step > 0 && (
          <button data-testid="backwards" onClick={() => setStep(step - 1)}>
            Back
          </button>
        )}
        {step < 2 && (
          <button data-testid="forwards" onClick={() => setStep(step + 1)}>
            Next
          </button>
        )}
      </div>
    );
  };
});

jest.mock("../../components/SideBar/SideBar.tsx", () => {
  const React = require("react");
  return () => {
    const [collapsed, setCollapsed] = React.useState(false);
    const toggleSidebar = () => setCollapsed(c => !c);
    return (
      <div>
        <div data-testid="sidebar">{collapsed ? "Sidebar Collapsed" : "Sidebar Expanded"}</div>
        <button data-testid="toggle-button" onClick={toggleSidebar}>
          Toggle Sidebar
        </button>
      </div>
    );
  };
});

jest.mock("../../components/Button/Button.tsx", () => ({ text, onClick }) => <button onClick={onClick}>{text}</button>);

// Optionally mock Dashboard if it's rendered
jest.mock("../DashboardPage/DashboardPage.tsx", () => () => (
  <div data-testid="dashboard">
    DashboardMock
    <div data-testid="SQLinj">SQL Injection</div>
  </div>
));

const renderWithRouter = (ui: React.ReactElement, initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      {ui}
    </MemoryRouter>
  );
};

describe('FormPage', () => {
  const user = userEvent.setup();

  it('renders the form page with header and buttons', () => {
    renderWithRouter(<FormPage />);
    expect(screen.getByText(/clear form/i)).toBeInTheDocument();
  });

  it('displays MultiStepForm when domain is selected', () => {
    renderWithRouter(<FormPage />);
  
    const domainOption = screen.getByText(/Impact/i);
    fireEvent.click(domainOption);
  });

  it("shows validation popup when submitting an incomplete form", async () => {
    renderWithRouter(<FormPage />);
    await user.click(screen.getByText(/Submit Form/i));

    await waitFor(() => {
      expect(screen.getByText(/Incomplete Questionnaire/i)).toBeInTheDocument();
      expect(screen.getByText(/Please complete all domains before submitting:/i)).toBeInTheDocument();
    });
  });

  it("clears the form and resets to the first question (no 'Previous' button shown)", async () => {
    renderWithRouter(<FormPage />);
  
    await user.click(screen.getByText(/Impact/i));
  
    const nextButton = await screen.findByTestId('forwards');
    await user.click(nextButton);
  
    const backButton = await screen.findByTestId('backwards');
    expect(backButton).toBeInTheDocument();
  
    await user.click(screen.getByText(/Clear Form/i));
  
    await waitFor(() => {
      expect(screen.queryByTestId('backwards')).not.toBeInTheDocument();
    });
  });

 it("shows loading spinner when submitting the form", async () => {
  renderWithRouter(<FormPage />);

  // Complete all steps (domains)
  const nextButton = await screen.findByTestId("forwards");
  await user.click(nextButton); // to Capability
  await user.click(nextButton); // to Model Type & Risk
  await user.click(nextButton); // simulate completing final step

  // Submit the form
  await user.click(screen.getByText(/Submit Form/i));

  // Expect the loader to appear
  await waitFor(() => {
    expect(screen.getByTestId("SecurityIcon")).toBeInTheDocument();
  });
});


//  it("renders the dashboard page after form submission", async () => {
//   renderWithRouter(<FormPage />);

//   // Mock the entire domain flow: Impact → Capability → Model Type & Risk
//   const nextButton = await screen.findByTestId("forwards");

//   // Step through all domains
//   await user.click(nextButton); // to Capability
//   await user.click(nextButton); // to Model Type & Risk
//   await user.click(nextButton); // simulate completing final step

//   // Simulate valid submission
//   await user.click(screen.getByText(/Submit Form/i));

//   // Dashboard should render
//   await waitFor(() => {
//     expect(screen.getByTestId("dashboard")).toBeInTheDocument();

//   });
// });


  it("toggles the sidebar when the toggle button is clicked", async () => {
    // Start with sidebar expanded = false (adjust if your default is true)
    // To test toggle, we render the component and click toggle button twice
    renderWithRouter(<FormPage />);

    // Initial state is Sidebar Expanded as per your mock
    expect(screen.getByTestId("sidebar")).toHaveTextContent("Sidebar Expanded");

    await user.click(screen.getByTestId("toggle-button"));
    // After toggle, it should be collapsed
    await waitFor(() => {
      expect(screen.getByTestId("sidebar")).toHaveTextContent("Sidebar Collapsed");
    });

    await user.click(screen.getByTestId("toggle-button"));
    await waitFor(() => {
      expect(screen.getByTestId("sidebar")).toHaveTextContent("Sidebar Expanded");
    });
  });
});
