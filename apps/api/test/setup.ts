import "reflect-metadata";

// Global mocks for testing environment
beforeAll(() => {
  process.env.NODE_ENV = "test";
  process.env.BETTER_AUTH_SECRET = "test-secret";
  process.env.BETTER_AUTH_URL = "http://localhost:8000";
});

beforeEach(() => {
  jest.clearAllMocks();
});

// Polyfill global fetch if needed for tests
if (!global.fetch) {
  (global as any).fetch = jest.fn();
}
