import React from "react";
import "./Header.css";
import { Link, useNavigate } from 'react-router-dom';
import { Heart } from "lucide-react";

const Header = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav>
      <h3>ExploreNations</h3>

      {isLoggedIn ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link to="/favourites">
            <button class="f-btn with-heart">Favourites </button>
          </Link>
          <button class="logout-btn" onClick={() => {
            localStorage.removeItem('token');
            window.location.reload();
          }}>Logout</button>
        </div>
      ) : (
        <ul>

          <Link to="/login">
            <button class="login-btn">Login</button>
          </Link>
          <Link to="signup">
            <button class="signup-btn">Signup</button>

          </Link>
        </ul>

      )}

    </nav>
  );

};

export default Header;
