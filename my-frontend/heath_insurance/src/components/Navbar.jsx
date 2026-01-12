import { Link } from "react-router-dom";
import './navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      
      {/* Logo */}
      <Link to="/" className="title">
        <img src="/logo.jpg" alt="Logo" />
        <span >
          Healthcare Insurance
        </span>
      </Link>

      {/* Navigation */}
      <ul >
        <li><Link to="/" >Home</Link></li>
        <li><Link to="/services" >Services</Link></li>
        <li><Link to="/about" >About Us</Link></li>
        <li><Link to="/contact" >Contact Us</Link></li>
        <li><Link to="/account" >Account</Link></li>
      </ul>

      {/* Actions */}
      <div className="">
        <Link
          to="/login"
          className=""
        >
          Login
        </Link>

        <Link
          to="/register"
          className=""
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
