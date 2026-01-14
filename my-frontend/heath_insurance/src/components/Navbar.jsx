import { Link } from "react-router-dom";
import './navbar.css'
import logo from './logo.jpg'

function Navbar() {
  return (
    <nav className="navbar">
      
      {/* Logo */}
      <Link to="/" className="title">
        <img src={logo} alt="Logo" />
        <span >
          Healthcare Insurance
        </span>
      </Link>

      {/* Navigation */}
      <ul >
        <li><Link to="/" className="naves">Home</Link></li>
        <li><Link to="/services" className="naves">Services</Link></li>
        <li><Link to="/my_services" className="naves">MyServices</Link></li>
        <li><Link to="/about" className="naves">About Us</Link></li>
        <li><Link to="/contact"className="naves" >Contact Us</Link></li>
        <li><Link to="/account" className="naves">Account</Link></li>
      </ul>

      {/* Actions */}
      <div className="btn">
        <Link
          to="/login"
          className="login"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="register"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
