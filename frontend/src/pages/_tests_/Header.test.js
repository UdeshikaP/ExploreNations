import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../../src/components/Header';

// Helper to wrap component in Router
const renderWithRouter = (ui) => {
  return render(<Router>{ui}</Router>);
};

describe('Header component', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('renders login and signup when not logged in', () => {
    renderWithRouter(<Header />);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Signup')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    expect(screen.queryByText('Favourites')).not.toBeInTheDocument();
  });

  test('renders logout and favourites when logged in', () => {
    localStorage.setItem('token', 'dummy-token');
    renderWithRouter(<Header />);

    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.getByText('Favourites')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.queryByText('Signup')).not.toBeInTheDocument();
  });

  test('clicking logout removes token and reloads page', () => {
    localStorage.setItem('token', 'dummy-token');
    // Mock reload
    delete window.location;
    window.location = { reload: jest.fn() };

    renderWithRouter(<Header />);

    const logoutBtn = screen.getByText('Logout');
    fireEvent.click(logoutBtn);

    expect(localStorage.getItem('token')).toBeNull();
    expect(window.location.reload).toHaveBeenCalled();
  });
});
