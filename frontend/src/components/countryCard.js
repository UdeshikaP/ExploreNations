import React from 'react';
import './countryCard.css';
import { GoHeart, GoHeartFill } from "react-icons/go";
import 'react-toastify/dist/ReactToastify.css';

const CountryCard = ({ country, onClick, isFavourite, onUpdateFavourites }) => {
  const handleHeartClick = (e) => {
    e.stopPropagation(); // prevent navigation

    const isLoggedIn = !!localStorage.getItem('token');
    if (!isLoggedIn) {
      alert("Login required\nPlease log in to add favourite countries!");
      return;
    }

    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    if (isFavourite) {
      // Remove from favourites
      favourites = favourites.filter(c => c.cca3 !== country.cca3);

    } else {
      // Add to favourites
      favourites.push(country);
    }

    localStorage.setItem('favourites', JSON.stringify(favourites));
    onUpdateFavourites && onUpdateFavourites(); // Notify parent to refresh
  };

  return (

    <div className="card" onClick={onClick}>
       <div className="heart-icon" onClick={handleHeartClick}>

        {isFavourite ? (
          <GoHeartFill color="#133b96" size={22} />
        ) : (
          <GoHeart color="#133b96" size={22} />
        )}
      </div>

      <img src={country.flags.png} alt={country.name.common} />
      <h3>{country.name.common}</h3>
      <p><strong>Capital:</strong> {country.capital?.[0]}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p>
        <strong>Languages:</strong>{" "}
        {country.languages
          ? Object.values(country.languages).join(', ')
          : 'N/A'}
      </p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>

    </div>
  );
};

export default CountryCard;
