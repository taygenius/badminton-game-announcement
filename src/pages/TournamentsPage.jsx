import React from 'react';
import { Link } from 'react-router-dom';

const TournamentsPage = () => {
  return (
    <div className="tournaments-page">
      <div className="page-header">
        <h1>Tournaments</h1>
        <p>This is a placeholder page for the Tournaments section.</p>
        <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default TournamentsPage;
