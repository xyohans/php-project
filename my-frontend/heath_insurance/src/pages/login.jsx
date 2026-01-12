import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect} from "react";

const Login = () => {
  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
useEffect(() => {
  const loadCookies = async () => {
    const res = await fetch(
      "http://localhost/project/backend/cookie.php",
      { credentials: "include" }
    );
    const data = await res.json();

    if (data.email && data.password) {
      setFormData({
        email: data.email,
        password: data.password
      });
    }
  };

  loadCookies();
}, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const response = await fetch("http://localhost/project/backend/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.status === "success") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("email", data.email);
        alert(data.message); 
        navigate("/account"); 
      } else {
        alert(data.message); 
      }
      alert(data.message);

    } catch (error) {
      alert("Server error. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Client Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input 
              onChange={handleChange}
              name="email"
              value={formData.email}
              type="email"
              placeholder="example@email.com"
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              onChange={handleChange}
              name="password"
              value={formData.password}
              type="password"
              placeholder="********"
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
