import React, { useState, useEffect } from "react";
import SpaceCard from "../components/SpaceCard";

function HomePage() {
  const [spaces, setSpaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the public folder
    fetch("/data/spaces.json")
      .then((res) => res.json())
      .then((data) => {
        setSpaces(data);
        setLoading(false);
      });
  }, []);

  const filteredSpaces = spaces.filter(
    (space) =>
      space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      space.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-content">
      <div className="hero-section">
        <h1>Find Your Perfect Study Spot V2</h1>
        <p>
          Discover and book co-working spaces and study hubs across the
          Philippines.
        </p>
        <input
          type="text"
          placeholder="Search by name or location (e.g., 'Nook' or 'Makati')..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h2>Available Spaces</h2>
      {loading ? (
        <p>Loading spaces...</p>
      ) : (
        <div className="space-grid">
          {filteredSpaces.length > 0 ? (
            filteredSpaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))
          ) : (
            <p>No spaces found matching your search.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;
