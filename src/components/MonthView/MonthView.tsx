import React, { useState } from 'react';

interface MonthViewProps {
  currentDate: Date;
  events: any[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: any) => void;
  onEventDrop: (eventId: string, newDate: Date) => void;
  darkMode: boolean;
}

const MonthView: React.FC<MonthViewProps> = ({ currentDate, events, onDateClick, onEventClick, onEventDrop, darkMode }) => {
  const [draggedEvent, setDraggedEvent] = useState<any>(null);

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    const days = [];
    const current = new Date(startDate);
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const handleDragStart = (e: React.DragEvent, event: any) => {
    setDraggedEvent(event);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, date: Date) => {
    e.preventDefault();
    if (draggedEvent) {
      onEventDrop(draggedEvent.id, date);
      setDraggedEvent(null);
    }
  };

  const days = generateCalendarDays();
  const today = new Date();

  return (
    <div className={`flex-1 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`grid grid-cols-7 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
          <div key={day} className={`p-1 sm:p-4 text-center text-[7px] sm:text-sm font-medium ${darkMode ? 'text-gray-300 bg-gray-800' : 'text-gray-500 bg-gray-50'}`}>
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7" style={{ height: 'calc(100vh - 200px)' }}>
        {days.map((day, i) => {
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          const isToday = day.toDateString() === today.toDateString();
          const dayEvents = getEventsForDate(day);
          
          return (
            <div
              key={i}
              className={`
                border-r border-b p-2 min-h-10 sm:min-h-32 cursor-pointer relative
                ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'}
                ${!isCurrentMonth ? (darkMode ? 'bg-gray-900' : 'bg-gray-50') : ''}
                ${isToday ? (darkMode ? 'bg-blue-900' : 'bg-blue-50') : ''}
              `}
              onClick={() => onDateClick(day)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, day)}
            >
              <div className={`text-[10px] sm:text-sm font-medium mb-1 ${
                !isCurrentMonth ? (darkMode ? 'text-gray-600' : 'text-gray-400') : 
                isToday ? 'text-blue-600 dark:text-blue-400' : 
                (darkMode ? 'text-white' : 'text-gray-900')
              }`}>
                {day.getDate()}
              </div>
              
              <div className="space-y-3 sm:space-y-1 ">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, event)}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                    className="text-[5px] sm:text-xs p-[3px] sm:p-1 rounded text-white cursor-grab active:cursor-grabbing"
                    style={{ backgroundColor: event.color }}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className={`text-[10px] sm:text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;