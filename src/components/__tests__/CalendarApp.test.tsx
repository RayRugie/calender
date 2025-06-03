import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CalendarApp from '../CalendarApp';

describe('CalendarApp', () => {
  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  it('renders without crashing', () => {
    render(<CalendarApp />);
    const todayButtons = screen.getAllByRole('button', { name: /today/i });
    expect(todayButtons.length).toBeGreaterThan(0);
  });

  it('initializes with month view', () => {
    render(<CalendarApp />);
    const viewSelects = screen.getAllByRole('combobox');
    expect(viewSelects[0]).toHaveValue('month');
  });

  it('switches to week view when week is selected', () => {
    render(<CalendarApp />);
    const viewSelects = screen.getAllByRole('combobox');
    fireEvent.change(viewSelects[0], { target: { value: 'week' } });
    expect(viewSelects[0]).toHaveValue('week');
  });

  it('switches to day view when day is selected', () => {
    render(<CalendarApp />);
    const viewSelects = screen.getAllByRole('combobox');
    fireEvent.change(viewSelects[0], { target: { value: 'day' } });
    expect(viewSelects[0]).toHaveValue('day');
  });

  it('navigates to next month when next button is clicked', () => {
    render(<CalendarApp />);
    const nextButtons = screen.getAllByTestId('next-button');
    const initialMonths = screen.getAllByText(/june 2025/i);
    expect(initialMonths.length).toBeGreaterThan(0);
    fireEvent.click(nextButtons[0]);
    const nextMonths = screen.getAllByText(/july 2025/i);
    expect(nextMonths.length).toBeGreaterThan(0);
  });

  it('navigates to previous month when prev button is clicked', () => {
    render(<CalendarApp />);
    const prevButtons = screen.getAllByTestId('prev-button');
    const initialMonths = screen.getAllByText(/june 2025/i);
    expect(initialMonths.length).toBeGreaterThan(0);
    fireEvent.click(prevButtons[0]);
    const prevMonths = screen.getAllByText(/may 2025/i);
    expect(prevMonths.length).toBeGreaterThan(0);
  });

  it('toggles dark mode when dark mode button is clicked', () => {
    render(<CalendarApp />);
    const darkModeButtons = screen.getAllByTestId('dark-mode-button');
    fireEvent.click(darkModeButtons[0]);
    expect(localStorage.setItem).toHaveBeenCalledWith('darkMode', 'true');
  });

  it('navigates to today when today button is clicked', () => {
    render(<CalendarApp />);
    const todayButtons = screen.getAllByText('Today');
    fireEvent.click(todayButtons[0]);
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const currentYear = currentDate.getFullYear();
    const todayMonths = screen.getAllByText(new RegExp(`${currentMonth} ${currentYear}`, 'i'));
    expect(todayMonths.length).toBeGreaterThan(0);
  });
}); 