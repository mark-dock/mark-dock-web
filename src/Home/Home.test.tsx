import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

test('renders Home component', () => {
    render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>
    );

    const titleElement = screen.getByText(/MarkDock/i);
    expect(titleElement).toBeInTheDocument();

    const descriptionElement = screen.getByText(/Group documentation, the way it should be./i);
    expect(descriptionElement).toBeInTheDocument();

    const buttonElement = screen.getByRole('button', { name: /Go to Login/i });
    expect(buttonElement).toBeInTheDocument();
});

test('navigates to login on button click', async () => {
    render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>
    );

    const buttonElement = screen.getByRole('button', { name: /Go to Login/i });
    fireEvent.click(buttonElement);

    expect(mockNavigate).toHaveBeenCalledWith('/login');
});