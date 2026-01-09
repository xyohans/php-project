import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-blue-700 text-white">
      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">

        <div>
          <h2 className="text-2xl font-bold mb-4">
            Healthcare Insurance
          </h2>
          <p className="text-blue-100 leading-relaxed">
            Building a healthier future through affordable and reliable insurance services.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-blue-100">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <p className="text-blue-100">📞 +251 911 234 567</p>
          <p className="text-blue-100">📧 info@healthcareinsurance.com</p>
          <p className="text-blue-100">📍 Debre Markos, Ethiopia</p>
        </div>
      </div>

      <div className="border-t border-blue-600 text-center py-4 text-blue-100">
        © {new Date().getFullYear()} Healthcare Insurance. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
