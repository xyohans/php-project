import { useEffect, useState } from "react";
import '../style/mys.css'
const MyServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in and fetch their services
  const fetchMyServices = async () => {
    try {
      const authRes = await fetch("http://localhost/project/backend/auth.php", {
        credentials: "include",
      });
      const auth = await authRes.json();

      if (!auth.loggedIn) {
        alert("Please login first");
        setLoading(false);
        return;
      }

      const res = await fetch(
        "http://localhost/project/backend/my_service.php",
        {
          method: "POST",
          credentials: "include",
        }
      );

      const result = await res.json();

      if (result.status === "success") {
        setServices(result.data);
      } else {
        alert(result.message);
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMyServices();
  }, []);

  // Cancel a purchased service
// Cancel a purchased service
const handleCancel = async (payment_id) => {
  // if (!window.confirm("Are you sure you want to cancel this service?")) return;

  try {
    const res = await fetch(
      "http://localhost/project/backend/cancel_service.php",
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payment_id }),
      }
    );
    const result = await res.json();
    alert(result.message);

    if (result.status === "success") {
      // Remove the cancelled service from the state
      setServices(prevServices =>
        prevServices.filter(service => service.payment_id !== payment_id)
      );
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};


  // Update payment method
  const handleUpdatePayment = async (payment_id) => {
    const newMethod = prompt("Enter new payment method (e.g., card, paypal):");
    if (!newMethod) return;

    try {
      const res = await fetch(
        "http://localhost/project/backend/update_payment_method.php",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payment_id, payment_method: newMethod }),
        }
      );
      const result = await res.json();
      alert(result.message);
      if (result.status === "success") fetchMyServices(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="myservices-page">
  <h1 className="myservices-title">My Services</h1>

  {services.length === 0 ? (
    <p className="myservices-empty">You have not purchased any services yet.</p>
  ) : (
    <div className="myservices-grid">
      {services.map(s => (
        <div key={s.payment_id} className="myservices-card">
          <h3 className="myservices-card-title">{s.service_name}</h3>
          <p className="myservices-card-desc">{s.description}</p>
          <p className="myservices-card-amount">Amount: ${s.amount}</p>
          <p className="myservices-card-method">Payment Method: {s.payment_method}</p>
          <p className="myservices-card-status">
            Status: {s.payment_status}
            {s.payment_status === "cancelled" ? ` (Cancelled at ${s.canceled_at})` : ""}
          </p>

          {s.payment_status !== "cancelled" && (
            <div className="myservices-card-actions">
              <button
                onClick={() => handleCancel(s.payment_id)}
                className="myservices-button-cancel"
              >
                Cancel Service
              </button>
              <button
                onClick={() => handleUpdatePayment(s.payment_id)}
                className="myservices-button-update"
              >
                Update Payment
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default MyServices;
