import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="w-full">

      {/* HERO / GET STARTED SECTION */}
      <section className="bg-blue-50 py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <img
            src="/logo.png"
            alt="Healthcare Insurance Logo"
            className="mx-auto h-16 mb-4"
          />
          <h1 className="text-4xl font-bold text-blue-700 mb-4">
            Healthcare Insurance
          </h1>
          <p className="text-gray-600 mb-6">
            Affordable and reliable healthcare insurance services designed to protect you and your family.
          </p>
          <Link
            to="/register"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* SERVICE OVERVIEW */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Services
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Health Coverage
              </h3>
              <p className="text-gray-600">
                Comprehensive medical coverage including hospital visits, treatments, and emergency care.
              </p>
            </div>

            <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Easy Registration
              </h3>
              <p className="text-gray-600">
                Simple and secure online registration process for new insurance clients.
              </p>
            </div>

            <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Client Dashboard
              </h3>
              <p className="text-gray-600">
                Access your insurance details, profile, and services from one dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-5 rounded-md shadow-sm">
              <h4 className="font-semibold text-blue-600 mb-2">
                Who can register for healthcare insurance?
              </h4>
              <p className="text-gray-600">
                Any individual who meets the eligibility criteria can register as a client.
              </p>
            </div>

            <div className="bg-white p-5 rounded-md shadow-sm">
              <h4 className="font-semibold text-blue-600 mb-2">
                Is my information secure?
              </h4>
              <p className="text-gray-600">
                Yes. We use secure authentication and database management practices to protect your data.
              </p>
            </div>

            <div className="bg-white p-5 rounded-md shadow-sm">
              <h4 className="font-semibold text-blue-600 mb-2">
                How do I get started?
              </h4>
              <p className="text-gray-600">
                Simply click the “Get Started” button and complete the registration form.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
