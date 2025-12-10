# COPD-Prediction-System-Frontend

## Key Features

### Authentication
- User registration with email verification
- Secure login with JWT tokens
- Protected routes using middleware

### Health Data Management
- Audio file upload (WAV, MP3)
- Real-time prediction results
- Historical data visualization

### Dashboard
- Risk score charts (Recharts)
- Timeline of health assessments
- Detailed spectrogram views

### UI/UX
- Responsive design
- Health-themed color palette (green primary)
- Smooth transitions and animations
- Accessible components (WCAG compliant)

## Development Workflow

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## Architecture Principles

### Domain Layer
- Contains pure business logic
- No dependencies on external frameworks
- Defines entities, repositories (interfaces), and use cases

### Infrastructure Layer
- Implements repository interfaces
- Handles HTTP requests, storage, and external services
- Contains API client configuration

### Application Layer
- React hooks for business logic
- Service classes for complex operations
- Providers for global state

### Presentation Layer
- React components
- UI library integrations
- Styling and theming

## Color Scheme

### Primary (Health Green)
- Used for: CTAs, success states, health indicators
- Palette: `primary-500` (#22c55e) as main

### Neutral
- Used for: Text, borders, backgrounds
- Light mode base: `neutral-50` to `neutral-200`
- Dark mode base: `neutral-800` to `neutral-900`

### Zinc
- Used for: UI elements, cards, subtle backgrounds
- Alternative to neutral for depth variation

### Status Colors
- Success: Green (`primary-500`)
- Warning: Amber (`#f59e0b`)
- Error: Red (`#ef4444`)
- Info: Blue (`#3b82f6`)

## Next Steps

1. Set up the complete file structure
2. Implement domain entities and use cases
3. Create repository implementations
4. Build React hooks with TanStack Query
5. Design and implement UI components
6. Create page layouts and routing
7. Add authentication middleware
8. Implement charts and visualizations
9. Add error handling and loading states
10. Write tests and documentation

## API Integration

All API calls use axios with interceptors for:
- JWT token injection
- Error handling
- Request/response transformation
- Loading state management

Base URL: `http://127.0.0.1:8000/api/v1`

## License

MIT License - Same as backend project