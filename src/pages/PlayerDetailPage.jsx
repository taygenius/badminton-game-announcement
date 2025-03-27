import React from 'react';
import { Link, useParams } from 'react-router-dom';

const PlayerDetailPage = () => {
  const { id } = useParams();
  
  return (
    <div className="player-detail-page">
      <div className="page-header">
        <h1>Player Details</h1>
        <p>This is a placeholder page for player with ID: {id}</p>
        <Link to="/players" className="btn btn-primary">Back to Players</Link>
      </div>
    </div>
  );
};

export default PlayerDetailPage;
