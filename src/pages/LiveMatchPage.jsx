import React from 'react';
import { Link, useParams } from 'react-router-dom';

const LiveMatchPage = () => {
  const { id } = useParams();
  
  return (
    <div className="live-match-page">
      <div className="page-header">
        <h1>Live Match</h1>
        <p>This is a placeholder page for live match with ID: {id}</p>
        <Link to="/matches" className="btn btn-primary">Back to Matches</Link>
      </div>
    </div>
  );
};

export default LiveMatchPage;
