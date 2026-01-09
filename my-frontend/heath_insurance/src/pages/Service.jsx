const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-14">
          Our Services
        </h1>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            ["Health Insurance Coverage", "Complete healthcare coverage for individuals and families."],
            ["Online Registration", "Secure and easy online insurance enrollment."],
            ["Client Dashboard", "Centralized access to all insurance services."]
          ].map(([title, desc]) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-600"
            >
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                {title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
