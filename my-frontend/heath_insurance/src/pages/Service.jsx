const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-10">
          Our Services
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Health Insurance Coverage
            </h3>
            <p className="text-gray-600">
              Comprehensive coverage for hospital visits, medical treatments,
              and emergency healthcare services.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Online Registration
            </h3>
            <p className="text-gray-600">
              Clients can easily register online and manage their insurance
              information securely.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Client Dashboard
            </h3>
            <p className="text-gray-600">
              Access personal details, insurance status, and service information
              from one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
