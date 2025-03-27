import React from 'react';
import { Link } from 'react-router-dom';

const MatchesPage = () => {
  return (
    <div className="matches-page">
      <div className="page-header">
        <h1>Matches</h1>
        <p>This is a placeholder page for the Matches section.</p>
        <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default MatchesPage;
