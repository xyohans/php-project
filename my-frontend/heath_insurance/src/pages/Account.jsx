import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    idNumber: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    region: "",
    email: "",
    created_at: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
  const checkLogin = async () => {
    const res = await fetch(
      "http://localhost/project/backend/auth.php",
      { credentials: "include" }
    );

    const data = await res.json();

    if (!data.loggedIn) {
      navigate("/login");
    } else {
      setFormData(prev => ({ ...prev, email: data.email }));
    }
  };

  checkLogin();
}, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        
        if (!formData.email) return;
        const response = await fetch("http://localhost/project/backend/getAccount.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: formData.email }) }); 
        const result = await response.json();
        if(result.status =="success"){
          alert(result.message);
          setFormData(prev => ({
          ...prev,
          ...result.data
        }));
      }
        else {
          alert(result.message)
        }
        
      } catch (error) {
        alert("somthing went wrong");
        
      }
    };

    fetchData();
  }, [formData.email]);

  
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
      const response = await fetch("http://localhost/project/backend/update.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.status === "success") {
        alert(data.message);  
      } else {
        alert(data.message); 
      }
     

    } catch (error) {
      alert("Server error. Please try again.");
      console.error(error);
    }
  };


  
  const handleDelete = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const response = await fetch("http://localhost/project/backend/delete.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.status === "success") {
        setFormData({
          first_name: "",
          last_name: "",
          idNumber: "",
          phone: "",
          dob: "",
          gender: "",
          address: "",
          city: "",
          region: "",
          email: "",
          created_at: "",
          password: "",
          confirmPassword: ""
        })
        navigate("/login", { replace: true });
        alert(data.message); 
        
      } else {
        alert(data.message); 
      }
      

    } catch (error) {
      alert("Server error. Please try again.");
      console.error(error);
    }
  };


  return (
    <div className="max-w-4xl mx-auto my-12 bg-white p-8 shadow rounded-md">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        My Account
      </h2>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label>First Name</label>
          <input name="first_name" value={formData.first_name} onChange={handleChange}
            className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label>Last Name</label>
          <input name="last_name" value={formData.last_name} onChange={handleChange}
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
          <input value={formData.created_at} disabled
            className="w-full border px-3 py-2 rounded bg-gray-100" />
        </div>

        <div>
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange}
            className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" onChange={handleChange}
            className="w-full border px-3 py-2 rounded" />
        </div>

        <div className="md:col-span-2 flex flex-col md:flex-row gap-4 mt-4">
          <button type="submit"
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Update Account
          </button>

          <button type="button" onClick={handleDelete}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
            Delete Account
          </button>
          <button
            onClick={() => {
              fetch("http://localhost/project/backend/logout.php", {
                credentials: "include"
              });
              navigate("/login", { replace: true });
            }}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </form>
    </div>
  );
}

export default Account;
