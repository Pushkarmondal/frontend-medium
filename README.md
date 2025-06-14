# Medium Backend

A modern, serverless backend API for a Medium-like blogging platform built with Hono.js, Prisma ORM, and designed for Cloudflare Workers. This application provides complete user authentication and blog management functionality with TypeScript support and comprehensive validation.

## Features

- **🔐 Secure Authentication**: JWT-based auth with bcrypt password hashing
- **📝 Blog Management**: Full CRUD operations for blog posts
- **⚡ Serverless Ready**: Built for Cloudflare Workers with edge computing
- **🎯 Type Safety**: Complete TypeScript implementation with Zod validation
- **🔄 Real-time Performance**: Prisma Accelerate for optimized database queries
- **📊 User Management**: Complete user registration and authentication system
- **🌐 CORS Enabled**: Cross-origin requests supported

## Tech Stack

- **Runtime**: Cloudflare Workers
- **Framework**: Hono.js (Ultra-fast web framework)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT + bcryptJS
- **Validation**: Zod schemas from shared package
- **Performance**: Prisma Accelerate for edge caching

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Cloudflare Workers account (for deployment)
- Wrangler CLI tool

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd medium-clone-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `wrangler.toml` file:
   ```toml
   name = "medium-backend"
   main = "src/index.ts"
   compatibility_date = "2023-12-01"

   [vars]
   DATABASE_URL = "your_postgres_connection_string"
   JWT_SECRET = "your_jwt_secret_key"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma migrate dev --name init
   ```

5. **Development Server**
   ```bash
   npm run dev
   # or
   wrangler dev
   ```

## API Endpoints

### Authentication Routes

#### POST `/api/v1/user/signup`
Register a new user account.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST `/api/v1/user/signin`
Authenticate existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Blog Management Routes
*All blog routes require authentication via Bearer token*

#### POST `/api/v1/blogs/blog`
Create a new blog post.

**Headers:**
```
Authorization: Bearer your_jwt_token
```

**Request Body:**
```json
{
  "title": "My First Blog Post",
  "content": "This is the content of my blog post..."
}
```

**Response:**
```json
{
  "message": "Blog created",
  "blog": {
    "id": "uuid-string",
    "title": "My First Blog Post",
    "content": "This is the content...",
    "authorId": "author-uuid"
  }
}
```

#### PUT `/api/v1/blogs/update-blog`
Update an existing blog post.

**Headers:**
```
Authorization: Bearer your_jwt_token
```

**Request Body:**
```json
{
  "id": "blog-uuid",
  "title": "Updated Blog Title",
  "content": "Updated content..."
}
```

**Response:**
```json
{
  "message": "Blog updated",
  "updatedBlog": {
    "id": "blog-uuid",
    "title": "Updated Blog Title",
    "content": "Updated content...",
    "authorId": "author-uuid"
  }
}
```

#### GET `/api/v1/blogs/getBlogs/:id`
Get a specific blog post by ID.

**Headers:**
```
Authorization: Bearer your_jwt_token
```

**Response:**
```json
{
  "blog": {
    "id": "blog-uuid",
    "title": "Blog Title",
    "content": "Blog content...",
    "author": {
      "username": "john_doe"
    }
  }
}
```

#### GET `/api/v1/blogs/allblogs`
Get all blog posts.

**Headers:**
```
Authorization: Bearer your_jwt_token
```

**Response:**
```json
{
  "blogs": [
    {
      "id": "blog-uuid-1",
      "title": "First Blog",
      "content": "Content...",
      "author": {
        "username": "john_doe"
      }
    },
    {
      "id": "blog-uuid-2",
      "title": "Second Blog",
      "content": "More content...",
      "author": {
        "username": "jane_doe"
      }
    }
  ]
}
```

## Database Schema

### User Model
```prisma
model user {
  id       String  @id @default(uuid())
  username String
  password String  @unique
  email    String  @unique
  posts    Blogs[]
}
```

### Blog Model
```prisma
model Blogs {
  id        String  @id @default(uuid())
  title     String
  content   String
  published Boolean @default(false)
  author    user    @relation(fields: [authorId], references: [id])
  authorId  String
}
```

## Project Structure

```
├── src/
│   ├── index.ts              # Main application entry point
│   └── routes/
│       ├── user.ts           # User authentication routes
│       └── blogs.ts          # Blog management routes
├── prisma/
│   └── schema.prisma         # Database schema
├── package.json
├── wrangler.toml            # Cloudflare Workers configuration
└── tsconfig.json           # TypeScript configuration
```

## Authentication & Security

### JWT Authentication
- All blog routes are protected with JWT middleware
- Tokens are verified using the `JWT_SECRET` environment variable
- User information is attached to the request context after verification

### Password Security
- Passwords are hashed using bcryptJS with salt rounds of 10
- Plain text passwords are never stored in the database

### Input Validation
- All requests are validated using Zod schemas from the shared package `@nishitcodes100x/medium-common`
- Type-safe validation ensures data integrity

## Error Handling

The API provides comprehensive error responses:
- `400`: Invalid data or malformed requests
- `401`: Unauthorized access or invalid tokens
- `403`: Forbidden access or validation failures
- `404`: Resource not found
- `500`: Internal server errors

## Development

### Running Locally
```bash
# Start development server
npm run dev

# Or using Wrangler
wrangler dev
```

### Database Operations
```bash
# Generate Prisma client
npx prisma generate

# Create and run migrations
npx prisma migrate dev

# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset
```

### Testing
```bash
# Run tests (if configured)
npm test
```

## Deployment

### Cloudflare Workers Deployment
```bash
# Deploy to Cloudflare Workers
npm run deploy
# or
wrangler deploy
```

### Environment Variables
Set the following secrets in Cloudflare Workers:
```bash
wrangler secret put DATABASE_URL
wrangler secret put JWT_SECRET
```

## Performance Optimizations

- **Prisma Accelerate**: Edge caching for database queries
- **Serverless Architecture**: Auto-scaling and global distribution
- **Selective Field Queries**: Only fetch required data fields
- **JWT Middleware**: Efficient token verification

## Dependencies

### Main Dependencies
- `hono`: Ultra-fast web framework
- `@prisma/client`: Database ORM
- `@prisma/extension-accelerate`: Edge database acceleration
- `bcryptjs`: Password hashing
- `@nishitcodes100x/medium-common`: Shared validation schemas

### Dev Dependencies
- `typescript`: Type safety
- `wrangler`: Cloudflare Workers CLI
- `prisma`: Database toolkit

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## API Response Format

All API responses follow a consistent format:
- **Success**: JSON object with relevant data
- **Error**: JSON object with error message and appropriate HTTP status code

## Rate Limiting

Consider implementing rate limiting for production deployments to prevent abuse.


## Support

For questions or issues:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Contact the development team

## Roadmap

- [ ] Implement blog categories and tags
- [ ] Add user profile management
- [ ] Implement blog search functionality
- [ ] Add comment system
- [ ] Implement like/dislike features
- [ ] Add image upload support
- [ ] Implement email notifications
