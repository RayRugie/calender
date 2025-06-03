import React, { useState } from 'react';

interface Event {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  color: string;
}

interface WeekViewProps {
  currentDate: Date;
  events: Event[];
  onTimeSlotClick: (date: Date, hour: number) => void;
  onEventClick: (event: Event) => void;
  onEventDrop: (eventId: string, newDate: Date) => void;
  darkMode: boolean;
}

const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onTimeSlotClick,
  onEventClick,
  onEventDrop,
  darkMode
}) => {
  const [draggedEvent, setDraggedEvent] = useState<Event | null>(null);

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getEventsForDateTime = (date: Date, hour: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate.toDateString() === date.toDateString() &&
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

  const handleDrop = (e: React.DragEvent, date: Date, hour: number) => {
    e.preventDefault();
    if (draggedEvent) {
      const newDate = new Date(date);
      newDate.setHours(hour, 0, 0, 0);
      onEventDrop(draggedEvent.id, newDate);
      setDraggedEvent(null);
    }
  };

  const weekDays = getWeekDays();
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const today = new Date();

  return (
    <div className={`flex-1 overflow-auto ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`grid grid-cols-8 border-b sticky top-0 z-10 ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
        <div className={`p-4 text-center text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
          GMT+01
        </div>
        {weekDays.map((day, i) => {
          const isToday = day.toDateString() === today.toDateString();
          return (
            <div key={i} className={`p-4 text-center ${isToday ? 'text-blue-600 dark:text-blue-400' : (darkMode ? 'text-gray-300' : 'text-gray-700')}`}>
              <div className="text-xs font-medium">
                {day.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
              </div>
              <div className={`text-2xl font-light ${isToday ? 'bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mt-1' : ''}`}>
                {day.getDate()}
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-8">
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className={`p-2 text-xs text-right border-r ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`} style={{ height: '60px' }}>
              {hour === 0 ? '' : `${hour}:00`}
            </div>
            {weekDays.map((day, dayIndex) => {
              const dayEvents = getEventsForDateTime(day, hour);
              return (
                <div
                  key={`${hour}-${dayIndex}`}
                  className={`border-r border-b p-1 cursor-pointer ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'}`}
                  style={{ height: '60px' }}
                  onClick={() => onTimeSlotClick(day, hour)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, day, hour)}
                >
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, event)}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                      className="text-xs p-1 rounded text-white cursor-grab active:cursor-grabbing mb-1"
                      style={{ backgroundColor: event.color }}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WeekView;