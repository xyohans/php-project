
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import '../style/register.css'

const Register = () => {

  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    region: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const validate = () => {
    let newErrors = {};

    // Empty checks
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    // Email validation
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    // Phone validation (digits only, 10–15 chars)
    if (formData.phone && !/^[0-9]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    // Password rules
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await fetch("http://localhost/project/backend/add.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json(); 
    if(data.status == "success")  {
      alert(data.message); 
      navigate("/login");
    }
    else{
      alert(data.message);
    }     

  } catch (error) {
    alert("Server error. Please try again.");
  }
};


  return (
   <div className="register-b">
  <div className="register-container">
    <h2 className="register-title">Client Registration</h2>

    <form className="register-form" onSubmit={handleSubmit}>
      <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="register-input" />
      <span>{errors.firstName}</span>
      <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="register-input" />
      <span>{errors.lastName}</span>
      <input name="idNumber" value={formData.idNumber} onChange={handleChange} placeholder="ID Number" className="register-input" />
      <span>{errors.idNumber}</span>
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="register-input" />
      <span>{errors.phone}</span>
      <input name="dob" value={formData.dob} type="date" placeholder="Date of Birth" onChange={handleChange} className="register-input" />
      <span>{errors.dob}</span>
      <input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" className="register-input" />
      <span>{errors.gender}</span>
      <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="register-input" />
      <span>{errors.firstName}</span>
      <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="register-input" />
      <span>{errors.city}</span>
      <input name="region" value={formData.region} onChange={handleChange} placeholder="Region" className="register-input" />
      <span>{errors.region}</span>
      <input name="email" value={formData.email} type="email" onChange={handleChange} placeholder="Email" className="register-input" />
      <span>{errors.email}</span>
      <input name="password" value={formData.password} type="password" onChange={handleChange} placeholder="Password" className="register-input" />
      <span>{errors.password}</span>
      <input name="confirmPassword" value={formData.confirmPassword} type="password" onChange={handleChange} placeholder="Confirm Password" className="register-input" />
      <span>{errors.confirmPassword}</span>

      <div className="register-btn-group">
        <button type="submit" className="register-btn">Register</button>
      </div>
    </form>

    <p className="register-login-text">
      Already have an account? <Link to="/login" className="register-login-link">Login</Link>
    </p>
  </div>
</div>

  );
};

export default Register;
