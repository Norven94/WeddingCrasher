import React from "react";
import { Link } from "react-router-dom";
import SuperButton from "./SuperButton";
import { useAuthContext } from '../contexts/AuthContext' 
import { logoutUser } from '../api/routes/users'

const Navbar = () => {
  const { currentUser } = useAuthContext()

  return (
    <div className="navbar">
      <Link className="ml-3 navbar-logo" to="/">
        <span className="logo">Wedding Crasher</span>
      </Link>
      {currentUser ? (
        <SuperButton className="mr-3" title="Logout" onClick={logoutUser} />
      ): (
        <Link to="/login">
          <SuperButton className="mr-3" title="Login" />
        </Link>
      )}
      
    </div>
  );
};

export default Navbar;
