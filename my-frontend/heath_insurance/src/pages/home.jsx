import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full">

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <img src="/logo.png" alt="Logo" className="mx-auto h-20 mb-6 bg-white p-3 rounded-xl" />

          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Smart Healthcare Insurance <br /> You Can Trust
          </h1>

          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
            Affordable, reliable, and secure healthcare insurance services
            designed to protect you and your family.
          </p>

          <Link
            to="/register"
            className="inline-block bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold"
          >
            Get Started Today
          </Link>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-14">
            Our Core Services
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              ["Health Coverage", "Full medical support including emergency and hospital care."],
              ["Easy Registration", "Simple, fast, and secure online registration system."],
              ["Client Dashboard", "Manage your insurance profile in one place."]
            ].map(([title, desc]) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-blue-600"
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
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              ["Who can register?", "Anyone who meets eligibility requirements can register."],
              ["Is my data secure?", "Yes, we use secure systems to protect your information."],
              ["How do I start?", "Click the Get Started button and complete the form."]
            ].map(([q, a]) => (
              <div
                key={q}
                className="p-6 rounded-xl border border-gray-200 shadow-sm"
              >
                <h4 className="font-semibold text-blue-700 mb-2">
                  {q}
                </h4>
                <p className="text-gray-600">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
