import React from 'react';
import { Link, useParams } from 'react-router-dom';

const TournamentDetailPage = () => {
  const { id } = useParams();
  
  return (
    <div className="tournament-detail-page">
      <div className="page-header">
        <h1>Tournament Details</h1>
        <p>This is a placeholder page for tournament with ID: {id}</p>
        <Link to="/tournaments" className="btn btn-primary">Back to Tournaments</Link>
      </div>
    </div>
  );
};

export default TournamentDetailPage;
