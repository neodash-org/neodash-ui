import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './page';

describe('Home', () => {
  it('renders the Next.js logo', () => {
    render(<Home />);
    expect(screen.getByAltText('Next.js logo')).toBeInTheDocument();
  });

  it('renders the Deploy now button', () => {
    render(<Home />);
    expect(screen.getByText('Deploy now')).toBeInTheDocument();
  });

  it('renders the Read our docs button', () => {
    render(<Home />);
    expect(screen.getByText('Read our docs')).toBeInTheDocument();
  });
});
