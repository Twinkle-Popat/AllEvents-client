// Import statements
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useractions } from '../store/index.js';

// Navbar component
const Navbar = () => {
  const dispatch = useDispatch();
  const isloggedin = useSelector((state) => state.user.isloggedin);

  const handleLogOut = () => {
    dispatch(useractions.logout());
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#D4D4D4" }}>
      <div className="container-fluid">
        <Link to='/' style={{ marginLeft: "9px" }} className="navbar-brand" href="#">
          <img style={{ width: "118px" }} src="https://cdn2.allevents.in/media-kit/png/ae-logo-vector.png" alt="" />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {/* Add other menu items if needed */}
          </ul>

          <div>
            {isloggedin ? (
              <>
                <Link onClick={handleLogOut} to="/" className="navbar-brand mx-3">
                  Logout
                </Link>
                <Link to='/user' className="navbar-brand mx-3">
                  <img style={{ width: "48px", borderRadius: "50%" }} src="https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png" alt="" />
                </Link>
              </>
            ) : (
              <Link to="/auth" className="navbar-brand mx-3">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
