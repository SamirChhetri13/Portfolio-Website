# Portfolio Website

A full-stack portfolio website built with React (frontend) and Node.js/Express (backend).

## Project Structure

```text
Portfolio-Website/
├── backend/             # Node.js/Express backend API
│   ├── src/             # Source files (controllers, models, routes)
│   ├── .env.example     # Template for backend environment variables
│   └── package.json     # Backend dependencies and scripts
├── frontend/            # React frontend application
│   ├── src/             # Source files (components, pages, sections)
│   ├── .env.example     # Template for frontend environment variables
│   ├── index.html       # HTML entry point
│   └── package.json     # Frontend dependencies and scripts
├── .gitignore           # Git ignore settings
└── README.md            # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation & Run

#### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your configuration:
   ```bash
   cp .env.example .env
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your configuration:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
