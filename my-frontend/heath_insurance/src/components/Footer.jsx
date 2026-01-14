import { Link } from "react-router-dom";
import './foote.css'

const Footer = () => {
  return (
    <footer className="">
      <div className="continer">

        <div className="title-footer">
          <h2 className="">
            Healthcare Insurance
          </h2>
          <p className="">
            Building a healthier future through affordable and reliable insurance services.
          </p>
        </div>

        <div>
          <h3 className="">Quick Links</h3>
          <ul >
            <li><Link to="/" className="links">Home</Link></li>
            <li><Link to="/services" className="links">Services</Link></li>
            <li><Link to="/about" className="links">About Us</Link></li>
            <li><Link to="/contact" className="links">Contact</Link></li>
            <li><Link to="/login" className="links">Login</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="">Contact</h3>
          <p className="">📞 +251 911 234 567</p>
          <p className="">📧 info@healthcareinsurance.com</p>
          <p className="">📍 Debre Markos, Ethiopia</p>
        </div>
      </div>

      <div className="copy-right">
        &copy; {new Date().getFullYear()} Healthcare Insurance. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
