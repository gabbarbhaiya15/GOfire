import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from '../UserContext';
import 'react-tippy/dist/tippy.css';
import '../Css/Footer.css';

export default function Footer() {
  const { userData } = useUser();
  const [menuChecked, setMenuChecked] = useState(false);

  const handleLinkClick = () => {
    setMenuChecked(false);
  };

  return (
    <nav className="footer">
      <input
        id="menu"
        type="checkbox"
        checked={menuChecked}
        onChange={() => setMenuChecked(!menuChecked)}
      />
      <label htmlFor="menu">Menu</label>
      <ul className="menu">
        <li>
          <Link to="/" onClick={handleLinkClick}>
            <span>Home</span>
            <i className="fas fa-address-card" aria-hidden="true">
              <img width="26" height="26" src="https://img.icons8.com/ios-filled/26/home.png" alt="home" />
            </i>
          </Link>
        </li>
        <li>
          <Link to="/Signup" onClick={handleLinkClick}>
            <span>Signup</span>
            <i className="fas fa-tasks" aria-hidden="true">
              <img src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/26/external-add-user-tanah-basah-glyph-tanah-basah-2.png" alt="external-add-user-tanah-basah-glyph-tanah-basah-2" />
            </i>
          </Link>
        </li>
        <li>
          <Link to="/login" onClick={handleLinkClick}>
            <span>Login</span>
            <i className="fas fa-users" aria-hidden="true">
              <img src="https://img.icons8.com/external-glyph-design-circle/26/external-login-photography-glyph-design-circle.png" alt="external-login-photography-glyph-design-circle" />
            </i>
          </Link>
        </li>
        <li>
          <Link to="/post" onClick={handleLinkClick}>
            <span>Post</span>
            <i className="fas fa-envelope-open-text" aria-hidden="true">
              <img src="https://img.icons8.com/ios/26/plus-2-math.png" alt="plus-2-math" />
            </i>
          </Link>
        </li>
        <li>
          <Link to="/profile" onClick={handleLinkClick}>
            <span></span>
            <i className="fas fa-envelope-open-profile" aria-hidden="true">
              <img src={userData.profilepic} alt='' id='profile-pics' />
            </i>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
