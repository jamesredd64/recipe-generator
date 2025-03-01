import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import SignUp from '../src/pages/SignUp';
import { auth } from '../src/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// Mock Firebase auth
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  auth: jest.fn()
}));

// Mock react-router-dom's useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('SignUp Component', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  test('renders SignUp form with all required elements', () => {
    renderWithRouter(<SignUp />);
    
    // Check for main headings
    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.getByText('Sign up for your account')).toBeInTheDocument();
    
    // Check for form elements
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  test('validates email format', async () => {
    renderWithRouter(<SignUp />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    // Test invalid email
    await userEvent.type(emailInput, 'invalid-email');
    fireEvent.click(submitButton);
    
    expect(screen.getByText('Invalid email format.')).toBeInTheDocument();
  });

  test('validates password length', async () => {
    renderWithRouter(<SignUp />);
    
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    // Test short password
    await userEvent.type(passwordInput, '12345');
    fireEvent.click(submitButton);
    
    expect(screen.getByText('Password must be at least 6 characters long.')).toBeInTheDocument();
  });

  test('handles successful signup', async () => {
    renderWithRouter(<SignUp />);
    
    // Mock successful signup
    createUserWithEmailAndPassword.mockResolvedValueOnce({});
    
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        'test@example.com',
        'password123'
      );
    });
  });

  test('handles signup error', async () => {
    renderWithRouter(<SignUp />);
    
    // Mock failed signup
    const errorMessage = 'Email already in use';
    createUserWithEmailAndPassword.mockRejectedValueOnce({ message: errorMessage });
    
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test('shows loading state during signup', async () => {
    renderWithRouter(<SignUp />);
    
    // Mock delayed signup
    createUserWithEmailAndPassword.mockImplementationOnce(() => 
      new Promise(resolve => setTimeout(resolve, 100))
    );
    
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    fireEvent.click(submitButton);

    expect(submitButton).toHaveAttribute('disabled');
    expect(screen.getByText('Signing up')).toBeInTheDocument();
  });
});
