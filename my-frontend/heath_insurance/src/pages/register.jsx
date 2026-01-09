import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    fetch("http://localhost/project/backend/add.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Client Registration
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="w-full border px-3 py-2 rounded-md" />
          <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="w-full border px-3 py-2 rounded-md" />
          <input name="idNumber" value={formData.idNumber} onChange={handleChange} placeholder="ID Number" className="w-full border px-3 py-2 rounded-md" />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full border px-3 py-2 rounded-md" />
          <input name="dob" value={formData.dob} type="text" onChange={handleChange} className="w-full border px-3 py-2 rounded-md" />
          <input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" className="w-full border px-3 py-2 rounded-md" />
          <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full border px-3 py-2 rounded-md" />
          <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full border px-3 py-2 rounded-md" />
          <input name="region" value={formData.region} onChange={handleChange} placeholder="Region" className="w-full border px-3 py-2 rounded-md" />
          <input name="email" value={formData.email} type="email" onChange={handleChange} placeholder="Email" className="w-full border px-3 py-2 rounded-md" />
          <input name="password" value={formData.password} type="password" onChange={handleChange} placeholder="Password" className="w-full border px-3 py-2 rounded-md" />
          <input name="confirmPassword" value={formData.confirmPassword} type="password" onChange={handleChange} placeholder="Confirm Password" className="w-full border px-3 py-2 rounded-md" />

          <button type ="submit"className="w-full bg-blue-600 text-white py-2 rounded-md">
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
