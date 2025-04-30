import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

export const getAllCountries = () => axios.get(`${BASE_URL}/all`);
export const getCountryByName = (name) => axios.get(`${BASE_URL}/name/${name}`);
export const getCountriesByRegion = (region) => axios.get(`${BASE_URL}/region/${region}`);
export const getCountryByCode = (code) => axios.get(`${BASE_URL}/alpha/${code}`);
export const getCountriesByLanguage = (language) => axios.get(`${BASE_URL}/lang/${language}`);
export const getCountriesByCurrency = (currency) => axios.get(`${BASE_URL}/currency/${currency}`);
  