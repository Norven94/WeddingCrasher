import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./styled/Button";
import { StyledNavbar } from "./styled/StyledNavbar";
import { useAuthContext } from '../contexts/AuthContext' 
import { logoutUser } from '../api/routes/users'

const Navbar = () => {
  const { currentUser } = useAuthContext()

  return (
    <StyledNavbar>
      <Link className="ml-3 navbar-logo" to="/">
        <span>Wedding Crasher</span>
      </Link>
      {currentUser ? (
        <Button className="mr-3" onClick={logoutUser}>Logout</Button>
      ): (
        <Link to="/login">
          <Button className="mr-3">Login</Button>
        </Link>
      )}
      
    </StyledNavbar>
  );
};

export default Navbar;
