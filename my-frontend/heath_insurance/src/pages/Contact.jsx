const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-10">
          Contact Us
        </h1>

        <div className="bg-white p-8 rounded-lg shadow">
          <p className="text-gray-600 mb-4">
            If you have any questions or need assistance, feel free to contact us.
          </p>

          <div className="space-y-3 text-gray-700">
            <p>📞 Phone: +251 911 234 567</p>
            <p>📧 Email: support@healthcareinsurance.com</p>
            <p>📍 Address: Debre Markos, Ethiopia</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
