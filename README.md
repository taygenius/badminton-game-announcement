# Badminton Game Announcement Application

A comprehensive web application for managing badminton tournaments, matches, player information, and court announcements.

## Features

- **Tournament Management**: Create and manage tournaments with various formats (elimination, round-robin, etc.)
- **Player Management**: Register players, create profiles, and organize participants by category
- **Match Scheduling**: Create, edit, and manage match schedules with drag-and-drop functionality
- **Score Tracking**: Real-time score updates with manual input
- **Court Management**: Assign and track court usage and availability
- **Announcements**: Automated voice announcements for match calls, score updates, and results
- **Display Integration**: Connect to external displays for audience viewing

## Demo

The application is deployed and available at: [https://taygenius.github.io/badminton-game-announcement](https://taygenius.github.io/badminton-game-announcement)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/taygenius/badminton-game-announcement.git
   cd badminton-game-announcement
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

To build the application for production, run:

```bash
npm run build
# or
yarn build
```

The build files will be created in the `build` directory.

## Demo Credentials

For demonstration purposes, you can log in with any email and password. The application is currently using mock data and does not connect to a real backend API.

## Technologies Used

- React.js
- React Router
- CSS
- GitHub Pages (for deployment)

## Project Structure

```
badminton-app/
├── public/               # Public assets
├── src/                  # Source code
│   ├── assets/           # Assets (images, styles)
│   ├── components/       # React components
│   ├── contexts/         # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main App component
│   └── index.js          # Application entry point
└── package.json          # Project dependencies and scripts
```

## Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment workflow is defined in `.github/workflows/deploy-pages.yml`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Documentation based on the requirements provided in the paste.txt file
- Icons and visuals created for this project
