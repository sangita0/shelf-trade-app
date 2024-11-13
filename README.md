Here’s a README file for the frontend of your Book Exchange Platform project:

---

# ShelfTrade Frontend Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Environment Variables](#environment-variables)
5. [Project Structure](#project-structure)
6. [Components](#components)
7. [API Integration](#api-integration)
8. [Authentication](#authentication)
9. [Error Handling](#error-handling)
10. [Deployment](#deployment)
11. [Security](#security)

---

## Project Overview
The ShelfTrade Frontend is a React TypeScript application designed for users to explore and participate in book exchanges. This interface allows users to search for books, manage their own books, and interact with other users’ listings on the platform. It connects to a .NET Web API backend for data management and authentication.

## System Architecture
The frontend architecture includes the following components:
- **Authentication Management**: Handles login, registration, and token-based user session management.
- **Book Management**: Allows users to add, edit, delete, and search for books.
- **UI and Styling**: Clean, inline styles are applied directly within components, ensuring a modern, minimal design.
- **Routing**: Uses `react-router-dom` for navigating between pages.

---

## Tech Stack
- **Framework**: React with TypeScript
- **Routing**: `react-router-dom` for navigation
- **State Management**: React’s `useState` and `useContext` for managing global states (e.g., authentication).
- **UI Styling**: Inline styles within components

---

## Getting Started

### Prerequisites
- Node.js (v14 or higher recommended)
- npm or yarn package manager
- A running instance of the ShelfTrade Backend for API connectivity

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/ShelfTrade-Frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ShelfTrade-Frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

### Environment Variables
Create a `.env` file in the root directory and define the following variable:

```plaintext
REACT_APP_API_BASE_URL="http://localhost:7004/api"
```

---

## Project Structure
The main files and folders are structured as follows:
- `src`
  - `components/` - Contains reusable UI components (e.g., Login, Register, Dashboard, AddBook, ViewBooks).
  - `pages/` - Contains main pages like Dashboard, Login, Register.
  - `contexts/` - Holds context files, including AuthContext for authentication management.
  - `App.tsx` - Main component rendering routes and initializing the app.
  - `index.tsx` - Entry point for the React app.

---

## Components
- **Login**: Manages user authentication with email and password fields.
- **Register**: Provides user registration with fields like name, email, password, favorite genre, and reading preferences.
- **Dashboard**: Displays available books, search functionality, and filter options.
- **AddBook**: Form for adding new books, fetching `userId` and `Authorization token` from `AuthContext`.
- **ViewBooks**: Allows users to see and manage their added books.
  
---

## API Integration
API requests are made to the ShelfTrade Backend using fetch requests with headers for Authorization. Common API endpoints:
- **Authentication**: `/api/auth/register`, `/api/auth/login`
- **Books Management**: `/api/books`, `/api/books/excludeUser/{userId}` for fetching books except those by the current user.

Each request includes an Authorization header with the JWT token when authenticated.

---

## Authentication
- **JWT Token**: Tokens are received upon login and stored in `AuthContext` for secure API calls.
- **AuthContext**: Provides authentication status and token to components, managing user sessions.

---

## Error Handling
- **User Feedback**: Error messages for login, registration, and book actions are displayed to users.
- **API Error Handling**: Catches server errors and displays relevant messages, prompting users to retry or adjust input.

---

## Deployment
1. **Build the Project**:
   ```bash
   npm run build
   ```
2. **Deploy the Build**: Host the build folder on a static server (e.g., AWS S3, GitHub Pages, Vercel).
3. **Configure Environment Variables**: Ensure the API base URL in `.env` matches the backend server address.

---

## Security
- **JWT Authentication**: Uses Bearer tokens for API requests, preventing unauthorized access.
- **Environment Variables**: API URLs and other sensitive data are stored in `.env` to avoid exposure.
- **HTTPS**: Recommended for production deployment to ensure secure communication with the backend.
