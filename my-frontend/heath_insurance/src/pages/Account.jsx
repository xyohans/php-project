import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    idNumber: "ETH123456",
    phone: "+251912345678",
    dob: "1998-05-12",
    gender: "Male",
    address: "Kebele 04",
    city: "Debre Markos",
    region: "Amhara",
    email: "john@example.com",
    registrationDate: "2025-01-10",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= UPDATE ACCOUNT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.password &&
      formData.password !== formData.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    fetch("http://localhost/projectbackend/update.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Account updated successfully");
          setFormData({
            ...formData,
            password: "",
            confirmPassword: ""
          });
        } else {
          alert(data.message);
        }
      })
      .catch(() => alert("Server error"));
  };

  /* ================= DELETE ACCOUNT ================= */
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDelete) return;

    fetch("http://localhost/project/backend/delete.php", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idNumber: formData.idNumber })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Account deleted successfully");
          localStorage.clear();
          navigate("/");
        } else {
          alert(data.message);
        }
      })
      .catch(() => alert("Server error"));
  };

  return (
    <div className="max-w-4xl mx-auto my-12 bg-white p-8 shadow rounded-md">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        My Account
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label>First Name</label>
          <input name="firstName" value={formData.firstName} onChange={handleChange}
            className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label>Last Name</label>
          <input name="lastName" value={formData.lastName} onChange={handleChange}
            className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label>ID Number</label>
          <input name="idNumber" value={formData.idNumber} disabled
            className="w-full border px-3 py-2 rounded bg-gray-100" />
        </div>

        <div>
          <label>Phone</label>
          <input name="phone" value={formData.phone} onChange={handleChange}
            className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label>Date of Birth</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange}
            className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label>Gender</label>
          <input name="gender" value={formData.gender} onChange={handleChange}
            className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label>Address</label>
          <input name="address" value={formData.address} onChange={handleChange}
            className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label>City</label>
          <input name="city" value={formData.city} onChange={handleChange}
            className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label>Region</label>
          <input name="region" value={formData.region} onChange={handleChange}
            className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange}
            className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label>Registration Date</label>
          <input value={formData.registrationDate} disabled
            className="w-full border px-3 py-2 rounded bg-gray-100" />
        </div>

        <div>
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange}
            className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" onChange={handleChange}
            className="w-full border px-3 py-2 rounded" />
        </div>

        <div className="md:col-span-2 flex flex-col md:flex-row gap-4 mt-4">
          <button type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Update Account
          </button>

          <button type="button" onClick={handleDelete}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default Account;
