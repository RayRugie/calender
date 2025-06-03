import React from 'react';
import CalenderImg from '../../assets/calendar.png'
import { Settings, HelpCircle, Grid3X3, ChevronLeft, ChevronRight, Search, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  currentDate: Date;
  view: string;
  onViewChange: (view: 'month' | 'week' | 'day') => void;
  onNavigate: (direction: 'prev' | 'next' | 'today') => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentDate,
  view,
  onViewChange,
  onNavigate,
  darkMode,
  onToggleDarkMode,
  onToggleSidebar
}) => {
  const formatHeaderDate = () => {
    if (view === 'month') {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } else if (view === 'week') {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
        return `${startOfWeek.toLocaleDateString('en-US', { month: 'long' })} ${startOfWeek.getDate()}-${endOfWeek.getDate()}, ${startOfWeek.getFullYear()}`;
      } else {
        return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${startOfWeek.getFullYear()}`;
      }
    } else {
      return currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    }
  };

  const formatMobileDate = () => {
    if (view === 'month') {
      return currentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } else if (view === 'week') {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    } else {
      return currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <header className={`px-3 sm:px-6 py-3 border-b ${darkMode ? 'bg-zinc-950 border-gray-700' : 'bg-white border-gray-200'}`}>
      {/* Mobile Layout */}
      <div className="flex sm:hidden items-center justify-between">
        {/* Left side - Menu, Logo, Today button */}
        <div className="flex items-center space-x-2">
          <button 
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-gray-600"></div>
              <div className="w-full h-0.5 bg-gray-600"></div>
              <div className="w-full h-0.5 bg-gray-600"></div>
            </div>
          </button>
          
          <div className="flex items-center space-x-1">
            <img src={CalenderImg} className="w-6 h-6 text-blue-500" />
            <span className={`text-lg font-normal ${darkMode ? 'text-white' : 'text-gray-700'}`}>Calendar</span>
          </div>
          
          <button 
            onClick={() => onNavigate('today')}
            className={`px-2 py-1 text-sm rounded-lg border ${darkMode ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            Today
          </button>
        </div>
        
        {/* Right side - Settings and View selector */}
        <div className="flex items-center space-x-1">
          <button 
            onClick={onToggleDarkMode}
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${darkMode ? 'text-white' : 'text-gray-600'}`}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <button className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${darkMode ? 'text-white' : 'text-gray-600'}`}>
            <Settings className="w-4 h-4" />
          </button>
          
          <select 
            value={view} 
            onChange={(e) => onViewChange(e.target.value as 'month' | 'week' | 'day')}
            className={`px-2 py-1 text-sm rounded border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700'}`}
          >
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
          </select>
        </div>
      </div>

      {/* Mobile Second Row - Navigation and Date */}
      <div className="flex sm:hidden items-center justify-between mt-2 pt-2 border-t border-gray-200 dark:border-gray-850">
        <div className="flex items-center space-x-1">
          <button 
            onClick={() => onNavigate('prev')}
            className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${darkMode ? 'text-white' : 'text-gray-600'}`}
            data-testid="prev-button"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onNavigate('next')}
            className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${darkMode ? 'text-white' : 'text-gray-600'}`}
            data-testid="next-button"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <h1 className={`text-lg font-normal ${darkMode ? 'text-white' : 'text-gray-700'}`}>
          {formatMobileDate()}
        </h1>
        
        <div className="flex items-center space-x-1">
          <button className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${darkMode ? 'text-white' : 'text-gray-600'}`}>
            <Search className="w-4 h-4" />
          </button>
          
          <button className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${darkMode ? 'text-white' : 'text-gray-600'}`}>
            <HelpCircle className="w-4 h-4" />
          </button>
          
          <button className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${darkMode ? 'text-white' : 'text-gray-600'}`}>
            <Grid3X3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
              onClick={onToggleSidebar}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-gray-600"></div>
                <div className="w-full h-0.5 bg-gray-600"></div>
                <div className="w-full h-0.5 bg-gray-600"></div>
              </div>
          </button>
          
          <div className="flex items-center space-x-2">
            <img src={CalenderImg} className="w-8 h-8 text-blue-500" alt='Calendar Image'/>
            <span className={`text-xl font-normal ${darkMode ? 'text-white' : 'text-gray-700'}`}>Calendar</span>
          </div>
          
          <button 
            onClick={() => onNavigate('today')}
            className={`px-4 py-2 rounded-lg border ${darkMode ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            Today
          </button>
          
          <div className="flex items-center space-x-1">
            <button 
              onClick={() => onNavigate('prev')}
              className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${darkMode ? 'text-white' : 'text-gray-600'}`}
              data-testid="prev-button"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onNavigate('next')}
              className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${darkMode ? 'text-white' : 'text-gray-600'}`}
              data-testid="next-button"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <h1 className={`text-xl font-normal ${darkMode ? 'text-white' : 'text-gray-700'}`}>
            {formatHeaderDate()}
          </h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input 
              type="text" 
              placeholder="Search" 
              className={`pl-10 pr-4 py-2 rounded-full border w-80 ${darkMode ? 'bg-gray-950 border-gray-600 text-white placeholder-gray-700' : 'bg-white border-gray-300 text-gray-700 placeholder-gray-500'}`}
            />
          </div>
          
          <button 
            onClick={onToggleDarkMode}
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-850 ${darkMode ? 'text-white' : 'text-gray-600'}`}
            data-testid="dark-mode-button"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <button className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${darkMode ? 'text-white' : 'text-gray-600'}`}>
            <HelpCircle className="w-5 h-5" />
          </button>
          
          <button className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${darkMode ? 'text-white' : 'text-gray-600'}`}>
            <Settings className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2">
            <select 
              value={view} 
              onChange={(e) => onViewChange(e.target.value as 'month' | 'week' | 'day')}
              className={`px-3 py-2 rounded border ${darkMode ? 'bg-gray-950 border-gray-800 text-white' : 'bg-white border-gray-300 text-gray-700'}`}
            >
              <option value="month">Month</option>
              <option value="week">Week</option>
              <option value="day">Day</option>
            </select>
            
            <button className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-950 ${darkMode ? 'text-white' : 'text-gray-600'}`}>
              <Grid3X3 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;