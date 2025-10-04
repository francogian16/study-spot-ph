import React from "react";
import { Link } from "react-router-dom";

// React.memo prevents this component from re-rendering if its props haven't changed.
// This is useful on the homepage when the user is typing in the search bar.
const SpaceCard = React.memo(({ space }) => {
  console.log(`Rendering SpaceCard for: ${space.name}`); // To demonstrate memoization
  return (
    <div className="space-card">
      <img src={space.main_image} alt={space.name} />
      <div className="card-content">
        <h3>{space.name}</h3>
        <p className="location">{space.location}</p>
        <p className="price">Starts at ₱{space.price}/slot</p>
        <Link to={`/space/${space.id}`} className="view-btn">
          View Details
        </Link>
      </div>
    </div>
  );
});

export default SpaceCard;
