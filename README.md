# Infinite Prints Frontend

A modern React frontend for the Infinite Prints e-commerce platform with user authentication, including login and registration functionality.

## Features

- ✅ **User Registration**: Create a new account with email, password, first name, and last name
- ✅ **User Login**: Secure login with JWT token authentication
- ✅ **Protected Routes**: Dashboard accessible only to authenticated users
- ✅ **Responsive Design**: Mobile-friendly UI built with Tailwind CSS
- ✅ **Clean Header**: Navigation bar with login/register links and user profile section
- ✅ **Docker Support**: Full Docker and Docker Compose support for deployment
- ✅ **Organized Structure**: Pages organized in subdirectories (authentication, dashboard)

## Tech Stack

- **React 18** - UI framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework
- **React Scripts** - Build tooling
- **Docker & Docker Compose** - Containerization for deployment

## Prerequisites

- Node.js 14+ and npm
- Backend API running on `http://localhost:8080/api`
- (Optional) Docker and Docker Compose for containerized deployment

## Project Structure

```
src/
├── components/
│   └── Header.js          # Navigation header with login/logout
├── pages/
│   ├── authentication/
│   │   ├── Login.js       # Login page
│   │   └── Register.js    # Registration page
│   └── dashboard/
│       └── Dashboard.js   # Protected dashboard page
├── App.js                 # Main app component with routing
├── index.js              # Entry point
└── index.css             # Global styles with Tailwind
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file in the root directory:

```
REACT_APP_API_URL=http://localhost:8080/api
```

### 3. Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

## Docker Deployment

### Development with Docker

```bash
# Build the Docker image
docker build -t infinite-prints-frontend:dev -f Dockerfile .

# Run the container
docker run -p 3000:3000 -e REACT_APP_API_URL=http://localhost:8080/api infinite-prints-frontend:dev
```

### Production with Docker (Nginx)

```bash
# Build production image
docker build -t infinite-prints-frontend:prod -f Dockerfile.prod .

# Run the production container
docker run -p 80:80 -e REACT_APP_API_URL=https://api.yourdomain.com/api infinite-prints-frontend:prod
```

### Full Stack with Docker Compose

```bash
docker-compose up --build
```

This starts:
- **Frontend** on port 3000
- **Backend** on port 8080
- **PostgreSQL** on port 5432

## Available Routes

| Route | Description | Protected |
|-------|-------------|-----------|
| `/login` | Login page | No |
| `/register` | Registration page | No |
| `/dashboard` | User dashboard | Yes |
| `/` | Home (redirects to login or dashboard) | No |

## API Endpoints Used

### Register
- **Endpoint**: `POST /api/auth/register`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }
  ```

### Login
- **Endpoint**: `POST /api/auth/login`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

## Authentication Flow

1. User registers with email, password, first name, and last name
2. Backend creates user account with hashed password
3. User logs in with email and password
4. Backend returns JWT token
5. Token is stored in localStorage
6. Token is used for future authenticated requests
7. User can access protected routes with valid token

## Testing

Test credentials (if seeded in backend):
- Email: `test@test.com`
- Password: `test123`

## Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` directory.

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:8080/api` |

## Deployment Options

### Option 1: Vercel (Recommended for Frontend)
See `DOCKER_AND_DEPLOYMENT.md` for detailed Vercel deployment instructions.

### Option 2: Docker Deployment
- AWS ECS/Fargate
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform
- Railway.app

See `DOCKER_AND_DEPLOYMENT.md` for complete deployment guides.

## Future Enhancements

- 🔜 Product catalog page
- 🔜 Shopping cart functionality
- 🔜 Order management
- 🔜 User profile/settings page
- 🔜 Password reset functionality
- 🔜 Email verification
- 🔜 Order history and tracking
- 🔜 Payment integration
- 🔜 Search and filters
- 🔜 User reviews and ratings

## Troubleshooting

### API calls failing
- Verify backend is running on `http://localhost:8080`
- Check `REACT_APP_API_URL` environment variable
- Ensure backend CORS allows your frontend URL

### Port 3000 already in use
```bash
# Kill the process using port 3000
lsof -i :3000 | grep -v COMMAND | awk '{print $2}' | xargs kill -9
```

### Docker build failing
- Ensure Docker is installed and running
- Check Docker daemon is available
- Try `docker system prune` to clean up

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss proposed changes.

## License

This project is part of the Infinite Prints platform.
