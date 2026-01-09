import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">

        {/* Title / Description */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Healthcare Insurance</h2>
          <p className="text-blue-100">
            Providing affordable and reliable healthcare insurance services
            to ensure a healthier and more secure future for everyone.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-blue-100">
            <li>
              <Link to="/" className="hover:text-white">Home</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white">Services</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">Contact Us</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white">Login</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <p className="text-blue-100 mb-2">
            📞 Phone: +251 911 234 567
          </p>
          <p className="text-blue-100 mb-2">
            📧 Email: info@healthcareinsurance.com
          </p>
          <p className="text-blue-100">
            📍 Address: Debre Markos, Ethiopia
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-600 text-center py-4 text-blue-100">
        © {new Date().getFullYear()} Healthcare Insurance. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
