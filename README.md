# Medium Clone Frontend

A modern, responsive frontend for a Medium-like blogging platform built with React, TypeScript, and Tailwind CSS. This application provides a clean, intuitive interface for reading, writing, and managing blog posts with seamless authentication and real-time updates.

## Features

- **🔐 Authentication System**: Complete signup/signin flow with JWT token management
- **📝 Rich Content Creation**: Intuitive blog writing interface with live preview
- **📚 Blog Management**: Browse, read, and manage blog posts
- **👤 User Profiles**: Dynamic avatar generation and author information
- **🎨 Modern UI/UX**: Clean, responsive design inspired by Medium
- **⚡ Real-time Updates**: Live blog feed with periodic updates
- **🌐 Responsive Design**: Optimized for desktop and mobile devices
- **🔍 Smart Loading**: Skeleton loading states and error handling

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for utility-first styling
- **Routing**: React Router DOM for client-side navigation
- **HTTP Client**: Axios for API communication
- **Icons**: Lucide React for beautiful icons
- **Validation**: Zod schemas from shared package
- **State Management**: React Hooks (useState, useEffect)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Access to the Medium Clone Backend API

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd medium-clone-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Update the API endpoints in `src/Config.ts`:
   ```typescript
   export const SIGNUP_URL = 'your-backend-url/api/v1/user/signup'
   export const SIGNIN_URL = 'your-backend-url/api/v1/user/signin'
   export const GET_BLOGS = 'your-backend-url/api/v1/blogs/allblogs'
   export const BLOGS_BY_ID = 'your-backend-url/api/v1/blogs/getBlogs'
   export const PUBLISH_BLOG = 'your-backend-url/api/v1/blogs/blog'
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── AddContent.tsx      # Blog creation form
│   ├── Appbar.tsx          # Navigation header
│   ├── Auth.tsx            # Signup form component
│   ├── Authsignin.tsx      # Signin form component
│   ├── Avatar.tsx          # User avatar component
│   ├── Blogcard.tsx        # Blog post card
│   ├── BlogPage.tsx        # Individual blog view
│   ├── Button.tsx          # Reusable button component
│   ├── Layout.tsx          # Main layout wrapper
│   ├── Quote.tsx           # Inspirational quote component
│   └── Skeleton.tsx        # Loading skeleton
├── pages/                  # Page components
│   ├── Blog.tsx            # Individual blog page
│   ├── Blogs.tsx           # Blog listing page
│   ├── Signin.tsx          # Sign in page
│   └── Signup.tsx          # Sign up page
├── hooks/                  # Custom React hooks
│   └── index.ts            # API hooks (useBlog, useBlogs)
├── icons/                  # Icon components
├── utils/                  # Utility functions
│   └── blog-adapter.ts     # Data transformation utilities
├── Config.ts               # API endpoint configuration
├── App.tsx                 # Main application component
└── main.tsx               # Application entry point
```

## Key Components

### Authentication
- **Signup/Signin Forms**: Complete user registration and login
- **JWT Token Management**: Automatic token storage and validation
- **Protected Routes**: Authentication-required pages

### Blog Management
- **Blog Creation**: Rich text editor for writing posts
- **Blog Listing**: Paginated blog feed with author information
- **Blog Reading**: Full-screen blog reading experience
- **Real-time Updates**: Automatic refresh of blog feed

### UI Components
- **Avatar System**: Dynamic user avatars with color-coded initials
- **Responsive Cards**: Mobile-friendly blog post cards
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: User-friendly error messages

## API Integration

### Authentication Endpoints
```typescript
// User Signup
POST /api/v1/user/signup
{
  "username": "string",
  "email": "string", 
  "password": "string"
}

// User Signin
POST /api/v1/user/signin
{
  "email": "string",
  "password": "string"
}
```

### Blog Endpoints
```typescript
// Create Blog
POST /api/v1/blogs/blog
Headers: { Authorization: "Bearer <token>" }
{
  "title": "string",
  "content": "string"
}

// Get All Blogs
GET /api/v1/blogs/allblogs
Headers: { Authorization: "Bearer <token>" }

// Get Blog by ID
GET /api/v1/blogs/getBlogs/:id
Headers: { Authorization: "Bearer <token>" }
```

## Custom Hooks

### useBlog
Fetches individual blog post data:
```typescript
const { loading, blog, error } = useBlog({ id: "blog-id" });
```

### useBlogs
Fetches all blog posts with real-time updates:
```typescript
const { loading, blogs, error } = useBlogs();
```

## Styling and Design

### Tailwind CSS Classes
- **Color Palette**: Carefully chosen colors for readability
- **Typography**: Serif fonts for content, sans-serif for UI
- **Spacing**: Consistent spacing using Tailwind's scale
- **Responsive Design**: Mobile-first approach

### Key Design Elements
- **Gradient Backgrounds**: Subtle gradients for visual appeal
- **Card Components**: Clean card-based layout
- **Avatar System**: Color-coded user avatars
- **Loading States**: Smooth skeleton loading animations

## Features in Detail

### Blog Creation
- Large title input field
- Expandable content textarea
- Auto-save functionality (ready for implementation)
- Publish button with success feedback

### Blog Reading
- Clean, distraction-free reading experience
- Author information sidebar
- Estimated reading time calculation
- Responsive typography

### User Experience
- Smooth navigation between pages
- Persistent authentication state
- Error boundary handling
- Loading state management

## State Management

### Authentication State
- JWT token stored in localStorage
- Automatic token validation
- Redirect logic for protected routes

### Blog State
- Real-time blog feed updates
- Individual blog caching
- Error state management
- Loading state coordination

## Performance Optimizations

- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Component lazy loading where applicable
- **Efficient Re-renders**: Optimized React re-rendering
- **API Caching**: Strategic API response caching

## Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

## Deployment

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify Deployment
```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
```

### Environment Variables
Set the following environment variables in your deployment platform:
- `VITE_API_BASE_URL`: Your backend API base URL

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Code Style

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting for consistency
- **Prettier**: Code formatting
- **Component Structure**: Functional components with hooks

## Testing

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e
```

## Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Screen reader compatibility
- High contrast color ratios

## Security Considerations

- XSS protection through React's built-in escaping
- JWT token secure storage
- HTTPS enforcement
- Input validation and sanitization

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Check if backend is running
   - Verify API endpoints in Config.ts
   - Check browser console for token issues

2. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check for conflicting CSS classes

3. **API Connection Issues**
   - Verify CORS settings on backend
   - Check network tab for failed requests

## Roadmap

- [ ] Rich text editor with formatting options
- [ ] Image upload functionality
- [ ] Comment system
- [ ] Like/dislike features
- [ ] User profile pages
- [ ] Search functionality
- [ ] Dark mode support
- [ ] PWA capabilities
- [ ] Social sharing features

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or issues:
1. Check the GitHub issues
2. Create a new issue with detailed description
3. Contact the development team

## Acknowledgments

- Inspired by Medium's clean design
- Built with modern React best practices
- Thanks to the open-source community for the amazing tools