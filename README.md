# BlogForge

A modern full-stack blog management application for creating, managing, viewing, and organizing blog posts through a clean and responsive dashboard.

BlogForge is built with a React frontend and an Express.js backend, with PostgreSQL providing persistent data storage through Sequelize ORM.

---

## Overview

BlogForge provides a centralized interface for managing blog content through a simple CRUD workflow.

The application allows users to:

* View dashboard statistics
* Create blog posts
* View individual posts
* Edit existing posts
* Delete posts with confirmation
* Browse all posts
* Search and filter posts
* Sort posts
* View post details
* View author information
* Monitor API health status
* Handle loading, empty, success, and error states

The project was built with a focus on clean component structure, reusable UI components, API separation, responsive design, and a practical full-stack architecture.

---

## Features

### Dashboard

The dashboard provides an overview of the application's content and system status.

It includes:

* Total posts count
* Authors count
* API health status
* Recent posts
* Quick access to create a post
* Quick access to view all posts
* Post editing and viewing actions
* Post deletion with confirmation
* Success and error feedback
* Loading and empty states

---

### Posts Management

BlogForge supports the complete CRUD lifecycle for blog posts.

Users can:

* Create new posts
* View existing posts
* Edit posts
* Delete posts
* View post details
* Search posts
* Filter posts
* Sort posts

Delete operations include a confirmation modal to help prevent accidental deletion.

---

### Responsive Interface

The frontend is designed to work across different screen sizes, including:

* Desktop
* Laptop
* Tablet
* Mobile

The application uses responsive CSS layouts and reusable UI components to maintain a consistent experience across screen sizes.

---

### User and Author Data

BlogForge retrieves author information from the backend and displays author-related data within the dashboard and post workflow.

---

### API Health Monitoring

The dashboard includes an API status indicator that checks the backend health endpoint.

The interface can display:

* `Checking...`
* `Online`
* `Offline`

This provides a quick indication of whether the backend API and database connection are available.

---

### User Feedback States

The application provides dedicated UI states for different operations, including:

* Loading states
* Empty states
* Success messages
* Error messages
* Retry actions
* Delete confirmation states

This helps make API operations clear to the user instead of silently failing.

---

## Technology Stack

### Frontend

| Technology       | Purpose                              |
| ---------------- | ------------------------------------ |
| React 19         | Frontend UI                          |
| React DOM        | React rendering                      |
| React Router DOM | Client-side routing                  |
| Axios            | HTTP/API communication               |
| React Icons      | Interface icons                      |
| Vite             | Development server and build tooling |
| ESLint           | Code quality and linting             |

### Backend

| Technology        | Purpose                       |
| ----------------- | ----------------------------- |
| Node.js           | JavaScript runtime            |
| Express.js        | REST API framework            |
| PostgreSQL        | Relational database           |
| Sequelize         | ORM/database interaction      |
| Express Validator | Request validation            |
| CORS              | Cross-origin request handling |
| dotenv            | Environment configuration     |
| Nodemon           | Development server reloading  |

---

## Project Architecture

BlogForge is organized as a full-stack application with separate frontend and backend applications.

```text
blogforge/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   │
│   │   ├── controllers/
│   │   │   └── postController.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Post.js
│   │   │   └── index.js
│   │   │
│   │   ├── routes/
│   │   │   └── postRoutes.js
│   │   │
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── README.md
└── .gitignore
```

The frontend communicates with the backend through HTTP requests using Axios.

The backend exposes API endpoints through Express and communicates with PostgreSQL through Sequelize.

---

## Frontend Structure

The React application uses reusable components and page-level components to keep the interface organized.

The structure includes areas such as:

```text
frontend/
└── src/
    ├── components/
    │   ├── layout/
    │   ├── posts/
    │   └── ui/
    │
    ├── pages/
    │
    ├── services/
    │
    └── ...
```

### Components

Reusable components are used for common interface elements and application functionality.

Examples include:

* `Layout`
* `StatCard`
* `PostCard`
* `DeletePostModal`

This allows common UI behavior to be reused across different pages.

### Services

API communication is separated from the UI through the services layer.

This keeps HTTP requests out of individual presentation components and provides a centralized place for backend communication.

---

## Backend Structure

The backend is built with Express.js and follows a modular structure under the `src` directory.

```text
backend/
└── src/
    ├── ...
    └── server.js
```

The backend is responsible for:

* Starting the Express server
* Handling API requests
* Validating incoming data
* Communicating with PostgreSQL
* Managing blog post data
* Managing author/user data
* Providing health information
* Handling cross-origin requests

---

## API

The frontend communicates with the backend through REST-style HTTP endpoints.

The API supports operations for:

### Posts

```text
GET     /api/.../posts
GET     /api/.../posts/:id
POST    /api/.../posts
PUT     /api/.../posts/:id
DELETE  /api/.../posts/:id
```

> The exact API prefix and endpoint paths should be updated here if they differ from the routes configured in the backend.

### Users / Authors

```text
GET     /api/.../users
```

### Health

The application also provides a health endpoint used by the dashboard to determine whether the API is available.

> The exact health endpoint path should match the route configured in the backend.

---

## Getting Started

Follow the steps below to run BlogForge locally.

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* PostgreSQL
* Git

You can verify Node.js and npm with:

```bash
node -v
npm -v
```

Verify PostgreSQL with:

```bash
psql --version
```

---

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate into the project:

```bash
cd BlogForge
```

The frontend and backend have separate dependencies, so install them independently.

---

## Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the backend directory.

Example:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=blogforge
DB_USER=postgres
DB_PASSWORD=your_database_password

CLIENT_URL=http://localhost:5173
```

> Use the actual environment variable names defined by the current backend configuration.

Create the PostgreSQL database configured in your environment variables.

Then start the development server:

```bash
npm run dev
```

For production-style execution:

```bash
npm start
```

---

## Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

If the frontend requires an environment variable for the backend API, create:

```text
.env
```

For example:

```env
VITE_API_URL=http://localhost:5000
```

Use the actual variable name expected by the frontend API service.

Start the development server:

```bash
npm run dev
```

Vite will provide the local development URL in the terminal.

---

## Available Frontend Scripts

The frontend currently provides the following npm scripts:

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Production Build

```bash
npm run build
```

Creates a production build of the React application.

### Preview

```bash
npm run preview
```

Serves the production build locally for preview.

### Lint

```bash
npm run lint
```

Runs ESLint against the frontend source code.

---

## Available Backend Scripts

### Development

```bash
npm run dev
```

Starts the Express server using Nodemon.

### Production

```bash
npm start
```

Starts the Express server with Node.js.

### Test

```bash
npm test
```

The backend currently contains the default placeholder test script and does not yet have an automated test suite configured.

---

## Environment Variables

Environment variables are used to keep configuration and sensitive credentials outside the source code.

Typical backend configuration includes:

```env
PORT=
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
CLIENT_URL=
```

Frontend configuration may include the backend API URL:

```env
VITE_API_URL=
```

Never commit sensitive environment files such as:

```text
.env
.env.local
.env.production
```

to a public repository.

---

## Application Workflow

The general application workflow is:

```text
User
  │
  ▼
React Frontend
  │
  │ Axios HTTP Requests
  ▼
Express REST API
  │
  ▼
Sequelize ORM
  │
  ▼
PostgreSQL
```

For example, when creating a post:

```text
Create Post Form
       │
       ▼
React Component
       │
       ▼
Axios Request
       │
       ▼
Express API
       │
       ▼
Validation
       │
       ▼
Sequelize
       │
       ▼
PostgreSQL
```

The response is then returned to the frontend and the interface updates accordingly.

---

## Error Handling

BlogForge separates different types of application states.

### Loading

Displayed while API requests are being processed.

### Empty

Displayed when there are currently no posts.

### Success

Displayed after successful operations such as deleting a post.

### Action Error

Displayed when an operation such as deleting a post fails.

### Data Loading Error

Displayed when required data cannot be retrieved from the backend.

### API Status

The dashboard communicates whether the backend health check is currently online or offline.

---

## Development Principles

The project follows several practical development principles:

* Reusable React components
* Separation of API services from UI components
* REST-style backend communication
* Responsive interface design
* Clear loading and error states
* Confirmation before destructive operations
* Environment-based configuration
* ESLint-based frontend validation
* PostgreSQL persistence through Sequelize

---

## Future Improvements

Potential future improvements include:

* Authentication and authorization
* Role-based access control
* Rich text editing
* Image uploads
* Post categories
* Tags
* Pagination
* Draft and published states
* Automated frontend tests
* Automated backend tests
* API documentation with Swagger/OpenAPI
* Improved accessibility auditing
* Advanced analytics
* Production deployment
* CI/CD integration

---

## Production Checklist

Before deploying BlogForge to production:

* [ ] Configure production environment variables
* [ ] Configure production PostgreSQL database
* [ ] Update frontend API URL
* [ ] Configure CORS for the production frontend
* [ ] Run frontend linting
* [ ] Run the production frontend build
* [ ] Verify backend API endpoints
* [ ] Verify database connectivity
* [ ] Test CRUD operations
* [ ] Test loading and error states
* [ ] Test responsive layouts
* [ ] Remove development-only configuration
* [ ] Verify sensitive environment variables are not committed

---

## Screenshots

Screenshots can be added here to showcase the application.

Suggested screenshots:

1. Dashboard
2. Posts listing
3. Create post page
4. Edit post page
5. Post details
6. Delete confirmation modal
7. Responsive/mobile interface

Example:

```md
## Screenshots

### Dashboard

![BlogForge Dashboard](./screenshots/dashboard.png)

### Posts

![BlogForge Posts](./screenshots/posts.png)
```

---

## Project Status

BlogForge currently provides a functional full-stack CRUD workflow with:

* React frontend
* Express backend
* PostgreSQL database
* Sequelize ORM
* Dashboard
* Posts CRUD
* Author data
* API health monitoring
* Search/filter/sort functionality
* Responsive UI
* Loading, empty, success, and error states

The project is continuing through final UI refinement, validation, documentation, and production preparation.

---

## Author

### Clinton Nwamah

Full-Stack Web Developer specializing in React, Next.js, Laravel, and modern web application development.

* GitHub: [github.com/cnwhytenwamah](https://github.com/cnwhytenwamah)
* LinkedIn: [linkedin.com/in/cnwhytenwamah](https://linkedin.com/in/cnwhytenwamah)
* Portfolio: [cnwhyte-dev.vercel.app](https://cnwhyte-dev.vercel.app)

---

## License

This project currently uses the license configuration defined in the backend package configuration.

A dedicated repository-level license can be added when the project is published.
