import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TabLogin from 'private/auth/components/TabLogin';

jest.mock('axios', () => ({
    __esModule: true,

    default: {
        get: () => ({
            data: { id: 1, name: 'Tai Heo FA' },
        }),
    },
}));
test('username input should be rendered', () => {
    render(<TabLogin />);
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    expect(usernameInputEl).toBeInTheDocument();
});

test('password input should be rendered', () => {
    render(<TabLogin />);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);
    expect(passwordInputEl).toBeInTheDocument();
});

test('button should be rendered', () => {
    render(<TabLogin />);
    const buttonEl = screen.getByRole('button');
    expect(buttonEl).toBeInTheDocument();
});

test('username input should be empty', () => {
    render(<TabLogin />);
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    expect(usernameInputEl.value).toBe('');
});

test('password input should be empty', () => {
    render(<TabLogin />);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);
    expect(passwordInputEl.value).toBe('');
});

test('button should be disabled', () => {
    render(<TabLogin />);
    const buttonEl = screen.getByRole('button');
    expect(buttonEl).toBeDisabled();
});

test('loading should not be rendered', () => {
    render(<TabLogin />);
    const buttonEl = screen.getByRole('button');
    expect(buttonEl).not.toHaveTextContent(/please wait/i);
});

test('error message should not be visible', () => {
    render(<TabLogin />);
    const errorEl = screen.getByTestId('error');
    expect(errorEl).not.toBeVisible();
});

test('username input should change', () => {
    render(<TabLogin />);
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    const testValue = 'test';

    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    expect(usernameInputEl.value).toBe(testValue);
});

test('password input should change', () => {
    render(<TabLogin />);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);
    const testValue = 'test';

    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    expect(passwordInputEl.value).toBe(testValue);
});

test('button should not be disabled when inputs exist', () => {
    render(<TabLogin />);
    const buttonEl = screen.getByRole('button');
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);

    const testValue = 'test';

    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });

    expect(buttonEl).not.toBeDisabled();
});

test('loading should be rendered when click', () => {
    render(<TabLogin />);
    const buttonEl = screen.getByRole('button');
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);

    const testValue = 'test';

    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    fireEvent.click(buttonEl);

    expect(buttonEl).toHaveTextContent(/please wait/i);
});

test('loading should not be rendered after fetching', async () => {
    render(<TabLogin />);
    const buttonEl = screen.getByRole('button');
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);

    const testValue = 'test';

    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    fireEvent.click(buttonEl);

    await waitFor(() => expect(buttonEl).not.toHaveTextContent(/please wait/i));
});

test('user should be rendered after fetching', async () => {
    render(<TabLogin />);
    const buttonEl = screen.getByRole('button');
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);

    const testValue = 'test';

    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    fireEvent.click(buttonEl);

    const userItem = await screen.findByText('Tai Heo FA');
    expect(userItem).toBeInTheDocument();
});
