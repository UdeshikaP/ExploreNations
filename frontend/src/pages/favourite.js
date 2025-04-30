// pages/Favourites.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './favourite.css';
import {  GoHeartFill } from "react-icons/go";


const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null); // Optional for hover effects

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(favs);
  }, []);

  const handleCountryClick = (code) => {
    navigate(`/country/${code}`);
  };

  const handleRemoveFavourite = (code) => {
    const updated = favourites.filter(c => c.cca3 !== code);
    localStorage.setItem('favourites', JSON.stringify(updated));
    setFavourites(updated); // Update state to refresh UI
  };

  if (favourites.length === 0) {
    return <p className="no-favourites">No favourite countries added yet.</p>;
  }

  return (
    <div className="favourites-container">
    <h1>Favourite Countries</h1>
    <div className="favourites-grid">
      {favourites.map((country, idx) => (
        <div
          key={idx}
          className="favourite-card"
          onClick={() => handleCountryClick(country.cca3)}
        >
          <div
            className="heart-icon"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              handleRemoveFavourite(country.cca3);
            }}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
          >
            <GoHeartFill color="#133b96" size={22} />
          </div>

          <img
            src={country.flags?.svg || country.flags?.png}
            alt={country.name.common}
          />
          <p>{country.name.common}</p>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Favourites;
