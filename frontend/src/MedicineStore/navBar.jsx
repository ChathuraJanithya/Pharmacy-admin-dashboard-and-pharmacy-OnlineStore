import React from "react";
import { ShoppingCart } from "phosphor-react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <div>
      <nav className="p-3 navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/DentalHome">
          Home
        </a>
        <a className="navbar-brand" href="/appointent">
          Channels
        </a>
        <a className="navbar-brand" href="/medicineStore">
          Medicine Store
        </a>

        <Link to="/medicineStore/checkout">
          <ShoppingCart size={32} color="white" />
        </Link>
        <div className="user-profile-carticon">
          <Link to={"/userProfile"}>
            <FontAwesomeIcon
              icon={faUser}
              size="2x"
              style={{ color: "#ffff" }}
            />
          </Link>
        </div>
      </nav>
      <div></div>
    </div>
  );
};

export default Navbar;
