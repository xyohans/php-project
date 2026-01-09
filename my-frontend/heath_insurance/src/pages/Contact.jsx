const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-12">
          Contact Us
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-10 space-y-6">
          <p className="text-gray-600 text-lg text-center">
            We’re here to help. Reach out to us anytime.
          </p>

          <div className="space-y-4 text-gray-700 text-lg">
            <p>📞 <span className="font-medium">+251 911 234 567</span></p>
            <p>📧 <span className="font-medium">support@healthcareinsurance.com</span></p>
            <p>📍 <span className="font-medium">Debre Markos, Ethiopia</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
