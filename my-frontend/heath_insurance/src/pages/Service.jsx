import { useEffect, useState } from "react";

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
        setServices(result.data); // ✅ correct
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
    // 1️⃣ check login
    const auth = await checkAuth();

    if (!auth.loggedIn) {
      alert("Please login to continue");
      return;
    }

    // 2️⃣ validate service
    if (!service.id) {
      alert("Invalid service");
      return;
    }

    // 3️⃣ proceed to payment
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
    <div className="min-h-screen px-6 py-20">
      <h1 className="text-4xl font-bold text-center mb-14">Our Services</h1>

      <div className="grid md:grid-cols-3 gap-10">
        {services.map(service => (
          <div key={service.id} className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-bold">{service.service_name}</h3>
            <p className="text-gray-600 my-3">{service.description}</p>
            <p className="font-semibold text-blue-600">
              ${service.price}
            </p>

            <button
              onClick={() => handlePayment(service)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
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
