// import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EventModal from './EventModal';

// Mock the formatDateForInput function
jest.mock('./EventModal', () => {
  const originalModule = jest.requireActual('./EventModal');
  return {
    ...originalModule,
    formatDateForInput: (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  };
});

describe('EventModal Component', () => {
  const mockOnSave = jest.fn();
  const mockOnClose = jest.fn();

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    onSave: mockOnSave,
    selectedDate: new Date(2025, 5, 3),
    darkMode: false,
  };

  test('renders Add Event form correctly', () => {
    render(<EventModal {...defaultProps} />);
    
    expect(screen.getByText(/Add Event/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Event Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Date/i)).toHaveValue('2025-06-03');
    expect(screen.getByLabelText(/Start Time/i)).toHaveValue('09:00');
    expect(screen.getByLabelText(/End Date/i)).toHaveValue('2025-06-03');
    expect(screen.getByLabelText(/End Time/i)).toHaveValue('10:00');
  });

  test('allows user to type title and save', () => {
    render(<EventModal {...defaultProps} />);

    const input = screen.getByLabelText(/Event Title/i) as HTMLInputElement;
    const saveButton = screen.getByRole('button', { name: /Save/i });

    fireEvent.change(input, { target: { value: 'Team Sync' } });
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalledWith({
      title: 'Team Sync',
      startDate: expect.any(Date),
      endDate: expect.any(Date),
      description: '',
      color: '#3b82f6'
    });
  });

  test('renders Edit Event form with existing data', () => {
    const editProps = {
      ...defaultProps,
      editEvent: {
        id: '1',
        title: 'Old Meeting',
        startDate: new Date(2025, 5, 3, 10, 0),
        endDate: new Date(2025, 5, 3, 11, 0),
        description: 'Updated agenda',
        color: '#ef4444',
      },
    };

    render(<EventModal {...editProps} />);

    expect(screen.getByText(/Edit Event/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('Old Meeting')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10:00')).toBeInTheDocument();
    expect(screen.getByDisplayValue('11:00')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Updated agenda')).toBeInTheDocument();
  });

  test('handles timezone differences correctly', () => {
    // Create a date that could be affected by timezones
    const timezoneTestDate = new Date('2025-06-03T00:00:00Z');
    
    const testProps = {
      ...defaultProps,
      selectedDate: timezoneTestDate
    };

    render(<EventModal {...testProps} />);
    
    // Should always show 2025-06-03 regardless of test runner's timezone
    expect(screen.getByLabelText(/Start Date/i)).toHaveValue('2025-06-03');
    expect(screen.getByLabelText(/End Date/i)).toHaveValue('2025-06-03');
  });
});