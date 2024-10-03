import {
    describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import RegisterInput from './RegisterInput';

/**
 * skenario testing
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle username typing correctly
 *   - should handle password typing correctly
 *   - should call onRegister function when register button is clicked
 */

expect.extend(matchers);

describe('RegisterInput component', () => {
    afterEach(() => {
        cleanup();
    });

    it('should handle name typing correctly', async () => {
        // Arrange
        render(<RegisterInput onRegister={() => { }} />);
        const nameInput = await screen.getByPlaceholderText('Name');

        // Action
        await userEvent.type(nameInput, 'nametest');

        // Assert
        expect(nameInput).toHaveValue('nametest');
    });

    it('should handle email typing correctly', async () => {
        // Arrange
        render(<RegisterInput onRegister={() => { }} />);
        const emailInput = await screen.getByPlaceholderText('Email');

        // Action
        await userEvent.type(emailInput, 'emailtest');

        // Assert
        expect(emailInput).toHaveValue('emailtest');
    });

    it('should handle password typing correctly', async () => {
        // Arrange
        render(<RegisterInput onRegister={() => { }} />);
        const passwordInput = await screen.getByPlaceholderText('Password');

        // Action
        await userEvent.type(passwordInput, 'passwordtest');

        // Assert
        expect(passwordInput).toHaveValue('passwordtest');
    });

    it('should call register function when register button is clicked', async () => {
        // Arrange
        const mockRegister = vi.fn();
        render(<RegisterInput onRegister={mockRegister} />);
        const nameInput = await screen.getByPlaceholderText('Name');
        await userEvent.type(nameInput, 'nametest');
        const emailInput = await screen.getByPlaceholderText('Email');
        await userEvent.type(emailInput, 'emailtest');
        const passwordInput = await screen.getByPlaceholderText('Password');
        await userEvent.type(passwordInput, 'passwordtest');
        const registerButton = await screen.getByRole('button', { name: 'Register' });

        // Action
        await userEvent.click(registerButton);

        // Assert
        expect(mockRegister).toBeCalledWith({
            name: 'nametest',
            email: 'emailtest',
            password: 'passwordtest',
        });
    });

});