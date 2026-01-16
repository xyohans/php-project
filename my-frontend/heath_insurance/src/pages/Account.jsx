import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../style/acc.css'

function Account() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    id_number: "",
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
          console.log(result.message);
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
          id_number: "",
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
  <div className="acc-b">
  <div className="account-container">
  <h2 className="account-title">My Account</h2>

  <form className="account-form">
    <div>
      <label>First Name</label>
      <input name="first_name" value={formData.first_name} onChange={handleChange} className="account-input" />
    </div>

    <div>
      <label>Last Name</label>
      <input name="last_name" value={formData.last_name} onChange={handleChange} className="account-input" />
    </div>

    <div>
      <label>ID Number</label>
      <input name="id_number" value={formData.id_number} disabled onChange={handleChange} className="account-input account-disabled" />
    </div>

    <div>
      <label>Phone</label>
      <input name="phone" value={formData.phone} onChange={handleChange} className="account-input" />
    </div>

    <div>
      <label>Date of Birth</label>
      <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="account-input" />
    </div>

    <div>
      <label>Gender</label>
      <input name="gender" value={formData.gender} onChange={handleChange} className="account-input" />
    </div>

    <div>
      <label>Address</label>
      <input name="address" value={formData.address} onChange={handleChange} className="account-input" />
    </div>

    <div>
      <label>City</label>
      <input name="city" value={formData.city} onChange={handleChange} className="account-input" />
    </div>

    <div>
      <label>Region</label>
      <input name="region" value={formData.region} onChange={handleChange} className="account-input" />
    </div>

    <div>
      <label>Email</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} className="account-input account-disabled" disabled />
    </div>

    <div>
      <label>Registration Date</label>
      <input value={formData.created_at} disabled onChange={handleChange} className="account-input account-disabled" />
    </div>

    <div>
      <label>Password</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange}  className="account-input" />
    </div>

    <div className="account-button-group">
      <button type="submit" onClick={handleSubmit} className="account-btn update-btn">Update Account</button>
      <button type="button" onClick={handleDelete} className="account-btn delete-btn">Delete Account</button>
      <button
        type="button"
        onClick={() => {
          fetch("http://localhost/project/backend/logout.php", { credentials: "include" });
          navigate("/login", { replace: true });
        }}
        className="account-btn logout-btn"
      >
        Logout
      </button>
    </div>
  </form>
</div>
</div>
  );
}

export default Account;
