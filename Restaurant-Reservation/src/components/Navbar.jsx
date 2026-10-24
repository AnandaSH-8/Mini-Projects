import { Link, NavLink } from "react-router-dom";
import { Utensils } from "lucide-react";

function Navbar() {
  return (
    <>
      <div className="announcement-bar">
        Stay updated with the latest restaurants and make dining an amazing
        experience with our platform.
      </div>

      <header className="site-header">
        <nav className="navbar">
          <Link to="/" className="brand">
            <Utensils size={25} strokeWidth={2.5} />
            <span>Restaurant</span>
            <small>Food & Drinks</small>
          </Link>

          <div className="nav-links">
            <NavLink to="/">Find Restaurants</NavLink>
            <a href="/#locations">Locations</a>
            <a href="/#reservations">Reservations</a>
            <a href="/#special-menus">Special Menus</a>
            <a href="/#services">Services</a>
            <NavLink to="/my-bookings" className="nav-bookings">
              My Bookings
            </NavLink>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
