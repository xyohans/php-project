import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect} from "react";
import "../style/login.css";

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
        navigate("/services"); 
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
   <div className="login-page">
  <div className="login-card">

    <h2 className="login-title">
      Client Login
    </h2>

    <form onSubmit={handleSubmit} className="login-form">

      <div className="login-field">
        <label className="login-label">Email</label>
        <input 
          onChange={handleChange}
          name="email"
          value={formData.email}
          type="email"
          placeholder="example@email.com"
          className="login-input"
        />
      </div>

      <div className="login-field">
        <label className="login-label">Password</label>
        <input
          onChange={handleChange}
          name="password"
          value={formData.password}
          type="password"
          placeholder="********"
          className="login-input"
        />
      </div>

      <button
        type="submit"
        className="login-button"
      >
        Login
      </button>

    </form>

    <p className="login-footer-text">
      Don't have an account?{" "}
      <Link to="/register" className="login-link">
        Register
      </Link>
    </p>

  </div>
</div>
  );
};

export default Login;
