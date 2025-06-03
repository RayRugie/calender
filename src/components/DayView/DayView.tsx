import React, { useState } from 'react';

interface Event {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  color: string;
}

interface DayViewProps {
  currentDate: Date;
  events: Event[];
  onTimeSlotClick: (date: Date, hour: number) => void;
  onEventClick: (event: Event) => void;
  onEventDrop: (eventId: string, newDate: Date) => void;
  darkMode: boolean;
}

const DayView: React.FC<DayViewProps> = ({
  currentDate,
  events,
  onTimeSlotClick,
  onEventClick,
  onEventDrop,
  darkMode
}) => {
  const [draggedEvent, setDraggedEvent] = useState<Event | null>(null);

  const getEventsForHour = (hour: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate.toDateString() === currentDate.toDateString() &&
             eventDate.getHours() === hour;
    });
  };

  const handleDragStart = (e: React.DragEvent, event: Event) => {
    setDraggedEvent(event);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, hour: number) => {
    e.preventDefault();
    if (draggedEvent) {
      const newDate = new Date(currentDate);
      newDate.setHours(hour, 0, 0, 0);
      onEventDrop(draggedEvent.id, newDate);
      setDraggedEvent(null);
    }
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const today = new Date();
  const isToday = currentDate.toDateString() === today.toDateString();

  return (
    <div className={`flex-1 overflow-auto ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`border-b sticky top-0 z-10 ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
        <div className={`p-4 text-center ${isToday ? 'text-blue-600 dark:text-blue-400' : (darkMode ? 'text-gray-300' : 'text-gray-700')}`}>
          <div className="text-sm font-medium">
            {currentDate.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()}
          </div>
          <div className={`text-3xl font-light mt-1 ${isToday ? 'bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto' : ''}`}>
            {currentDate.getDate()}
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-20">
          {hours.map((hour) => (
            <div key={hour} className={`p-2 text-xs text-right border-r ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`} style={{ height: '60px' }}>
              {hour === 0 ? '' : `${hour}:00`}
            </div>
          ))}
        </div>
        <div className="flex-1">
          {hours.map((hour) => {
            const hourEvents = getEventsForHour(hour);
            return (
              <div
                key={hour}
                className={`border-b p-2 cursor-pointer ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'}`}
                style={{ height: '60px' }}
                onClick={() => onTimeSlotClick(currentDate, hour)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, hour)}
              >
                {hourEvents.map((event) => (
                  <div
                    key={event.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, event)}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                    className="text-sm p-2 rounded text-white cursor-grab active:cursor-grabbing mb-1"
                    style={{ backgroundColor: event.color }}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DayView;