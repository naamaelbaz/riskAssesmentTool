import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader component', () => {
  test('renders loader overlay and icon', () => {
    render(<Loader />);
    
    // Check overlay container exists
    expect(screen.getByTestId('loader-overlay')).toBeInTheDocument();


    // Check that the MUI SecurityIcon (SVG) is rendered
    const icon = screen.getByTestId('SecurityIcon');
    expect(icon).toBeInTheDocument();
    
  });
});
