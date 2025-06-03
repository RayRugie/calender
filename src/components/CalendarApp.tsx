import React, { useState, useEffect } from 'react';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import MonthView from './MonthView/MonthView';
import WeekView from './WeekView/WeekView';
import DayView from './DayView/DayView';
import EventModal from './EventModal/EventModal';
import EventDetailModal from './EventDetailModal/EventDetailModal';
import type { Event, CalendarState } from '../types/eventTypes';

const CalendarApp: React.FC = () => {
  const [state, setState] = useState<CalendarState>({
    currentDate: new Date(),
    view: 'month',
    events: [
      {
        id: '1',
        title: 'Team Meeting',
        startDate: new Date(2025, 5, 3, 10, 0),
        endDate: new Date(2025, 5, 3, 11, 0),
        description: 'Weekly team sync meeting',
        color: '#3b82f6'
      },
      {
        id: '2',
        title: 'Project Review',
        startDate: new Date(2025, 5, 5, 14, 0),
        endDate: new Date(2025, 5, 5, 15, 30),
        description: 'Review project progress',
        color: '#10b981'
      },
      {
        id: '3',
        title: 'Client Call',
        startDate: new Date(2025, 5, 7, 9, 0),
        endDate: new Date(2025, 5, 7, 10, 0),
        description: 'Call with client to discuss requirements',
        color: '#f59e0b'
      }
    ],
    darkMode: false
  });

  const [showEventModal, setShowEventModal] = useState(false);
  const [showEventDetail, setShowEventDetail] = useState<Event | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setState(prev => ({ ...prev, darkMode: JSON.parse(savedDarkMode) }));
    }
  }, []);

  const handleViewChange = (view: 'month' | 'week' | 'day') => {
    setState(prev => ({ ...prev, view }));
  };

  const handleNavigate = (direction: 'prev' | 'next' | 'today') => {
    setState(prev => {
      let newDate = new Date(prev.currentDate);
      
      if (direction === 'today') {
        newDate = new Date();
      } else if (direction === 'prev') {
        if (prev.view === 'month') {
          newDate.setMonth(newDate.getMonth() - 1);
        } else if (prev.view === 'week') {
          newDate.setDate(newDate.getDate() - 7);
        } else {
          newDate.setDate(newDate.getDate() - 1);
        }
      } else {
        if (prev.view === 'month') {
          newDate.setMonth(newDate.getMonth() + 1);
        } else if (prev.view === 'week') {
          newDate.setDate(newDate.getDate() + 7);
        } else {
          newDate.setDate(newDate.getDate() + 1);
        }
      }
      
      return { ...prev, currentDate: newDate };
    });
  };

  const handleDateSelect = (date: Date) => {
    setState(prev => ({ ...prev, currentDate: date }));
  };

  const handleCreateEvent = () => {
    setSelectedDate(state.currentDate);
    setEditingEvent(null);
    setShowEventModal(true);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setShowEventModal(true);
  };

  const handleTimeSlotClick = (date: Date, hour: number) => {
    const selectedDateTime = new Date(date);
    selectedDateTime.setHours(hour, 0, 0, 0);
    setSelectedDate(selectedDateTime);
    setEditingEvent(null);
    setShowEventModal(true);
  };

  const handleEventClick = (event: Event) => {
    setShowEventDetail(event);
  };

  const handleSaveEvent = (eventData: Omit<Event, 'id'>) => {
    setState(prev => {
      if (editingEvent) {
        return {
          ...prev,
          events: prev.events.map(e => 
            e.id === editingEvent.id 
              ? { ...eventData, id: editingEvent.id }
              : e
          )
        };
      } else {
        return {
          ...prev,
          events: [...prev.events, { ...eventData, id: Date.now().toString() }]
        };
      }
    });
    
    setShowEventModal(false);
    setEditingEvent(null);
    setSelectedDate(null);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setShowEventModal(true);
    setShowEventDetail(null);
  };

  const handleDeleteEvent = (eventId: string) => {
    setState(prev => ({
      ...prev,
      events: prev.events.filter(e => e.id !== eventId)
    }));
    setShowEventDetail(null);
  };

  const handleEventDrop = (eventId: string, newDate: Date) => {
    setState(prev => ({
      ...prev,
      events: prev.events.map(event => {
        if (event.id === eventId) {
          const duration = event.endDate.getTime() - event.startDate.getTime();
          return {
            ...event,
            startDate: newDate,
            endDate: new Date(newDate.getTime() + duration)
          };
        }
        return event;
      })
    }));
  };

  const handleToggleDarkMode = () => {
    setState(prev => {
      const newDarkMode = !prev.darkMode;
      localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
      return { ...prev, darkMode: newDarkMode };
    });
  };

  const handleToggleSidebar = () => {
    setSidebarVisible(prev => !prev);
  };

  const renderCalendarView = () => {
    switch (state.view) {
      case 'week':
        return (
          <WeekView
            currentDate={state.currentDate}
            events={state.events}
            onTimeSlotClick={handleTimeSlotClick}
            onEventClick={handleEventClick}
            onEventDrop={handleEventDrop}
            darkMode={state.darkMode}
          />
        );
      case 'day':
        return (
          <DayView
            currentDate={state.currentDate}
            events={state.events}
            onTimeSlotClick={handleTimeSlotClick}
            onEventClick={handleEventClick}
            onEventDrop={handleEventDrop}
            darkMode={state.darkMode}
          />
        );
      default:
        return (
          <MonthView
            currentDate={state.currentDate}
            events={state.events}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
            onEventDrop={handleEventDrop}
            darkMode={state.darkMode}
          />
        );
    }
  };

  return (
    <div className={`h-screen w-screen flex flex-col ${state.darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <Header
        currentDate={state.currentDate}
        view={state.view}
        onViewChange={handleViewChange}
        onNavigate={handleNavigate}
        darkMode={state.darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onToggleSidebar={handleToggleSidebar}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {sidebarVisible &&(
        <Sidebar
          currentDate={state.currentDate}
          onDateSelect={handleDateSelect}
          onCreateEvent={handleCreateEvent}
          darkMode={state.darkMode}
        />
        )}
        {renderCalendarView()}
      </div>
      
      <EventModal
        isOpen={showEventModal}
        onClose={() => {
          setShowEventModal(false);
          setEditingEvent(null);
          setSelectedDate(null);
        }}
        onSave={handleSaveEvent}
        selectedDate={selectedDate || undefined}
        editEvent={editingEvent || undefined}
        darkMode={state.darkMode}
      />
      
      <EventDetailModal
        event={showEventDetail}
        onClose={() => setShowEventDetail(null)}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
        darkMode={state.darkMode}
      />
    </div>
  );
};

export default CalendarApp;