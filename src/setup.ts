// src/test/setup.ts
import '@testing-library/jest-dom';

// Mock global Date to use UTC
Date.now = jest.fn(() => new Date(Date.UTC(2025, 5, 3)).valueOf());