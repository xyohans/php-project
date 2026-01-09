import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.jpg" alt="Logo" className="h-8 w-8" />
        <span className="text-xl font-bold text-blue-600">
          Healthcare Insurance
        </span>
      </Link>

      {/* Navigation */}
      <ul className=" md:flex items-center gap-8 font-medium text-gray-700">
        <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
        <li><Link to="/services" className="hover:text-blue-600">Services</Link></li>
        <li><Link to="/about" className="hover:text-blue-600">About Us</Link></li>
        <li><Link to="/contact" className="hover:text-blue-600">Contact Us</Link></li>
        <li><Link to="/account" className="hover:text-blue-600">Account</Link></li>
      </ul>

      {/* Actions */}
      <div className="flex gap-3">
        <Link
          to="/login"
          className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
