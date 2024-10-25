# Modern Calendar Application

A feature-rich calendar application built with Next.js 14, integrating MDX editing capabilities and advanced calendar functionality.

## Current Features

✅ Core Calendar Views
- Monthly grid view with event previews
- Weekly view with detailed time slots
- Daily view with hourly breakdown
- Agenda view with grouped events
- Timeline view for project planning

✅ Event Management
- Create, edit, and delete events
- Event details with title, description, location
- Date and time selection
- Real-time updates

✅ UI/UX
- Responsive design for all screen sizes
- Dark/Light mode support
- Beautiful shadcn/ui components
- Smooth animations and transitions
- Loading states and error handling

✅ MDX Integration
- Split-view MDX editor
- Live preview
- Syntax highlighting
- @date mentions with calendar picker

## Work in Progress 🚧

### Calendar Features
- [ ] Drag-and-drop event rescheduling
- [ ] Multi-calendar support
- [ ] Calendar sharing and permissions
- [ ] Recurring events
- [ ] Event categories and color coding
- [ ] Event reminders and notifications
- [ ] Custom calendar views (resource view, etc.)

### MDX Features
- [ ] Custom MDX components for calendar integration
- [ ] MDX templates for events
- [ ] Auto-linking between MDX documents and events
- [ ] MDX version history

### Sync & Integration
- [ ] Two-way calendar sync
- [ ] Google Calendar integration
- [ ] iCloud Calendar integration
- [ ] CalDAV server support
- [ ] Webhook support for external integrations

### Data Management
- [ ] IPFS-based versioning
- [ ] Offline support with IndexedDB
- [ ] Data export/import
- [ ] Backup and restore functionality

### Developer Experience
- [ ] Comprehensive documentation
- [ ] Storybook integration
- [ ] Unit tests
- [ ] E2E tests
- [ ] Performance optimizations
- [ ] API documentation

### Additional Features
- [ ] Search functionality
- [ ] Advanced filtering
- [ ] Calendar analytics
- [ ] Multi-language support
- [ ] Accessibility improvements
- [ ] Mobile app integration
- [ ] Print view
- [ ] Calendar embedding

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
.
├── app/                  # Next.js app directory
├── components/          # React components
│   ├── calendar/       # Calendar-specific components
│   ├── editor/         # MDX editor components
│   └── ui/             # Shared UI components
├── lib/                # Utilities and helpers
├── public/             # Static assets
└── styles/            # Global styles
```

## Tech Stack

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zustand
- MDX
- Monaco Editor
- date-fns
- Lucide Icons

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

MIT License