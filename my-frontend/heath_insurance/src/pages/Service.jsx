import { useEffect, useState } from "react";
import '../style/service.css'
const Services = () => {
  const [services, setServices] = useState([]);

const checkAuth = async () => {
  const res = await fetch(
    "http://localhost/project/backend/auth.php",
    {
      credentials: "include"
    }
  );
  return await res.json();
};


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost/project/backend/get_service.php"
      );

      const result = await response.json();

      if (result.status === "success") {
        setServices(result.data); 
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  fetchData();
}, []);


const handlePayment = async (service) => {
  try {
  
    const auth = await checkAuth();

    if (!auth.loggedIn) {
      alert("Please login to continue");
      return;
    }

    if (!service.id) {
      alert("Invalid service");
      return;
    }

    
    const response = await fetch(
      "http://localhost/project/backend/create_payment.php",
      {
        method: "POST",
        credentials: "include", // 🔥 REQUIRED
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: service.id,
          payment_method: "card"
        })
      }
    );

    const result = await response.json();
    alert(result.message);

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};




  return (
   <div className="service-page">
  <h1 className="service-title">Our Services</h1>

  <div className="service-grid">
    {services.map(service => (
      <div key={service.id} className="service-card">
        <h3 className="service-card-title">{service.service_name}</h3>
        <p className="service-card-desc">{service.description}</p>
        <p className="service-card-price">${service.price}</p>

        <button
          onClick={() => handlePayment(service)}
          className="service-card-button"
        >
          Get Service
        </button>
      </div>
    ))}
  </div>
</div>

  );
};

export default Services;
