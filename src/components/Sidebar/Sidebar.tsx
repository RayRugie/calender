import React, { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, } from 'lucide-react';

interface SidebarProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  onCreateEvent: () => void;
  darkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentDate, onDateSelect, onCreateEvent, darkMode }) => {
  const [miniCalendarDate, setMiniCalendarDate] = useState(new Date());

  // Generate mini calendar days
  const generateMiniCalendar = () => {
    const year = miniCalendarDate.getFullYear();
    const month = miniCalendarDate.getMonth();
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

  const navigateMiniCalendar = (direction: 'prev' | 'next') => {
    const newDate = new Date(miniCalendarDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setMiniCalendarDate(newDate);
  };

  const days = generateMiniCalendar();
  const today = new Date();

  return (
    <div className={`
      w-34 sm:w-80 border-r h-full overflow-y-auto scrollbar-hide
      ${darkMode ? 'bg-zinc-950 border-gray-700' : 'bg-white border-gray-200'} 
      p-2 sm:p-4
    `}
    style={{
      scrollbarWidth: 'none', /* Firefox */
      msOverflowStyle: 'none', /* Internet Explorer 10+ */
    }}
    >
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
      `}</style>
      
       <button 
        onClick={onCreateEvent}
        className="flex items-center space-x-2 sm:space-x-3 bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg mb-4 sm:mb-6 w-fit text-sm sm:text-base"
      >
        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>Create</span>
      </button>
      
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className={`font-medium text-xs sm:text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {miniCalendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex space-x-1">
            <button 
              onClick={() => navigateMiniCalendar('prev')}
              className={`p-0.5 sm:p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${darkMode ? 'text-white' : 'text-gray-600'}`}
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button 
              onClick={() => navigateMiniCalendar('next')}
              className={`p-0.5 sm:p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${darkMode ? 'text-white' : 'text-gray-600'}`}
            >
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-px sm:gap-1 text-center text-xs mb-1 sm:mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className={`py-0.5 sm:py-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{day}</div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-px sm:gap-1">
          {days.map((day, i) => {
            const isCurrentMonth = day.getMonth() === miniCalendarDate.getMonth();
            const isToday = day.toDateString() === today.toDateString();
            const isSelected = day.toDateString() === currentDate.toDateString();
            
            return (
              <button
                key={i}
                onClick={() => onDateSelect(day)}
                className={`
                  aspect-square text-xs rounded hover:bg-gray-100 dark:hover:bg-gray-700 min-h-[18px] sm:min-h-[28px] flex items-center justify-center
                  ${!isCurrentMonth ? (darkMode ? 'text-gray-600' : 'text-gray-400') : (darkMode ? 'text-white' : 'text-gray-900')}
                  ${isToday ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
                  ${isSelected && !isToday ? (darkMode ? 'bg-gray-950' : 'bg-gray-200') : ''}
                `}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        <div>
          <h4 className={`text-xs sm:text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>My calendars</h4>
          <div className="space-y-1 sm:space-y-2">
            <label className="flex items-center space-x-1 sm:space-x-2">
              <input type="checkbox" defaultChecked className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 rounded flex-shrink-0" />
              <span className={`text-xs sm:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Omorugie Oyibotha</span>
            </label>
            <label className="flex items-center space-x-1 sm:space-x-2">
              <input type="checkbox" defaultChecked className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 rounded flex-shrink-0" />
              <span className={`text-xs sm:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Birthdays</span>
            </label>
            <label className="flex items-center space-x-1 sm:space-x-2">
              <input type="checkbox" defaultChecked className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 rounded flex-shrink-0" />
              <span className={`text-xs sm:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tasks</span>
            </label>
          </div>
        </div>
        
        <div>
          <h4 className={`text-xs sm:text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Other calendars</h4>
          <div className="space-y-1 sm:space-y-2">
            <label className="flex items-center space-x-1 sm:space-x-2">
              <input type="checkbox" defaultChecked className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600 rounded flex-shrink-0" />
              <span className={`text-xs sm:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Holidays in Nigeria</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;