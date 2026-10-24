import { Link } from "react-router-dom";
import { Utensils } from "lucide-react";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <Link to="/" className="brand footer-brand">
          <Utensils size={25} />
          <span>Restaurant</span>
          <small>Food & Drinks</small>
        </Link>

        <div className="footer-links">
          <Link to="/">About Our Restaurant</Link>
          <Link to="/">Reservations</Link>
          <Link to="/search">Find Restaurants</Link>
          <Link to="/my-bookings">My Bookings</Link>
          <Link to="/">Contact Us</Link>
          <Link to="/">Services</Link>
        </div>
      </div>

      <p className="footer-copyright">
        Copyright © 2026 Restaurant Food & Drinks. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
