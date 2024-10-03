import {
    describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import LoginInput from './LoginInput';

/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle username typing correctly
 *   - should handle password typing correctly
 *   - should call onLogin function when login button is clicked
 */

expect.extend(matchers);

describe('LoginInput component', () => {
    afterEach(() => {
        cleanup();
    });

    it('should handle email typing correctly', async () => {
        // Arrange
        render(<LoginInput onLogin={() => { }} />);
        const emailInput = await screen.getByPlaceholderText('Email');

        // Action
        await userEvent.type(emailInput, 'emailtest');

        // Assert
        expect(emailInput).toHaveValue('emailtest');
    });

    it('should handle password typing correctly', async () => {
        // Arrange
        render(<LoginInput onLogin={() => { }} />);
        const passwordInput = await screen.getByPlaceholderText('Password');

        // Action
        await userEvent.type(passwordInput, 'passwordtest');

        // Assert
        expect(passwordInput).toHaveValue('passwordtest');
    });

    it('should call login function when login button is clicked', async () => {
        // Arrange
        const mockLogin = vi.fn();
        render(<LoginInput onLogin={mockLogin} />);
        const emailInput = await screen.getByPlaceholderText('Email');
        await userEvent.type(emailInput, 'emailtest');
        const passwordInput = await screen.getByPlaceholderText('Password');
        await userEvent.type(passwordInput, 'passwordtest');
        const loginButton = await screen.getByRole('button', { name: 'Login' });

        // Action
        await userEvent.click(loginButton);

        // Assert
        expect(mockLogin).toBeCalledWith({
            email: 'emailtest',
            password: 'passwordtest',
        });
    });

});