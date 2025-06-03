// import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MonthView from './MonthView';

// Mock event type (same as your Event interface)
interface Event {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  color: string;
}

describe('MonthView Component', () => {
  const mockOnDateClick = jest.fn();
  const mockOnEventClick = jest.fn();
  const mockOnEventDrop = jest.fn();

  const currentDate = new Date(2025, 5, 1); // June 2025
  const today = new Date(); // Today's date for comparison

  const events: Event[] = [
    {
      id: '1',
      title: 'Team Meeting',
      startDate: new Date(2025, 5, 3, 10, 0),
      endDate: new Date(2025, 5, 3, 11, 0),
      color: '#3b82f6'
    },
    {
      id: '2',
      title: 'Birthday Party',
      startDate: new Date(2025, 5, 10, 15, 0),
      endDate: new Date(2025, 5, 10, 17, 0),
      color: '#ef4444'
    }
  ];

  const defaultProps = {
    currentDate,
    events,
    onDateClick: mockOnDateClick,
    onEventClick: mockOnEventClick,
    onEventDrop: mockOnEventDrop,
    darkMode: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders month grid with correct days and headers', () => {
    render(<MonthView {...defaultProps} />);

    // Check if weekday headers are rendered
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });

    // Check some specific days of the month
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument(); // June has 30 days
  });

  test('displays events on correct dates', () => {
    render(<MonthView {...defaultProps} />);

    // Ensure both events appear on correct days
    expect(screen.getAllByText('Team Meeting').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Birthday Party').length).toBeGreaterThan(0);
  });

  test('clicking a day calls onDateClick with correct date', () => {
    render(<MonthView {...defaultProps} />);
    
    const dayElement = screen.getByText('3'); // June 3
    fireEvent.click(dayElement);

    expect(mockOnDateClick).toHaveBeenCalledWith(expect.objectContaining({
      getDate: expect.any(Function),
      toDateString: expect.any(Function)
    }));
  });

  test('dragging and dropping an event calls onEventDrop with correct date', () => {
    render(<MonthView {...defaultProps} />);
    
    const eventBox = screen.getByText('Team Meeting');
    const targetDay = screen.getByText('10');

    // Simulate drag and drop
    fireEvent.dragStart(eventBox);
    fireEvent.dragOver(targetDay);
    fireEvent.drop(targetDay);

    expect(mockOnEventDrop).toHaveBeenCalledWith('1', expect.any(Date));
  });

  test('highlights today's date correctly', () => {
    const isTodayInCurrentMonth = today.getMonth() === new Date(2025, 5, 1).getMonth();
    if (isTodayInCurrentMonth) {
      render(<MonthView {...defaultProps} />);
      const todayElement = screen.getByText(today.getDate().toString());
      expect(todayElement).toHaveClass('text-blue-600');
    }
  });
});