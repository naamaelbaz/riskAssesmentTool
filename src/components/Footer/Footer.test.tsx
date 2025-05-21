import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  test('renders Contact Us section with emails', () => {
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  
    expect(screen.getByText((content) =>
      content.includes('elbazna@post.bgu.ac.il'))).toBeInTheDocument();
  
    expect(screen.getByText((content) =>
      content.includes('ofirhor@post.bgu.ac.il'))).toBeInTheDocument();
  
    expect(screen.getByText((content) =>
      content.includes('alklai@post.bgu.ac.il'))).toBeInTheDocument();
  });
  

  test('renders Follow Us section with social links', () => {
    expect(screen.getByText('Follow Us')).toBeInTheDocument();

    const linkedinLink = screen.getByRole('link', {
      name: /linkedin/i,
    });
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/naama-elbaz-41b720235/');

    const githubLink = screen.getByRole('link', {
      name: /github/i,
    });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/naamaelbaz/riskAssesmentTool');
  });

  test('renders social icons (links)', () => {
    const socialLinks = screen.getAllByRole('link');
    expect(socialLinks.length).toBeGreaterThanOrEqual(2);
  });
});
