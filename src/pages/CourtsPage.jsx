import React from 'react';
import { Link } from 'react-router-dom';

const CourtsPage = () => {
  return (
    <div className="courts-page">
      <div className="page-header">
        <h1>Courts</h1>
        <p>This is a placeholder page for the Courts section.</p>
        <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default CourtsPage;
