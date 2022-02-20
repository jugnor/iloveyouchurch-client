// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock('@react-keycloak/web', () => ({
  useKeycloak: () => {
    return {
      keycloak: {
        authenticated: true,
        token: '123'
      }
    };
  }
}));

jest.mock('axios');
