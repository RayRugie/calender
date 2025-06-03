import React from 'react';

interface Event {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  color: string;
}

interface EventDetailModalProps {
  event: Event | null;
  onClose: () => void;
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
  darkMode: boolean;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onEdit,
  onDelete,
  darkMode
}) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 w-96 max-w-full`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Event Details
          </h2>
          <button
            onClick={onClose}
            className={`text-gray-500 hover:text-gray-700 ${darkMode ? 'hover:text-gray-300' : ''}`}
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className={`font-medium text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {event.title}
            </h3>
          </div>
          <div>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <strong>Start:</strong> {event.startDate.toLocaleString()}
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <strong>End:</strong> {event.endDate.toLocaleString()}
            </p>
          </div>
          {event.description && (
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <strong>Description:</strong>
              </p>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                {event.description}
              </p>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: event.color }}
            ></div>
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Event Color
            </span>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => onDelete(event.id)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={() => onEdit(event)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;