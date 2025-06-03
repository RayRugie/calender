# Calendar Application

A modern, responsive calendar application built with React and TypeScript, featuring a clean and intuitive user interface inspired by Google Calendar.

## 🚀 Features

### Core Features
- **Multiple View Options**
  - Month View (default)
  - Week View
  - Day View
  - Easy navigation between views

- **Event Management**
  - Create new events with title, date, time, and description
  - View event details
  - Edit existing events
  - Delete events
  - Drag and drop events to reschedule

- **Navigation**
  - Previous/Next navigation for all views
  - "Today" button to quickly return to current date
  - Current date highlighting

### Enhanced Features
- **Dark Mode Support**
  - Toggle between light and dark themes
  - Persistent theme preference using localStorage

- **Responsive Design**
  - Fully responsive layout for mobile and desktop
  - Collapsible sidebar for better mobile experience
  - Touch-friendly interface

- **Accessibility**
  - ARIA labels and roles for better screen reader support
  - Keyboard navigation support
  - High contrast color schemes

## 🛠️ Technical Stack

- **Frontend Framework:** React with TypeScript
- **Styling:** TailwindCSS for utility-first styling
- **State Management:** React Context API for global state
- **Testing:** Jest and React Testing Library
- **Build Tool:** Vite for fast development and optimized builds

## 📦 Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd calender
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Run tests:
```bash
npm test
```

## 🏗️ Architecture & Design Decisions

### Component Structure
- Modular component design with clear separation of concerns
- Reusable components for calendar views and event management
- Custom hooks for shared logic

### State Management
- React Context API for global state management
  - Calendar state (current view, date, events)
  - UI state (dark mode, sidebar visibility)
- Local state for component-specific data

### Testing Strategy
- Unit tests for core components
- Integration tests for user interactions
- Test coverage for event management and calendar navigation

## 🎯 Implementation Details

### Calendar Views
- Month View: Grid-based layout with event indicators
- Week View: Detailed daily breakdown with time slots
- Day View: Hour-by-hour view with detailed event display

### Event Management
- Modal-based event creation and editing
- Form validation for required fields
- Drag and drop functionality for event rescheduling
- Color coding for different event types

### Performance Optimizations
- Memoized components to prevent unnecessary re-renders
- Efficient date calculations and manipulations
- Optimized event rendering for large datasets

## 🎨 UI/UX Features

- Clean, modern interface inspired by Google Calendar
- Smooth transitions between views
- Intuitive event creation and management
- Responsive design for all screen sizes
- Dark mode support for reduced eye strain

## 🔍 Known Limitations

- Events are stored in client-side state only (no persistence)
- Limited to single-user functionality
- No recurring events support
- No timezone handling

## 🚀 Future Improvements

- [ ] Add recurring events support
- [ ] Implement event categories and tags
- [ ] Add calendar sharing functionality
- [ ] Support for multiple calendars
- [ ] Export/Import calendar data
- [ ] Add more view options (Year view, Agenda view)

## 📝 License

MIT License - feel free to use this project for learning and development purposes.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
