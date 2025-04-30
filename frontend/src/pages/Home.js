import React, { useEffect, useState } from 'react';
import { getAllCountries } from '../services/api';
import CountryCard from '../components/countryCard';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import './Home.css';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedCurrency, setSelectedCurrency] = useState('All');
  const [selectedTimezone, setSelectedTimezone] = useState('All');
  const navigate = useNavigate();
const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    getAllCountries().then(res => {
      setCountries(res.data);
      setFilteredCountries(res.data);
    });
  }, []);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(favs);
  }, []);

  useEffect(() => {
    let result = countries;

    if (searchTerm) {
      result = result.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedRegion !== 'All') {
      result = result.filter(country => country.region === selectedRegion);
    }

    if (selectedLanguage !== 'All') {
      result = result.filter(country =>
        country.languages && Object.values(country.languages).includes(selectedLanguage)
      );
    }

    if (selectedCurrency !== 'All') {
      result = result.filter(country =>
        country.currencies && Object.keys(country.currencies).includes(selectedCurrency)
      );
    }

    if (selectedTimezone !== 'All') {
      result = result.filter(country =>
        country.timezones?.includes(selectedTimezone)
      );
    }

    setFilteredCountries(result);
  }, [searchTerm, selectedRegion, selectedLanguage, selectedCurrency, selectedTimezone, countries]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const handleTimezoneChange = (e) => {
    setSelectedTimezone(e.target.value);
  };

  const handleCountryClick = (country) => {
    navigate(`/country/${country.cca3}`);  
  };


  return (
    <>
    <Header/>
    <div className="home-container">
      <h1>Explore Countries</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by country name..."
          value={searchTerm}
          onChange={handleSearch}
        />

        <select value={selectedRegion} onChange={handleRegionChange}>
          <option value="All">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>

        <select value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="All">All Languages</option>
          <option value="English">English</option>
          <option value="French">French</option>
          <option value="Spanish">Spanish</option>
        </select>

        <select value={selectedCurrency} onChange={handleCurrencyChange}>
          <option value="All">All Currencies</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
        </select>

        <select value={selectedTimezone} onChange={handleTimezoneChange}>
          <option value="All">All Timezones</option>
          <option value="UTC+05:30">UTC+05:30</option>
          <option value="UTC+00:00">UTC+00:00</option>
          <option value="UTC+01:00">UTC+01:00</option>
        </select>

      </div>

      <div className="country-grid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, idx) => (
            <CountryCard key={idx} country={country} onClick={() => handleCountryClick(country)}
            isFavourite={favourites.some(fav => fav.cca3 === country.cca3)}
            onUpdateFavourites={() => {
              const favs = JSON.parse(localStorage.getItem('favourites')) || [];
              setFavourites(favs);
            }} />
          ))
        ) : (
          <p>No countries found.</p>
        )}
      </div>
    </div>
</>
  );
};

export default Home;
