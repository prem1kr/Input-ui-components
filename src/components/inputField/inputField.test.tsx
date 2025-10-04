import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from './inputField';

describe('InputField', () => {
  it('renders label and placeholder', () => {
    render(<InputField label="Test" placeholder="Type here" />);
    expect(screen.getByLabelText('Test')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument();
  });

  it('shows error message when invalid', () => {
    render(<InputField invalid errorMessage="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('can toggle password visibility', () => {
    render(<InputField passwordToggle />);
    const button = screen.getByRole('button', { name: /show password|hide password/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });
});
