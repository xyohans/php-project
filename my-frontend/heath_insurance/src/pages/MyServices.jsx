import { useEffect, useState } from "react";

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
      if (result.status === "success") fetchMyServices(); // refresh list
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
    <div className="min-h-screen px-6 py-20">
      <h1 className="text-4xl font-bold text-center mb-14">My Services</h1>
      {services.length === 0 ? (
        <p className="text-center text-gray-500">You have not purchased any services yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map(s => (
            <div key={s.payment_id} className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold">{s.service_name}</h3>
              <p className="text-gray-600">{s.description}</p>
              <p className="font-semibold text-blue-600">Amount: ${s.amount}</p>
              <p className="font-medium">Payment Method: {s.payment_method}</p>
              <p className="text-sm">
                Status: {s.payment_status}{s.payment_status === "cancelled" ? ` (Cancelled at ${s.canceled_at})` : ""}
              </p>

              {s.payment_status !== "cancelled" && (
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleCancel(s.payment_id)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Cancel Service
                  </button>
                  <button
                    onClick={() => handleUpdatePayment(s.payment_id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
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
