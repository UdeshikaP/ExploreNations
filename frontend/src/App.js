import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CountryDetails from './pages/CountryDetails';
import Favourites from './pages/favourite';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {<Route path="/signup" element={<Signup />} />}
        <Route path="/country/:countryCode" element={<CountryDetails />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </Router>
  );
}

export default App;
