import React from 'react';
import { Link } from 'react-router-dom';

const PlayersPage = () => {
  return (
    <div className="players-page">
      <div className="page-header">
        <h1>Players</h1>
        <p>This is a placeholder page for the Players section.</p>
        <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default PlayersPage;
