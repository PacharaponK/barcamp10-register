# Barcamp Registration Application

A full-stack web application for managing event registration with user authentication, participant management, and admin capabilities. Built with React for the frontend and Express.js for the backend, featuring Google OAuth authentication and MongoDB persistence.

## Key Features

- **User Registration & Authentication**: Google OAuth 2.0 integration for seamless login
- **Role-Based Access Control**: Separate interfaces for participants and administrators
- **Participant Management**: Registration form with status tracking (pending, qualified, confirmed, not qualified)
- **Voting System**: Participants can vote on topics with configurable limits
- **Admin Console**: Manage registrations, view analytics, and control application settings
- **QR Code Generation**: Generate QR codes for participant credentials
- **File Export**: Export participant data to Excel format
- **Responsive Design**: Mobile-friendly UI built with React and Tailwind CSS
- **Real-Time Updates**: Session-based state management with secure cookies
- **Special Registration Links**: Admin-controlled registration URLs with hash validation

## Tech Stack

### Frontend
- **React** 18.2 - UI library with hooks
- **Vite** 4.5 - Build tool and development server
- **React Router** 6.17 - Client-side routing
- **Tailwind CSS** 3.3 - Utility-first CSS framework
- **Emotion** 11.10 - CSS-in-JS styling solution
- **Formik & Yup** - Form handling and validation
- **Axios** 1.2 - HTTP client
- **Three.js & Vanta** - 3D graphics and background effects
- **Framer Motion** 10.16 - Animation library
- **QRCode** 1.5 - QR code generation
- **SweetAlert2** 11.6 - Alert dialogs
- **XLSX** 0.18 - Excel file handling

### Backend
- **Express.js** 4.18 - Web framework
- **Node.js** 16+ - JavaScript runtime
- **MongoDB** 7.6 - NoSQL database
- **Mongoose** 7.6 - MongoDB object modeling
- **Passport.js** 0.7 - Authentication middleware
- **Express Session** 1.18 - Session management
- **JWT** 9.0 - Token-based authentication
- **Multer** 1.4 - File upload handling
- **CORS** 2.8 - Cross-origin resource sharing
- **Dotenv** 16.3 - Environment variable management
- **Nodemon** 3.0 - Development auto-reload

### Tools & Deployment
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **ESLint** - Code quality and standards
- **Prettier** - Code formatting

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v16 or higher ([download](https://nodejs.org/))
- **npm** v8 or higher (comes with Node.js)
- **MongoDB** v5.0 or higher (local or Atlas cloud instance)
- **Git** for version control
- **Docker** & **Docker Compose** (optional, for containerized deployment)

### System Requirements
- RAM: 2GB minimum
- Disk Space: 500MB
- Operating System: Windows, macOS, or Linux

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/PacharaponK/barcamp10-register.git
cd registration-app
```

### 2. Backend Setup

#### 2.1 Install Dependencies

```bash
cd server-js
npm install
```

#### 2.2 Configure Environment Variables

Create a `.env` file in the `server-js` directory based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` with your configuration (see [Environment Variables](#environment-variables) section below).

#### 2.3 Verify Database Connection

Ensure MongoDB is running and the `DATABASE_URI` in `.env` is correct:

```bash
# Test connection (optional)
node -e "require('mongoose').connect(process.env.DATABASE_URI).then(() => console.log('Connected')).catch(err => console.error(err))"
```

#### 2.4 Start the Backend Server

```bash
# Development with auto-reload
npm run dev

# Production
node src/index.js
```

The server will start on `http://localhost:8080` (or your configured PORT).

### 3. Frontend Setup

#### 3.1 Install Dependencies

```bash
cd ../client-js
npm install
```

#### 3.2 Configure API Endpoint

Update the API configuration in `src/services/config.js` if needed to match your backend URL.

#### 3.3 Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### 4. Verify Installation

1. Open `http://localhost:3000` in your browser
2. You should see the registration page
3. Test Google OAuth login with your configured credentials
4. Check admin console at appropriate route with admin credentials

## Available Scripts

### Frontend Commands

```bash
cd client-js

# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint to check code quality
npm run lint
```

### Backend Commands

```bash
cd server-js

# Start development server with auto-reload (nodemon)
npm run dev

# Start production server
node src/index.js

# Run tests (currently a placeholder)
npm test
```

### Docker Commands (Server Only)

```bash
cd server-js

# Build and start server
docker-compose -f dockercompose.yml up --build

# Start server in background
docker-compose -f dockercompose.yml up -d

# Stop server
docker-compose -f dockercompose.yml down

# View logs
docker-compose -f dockercompose.yml logs -f
```

## API Endpoints

### Authentication Endpoints (`/api/auth`)
- `GET /api/auth/google` - Initiate Google OAuth flow
- `GET /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/logout` - Logout and clear session
- `GET /api/auth/user` - Get current authenticated user

### Participant Endpoints (`/api/participant`)
- `GET /api/participant/profile` - Get user profile
- `POST /api/participant/register` - Submit registration
- `PUT /api/participant/profile` - Update profile
- `GET /api/participant/status` - Get registration status
- `POST /api/participant/slip` - Upload registration slip

### Admin Endpoints (`/api/admin`)
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/participants` - List all participants
- `PUT /api/admin/participant/:id/status` - Update participant status
- `GET /api/admin/analytics` - Get registration analytics
- `POST /api/admin/console/settings` - Update console settings

### Console Endpoints (`/api/console`)
- `GET /api/console/settings` - Get console configuration
- `POST /api/console/settings` - Update settings
- `GET /api/console/topics` - List topics for voting

### Vote Endpoints (`/api/vote`)
- `POST /api/vote` - Submit a vote
- `GET /api/vote/results` - Get voting results
- `DELETE /api/vote/:id` - Delete a vote

**Note**: For detailed API documentation, check individual route files in `server-js/src/routes/`.

## Deployment Instructions

### Option 1: Heroku (Backend) + Vercel (Frontend)

#### Deploy Backend to Heroku

```bash
# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set GOOGLE_CLIENT_ID=your_id
heroku config:set GOOGLE_CLIENT_SECRET=your_secret
heroku config:set DATABASE_URI=your_mongodb_uri
heroku config:set CLIENT_URL=https://your-vercel-url.vercel.app

# Deploy
git push heroku main
```

#### Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd client-js
vercel

# Set API endpoint to Heroku app during setup
```

### Option 2: Docker & Self-Hosted Server

#### Build and Push Docker Images

```bash
# Build images
docker build -t your-registry/barcamp-client client-js/
docker build -t your-registry/barcamp-server server-js/

# Push to registry (Docker Hub, ECR, etc.)
docker push your-registry/barcamp-client
docker push your-registry/barcamp-server
```

#### Deploy with Docker Compose (Server)

```bash
cd server-js

# Update dockercompose.yml with your images
docker-compose -f dockercompose.yml up -d

# Verify services
docker-compose -f dockercompose.yml ps
```

### Option 3: Traditional VPS/Dedicated Server

#### Backend Setup

```bash
# SSH into server
ssh user@your-server-ip

# Clone repository
git clone https://github.com/PacharaponK/barcamp10-register.git
cd registration-app/server-js

# Install dependencies
npm install

# Create production .env
nano .env

# Use PM2 for process management
npm install -g pm2
pm2 start src/index.js --name "barcamp-server"
pm2 save
```

#### Frontend Setup

```bash
cd ../client-js

# Install dependencies
npm install

# Build
npm run build

# Serve with Nginx or Apache
# Copy dist/ to your web server directory
cp -r dist/* /var/www/html/
```

### Production Environment Variables

Before deployment, update these critical variables:

```dotenv
PRODUCTION=true
CLIENT_URL=https://yourdomain.com
GOOGLE_CLIENT_REDIRECT_URI=https://api.yourdomain.com
DATABASE_URI=mongodb+srv://prod_user:prod_password@cluster.mongodb.net/prod
```

### SSL/HTTPS Configuration

Use Let's Encrypt for free SSL certificates:

```bash
# With Certbot (for Nginx/Apache)
sudo certbot certonly --standalone -d yourdomain.com
```

## Testing

### Frontend Testing

Currently, the frontend uses ESLint for code quality:

```bash
cd client-js

# Run linter
npm run lint

# Fix linting issues
npm run lint -- --fix
```

To add unit tests in the future, consider:
- **Vitest** for unit testing with Vite
- **React Testing Library** for component testing
- **Cypress** for E2E testing

### Backend Testing

The backend test suite is currently a placeholder. To implement testing:

```bash
cd server-js

# Install testing dependencies
npm install --save-dev jest supertest

# Create test file
mkdir __tests__
# Add test files

# Run tests
npm test
```

### Manual Testing Checklist

- [ ] Google OAuth login/logout
- [ ] User registration form submission
- [ ] Admin console access and settings
- [ ] Participant status updates
- [ ] Voting functionality
- [ ] QR code generation
- [ ] Excel export
- [ ] Mobile responsiveness
- [ ] Session timeout
- [ ] Database persistence

## Contributing Guidelines

### Code Standards

1. **Naming Conventions**
   - Components: PascalCase (`UserCard.jsx`)
   - Functions: camelCase (`getUserData()`)
   - Constants: UPPER_SNAKE_CASE (`DEFAULT_TIMEOUT = 5000`)
   - Files: Match exported entity name

2. **Code Formatting**
   - Use Prettier with `.prettierrc` configuration
   - Run `npm run lint` before committing
   - Indentation: 4 spaces

3. **Commit Messages**
   ```
   [TYPE] Brief description
   
   Detailed explanation if needed
   ```
   Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
   
   Example:
   ```
   [feat] Add QR code generation for participant verification
   
   - Implemented qrcode library integration
   - Created QRCode component
   - Added download functionality
   ```

### Branch Naming

- Feature: `feature/description-here`
- Bug fix: `bugfix/issue-description`
- Hotfix: `hotfix/critical-issue`
- Release: `release/v1.0.0`

### Pull Request Process

1. Create a feature branch from `dev`
2. Make your changes and commit regularly
3. Push to your fork
4. Create a Pull Request with a clear description
5. Wait for code review
6. Address feedback and update PR
7. Merge after approval

### Setting Up Development Environment

```bash
# Install pre-commit hooks (optional but recommended)
npm install husky --save-dev
npx husky install

# Install commitlint for commit message validation
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

MIT License summary:
- You can use, modify, and distribute this software freely
- You must include a copy of the license in any distribution
- The software is provided "as is" without warranty

---

## Support & Contact

For questions, issues, or contributions:
- **Repository**: https://github.com/PacharaponK/barcamp10-register
- **Issues**: https://github.com/PacharaponK/barcamp10-register/issues

## Changelog

### Version 1.0.0
- Initial release
- User registration with Google OAuth
- Admin dashboard
- Participant status tracking
- Voting system
- QR code generation
- Excel export functionality

---

**Last Updated**: November 2025
**Maintained By**: Barcamp Team
