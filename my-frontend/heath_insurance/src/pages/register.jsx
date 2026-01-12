import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import './register.css'

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

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
    <div className="container">
      <div className="content">
        <div className="sty">
        <h2 >
          Client Registration
        </h2>

        <form  onSubmit={handleSubmit}>
          <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name"  /><br/>
          <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name"  /><br/>
          <input name="idNumber" value={formData.idNumber} onChange={handleChange} placeholder="ID Number"  /><br/>
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone"  /><br/>
          <input name="dob" value={formData.dob} type="date" placeholder="date of birth " onChange={handleChange}  /><br/>
          <input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" /><br/>
          <input name="address" value={formData.address} onChange={handleChange} placeholder="Address"  /><br/>
          <input name="city" value={formData.city} onChange={handleChange} placeholder="City"  /><br/>
          <input name="region" value={formData.region} onChange={handleChange} placeholder="Region"  /><br/>
          <input name="email" value={formData.email} type="email" onChange={handleChange} placeholder="Email"  /><br/>
          <input name="password" value={formData.password} type="password" onChange={handleChange} placeholder="Password"  /><br/>
          <input name="confirmPassword" value={formData.confirmPassword} type="password" onChange={handleChange} placeholder="Confirm Password"  /><br/>
          <div className="btn">
            <button type ="submit">
              Register
            </button>
          </div>
        </form>

        <p >
          Already have an account?{" "}
          <Link to="/login" >
            Login
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
