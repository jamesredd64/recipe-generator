import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import SignUp from './SignUp';
import theme from '../styles/theme';

// Mock react-router-dom's useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderWithProviders = (component) => {
  return render(
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </ChakraProvider>
  );
};

describe('SignUp Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const fillForm = async (email = 'test@example.com', password = 'Test123!', confirmPassword = 'Test123!') => {
    await userEvent.type(screen.getByLabelText(/email/i), email);
    await userEvent.type(screen.getByLabelText(/^password$/i), password);
    await userEvent.type(screen.getByLabelText(/confirm password/i), confirmPassword);
  };

  test('renders signup form', () => {
    renderWithProviders(<SignUp />);

    expect(screen.getByText(/create account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  test('validates empty form submission', async () => {
    renderWithProviders(<SignUp />);

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });

  test('validates invalid email format', async () => {
    renderWithProviders(<SignUp />);

    await fillForm('invalid-email');

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    });
  });

  test('validates password requirements', async () => {
    renderWithProviders(<SignUp />);

    await fillForm('test@example.com', 'weak');

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/at least 6 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/at least one number/i)).toBeInTheDocument();
      expect(screen.getByText(/at least one uppercase letter/i)).toBeInTheDocument();
    });
  });

  test('validates password confirmation match', async () => {
    renderWithProviders(<SignUp />);

    await fillForm('test@example.com', 'ValidPass123', 'DifferentPass123');

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  test('handles successful signup', async () => {
    createUserWithEmailAndPassword.mockResolvedValueOnce({});

    renderWithProviders(<SignUp />);

    await fillForm('test@example.com', 'ValidPass123', 'ValidPass123');

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'ValidPass123'
      );
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  test('handles email already in use error', async () => {
    createUserWithEmailAndPassword.mockRejectedValueOnce({
      code: 'auth/email-already-in-use'
    });

    renderWithProviders(<SignUp />);

    await fillForm();

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/this email is already registered/i)).toBeInTheDocument();
    });
  });

  test('handles weak password error', async () => {
    createUserWithEmailAndPassword.mockRejectedValueOnce({
      code: 'auth/weak-password'
    });

    renderWithProviders(<SignUp />);

    await fillForm();

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/password is too weak/i)).toBeInTheDocument();
    });
  });

  test('clears errors when user types', async () => {
    renderWithProviders(<SignUp />);

    // Trigger error first
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });

    // Start typing
    await userEvent.type(screen.getByLabelText(/email/i), 't');

    await waitFor(() => {
      expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
    });
  });

  test('shows loading state during submission', async () => {
    createUserWithEmailAndPassword.mockImplementationOnce(() =>
      new Promise(resolve => setTimeout(resolve, 100))
    );

    renderWithProviders(<SignUp />);

    await fillForm();

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(screen.getByText(/signing up/i)).toBeInTheDocument();
  });
});
