export interface Event {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  color: string;
}

export interface CalendarState {
  currentDate: Date;
  view: 'month' | 'week' | 'day';
  events: Event[];
  darkMode: boolean;
}