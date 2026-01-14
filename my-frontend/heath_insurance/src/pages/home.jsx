import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-title">

      {/* HERO */}
      <section className="">
        <div className="">
          <img src="/logo.png" alt="Logo" className="" />

          <h1 className="">
            Smart Healthcare Insurance <br /> You Can Trust
          </h1>

          <p className="">
            Affordable, reliable, and secure healthcare insurance services
            designed to protect you and your family.
          </p>

          <Link
            to="/register"
            className=""
          >
            Get Started Today
          </Link>
        </div>
      </section>

      {/* SERVICES */}
      <section className="">
        <div className="">
          <h2 className="">
            Our Core Services
          </h2>

          <div className="">
            {[
              ["Health Coverage", "Full medical support including emergency and hospital care."],
              ["Easy Registration", "Simple, fast, and secure online registration system."],
              ["Client Dashboard", "Manage your insurance profile in one place."]
            ].map(([title, desc]) => (
              <div
                key={title}
                className=""
              >
                <h3 className="">
                  {title}
                </h3>
                <p className="">
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
