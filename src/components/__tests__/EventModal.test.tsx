import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventModal from '../EventModal/EventModal';

describe('EventModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();
  const mockEvent = {
    id: '1',
    title: 'Test Event',
    startDate: new Date('2024-03-20T10:00:00'),
    endDate: new Date('2024-03-20T11:00:00'),
    description: 'Test Description',
    color: '#FF0000'
  };

  it('renders without crashing', () => {
    render(<EventModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} darkMode={false} />);
    const modalTitle = screen.getAllByText(/add event/i);
    expect(modalTitle.length).toBeGreaterThan(0);
  });

  it('displays event details when editing', () => {
    render(<EventModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} editEvent={mockEvent} darkMode={false} />);
    const titleInput = screen.getAllByLabelText(/event title/i);
    expect(titleInput.length).toBeGreaterThan(0);
    expect(titleInput[0]).toHaveValue('Test Event');
  });

  it('calls onSave with form data when submitted', () => {
    render(<EventModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} darkMode={false} />);
    const titleInput = screen.getAllByLabelText(/event title/i);
    const startDateInput = screen.getByLabelText(/start date/i);
    const endDateInput = screen.getByLabelText(/end date/i);
    const startTimeInput = screen.getByLabelText(/start time/i);
    const endTimeInput = screen.getByLabelText(/end time/i);
    const saveButton = screen.getByRole('button', { name: /save event/i });
    fireEvent.change(titleInput[0], { target: { value: 'New Event' } });
    fireEvent.change(startDateInput, { target: { value: '2024-03-20' } });
    fireEvent.change(endDateInput, { target: { value: '2024-03-20' } });
    fireEvent.change(startTimeInput, { target: { value: '10:00' } });
    fireEvent.change(endTimeInput, { target: { value: '11:00' } });
    fireEvent.click(saveButton);
    expect(mockOnSave).toHaveBeenCalled();
  });

  it('calls onClose when cancel button is clicked', () => {
    render(<EventModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} darkMode={false} />);
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
}); 