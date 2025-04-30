// pages/CountryDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllCountries } from '../services/api';
import './CountryDetails.css'; 
import 'react-toastify/dist/ReactToastify.css';


const CountryDetails = () => {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const navigate = useNavigate();
 
  useEffect(() => {
    getAllCountries().then(res => {
      const selected = res.data.find(c => c.cca3 === countryCode);
      setCountry(selected);
       
    });
  }, [countryCode]);
  
  if (!country) return <p className="loading-text">Loading...</p>;

  return (
    <div className="country-details-container">
      <button className="back-btn" onClick={() => navigate('/')}>
        Back To Home
      </button>
       

      <div className="details-grid">
        <h1>{country.name.common}</h1>
        <img
          src={country.flags?.svg || country.flags?.png}
          alt={`${country.name.common} flag`}
          className="country-flag"
        />

        <div className="country-info">

          <div className="info-columns">
            <div>
              <p><strong>Native Name:</strong> {Object.values(country.name.nativeName || {})[0]?.common || country.name.common}</p>
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Sub Region:</strong> {country.subregion}</p>
              <p><strong>Capital:</strong> {country.capital?.join(', ')}</p>
            </div>
            <div>
              <p><strong>Top Level Domain:</strong> {country.tld?.join(', ')}</p>
              <p><strong>Currencies:</strong> {country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</p>
              <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
            </div>
          </div>

          {country.borders && (
            <div className="border-countries">
              <strong>Border Countries:</strong>
              <div className="borders-list">
                {country.borders.map((border, idx) => (
                  <span className="border-pill" key={idx}>{border}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
