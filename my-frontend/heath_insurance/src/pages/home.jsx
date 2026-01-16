import { Link } from "react-router-dom";
import "../style/home.css";
import logo from '../components/logo.jpg'

const Home = () => {
  return (
   <div className="home-page">

  {/* HERO */}
  <section className="home-hero">
    <div className="home-hero-content">
      {/* <img src={logo} alt="Logo" /> */}

      <h1 className="home-hero-title">
        Smart Healthcare Insurance <br /> You Can Trust
      </h1>

      <p className="home-hero-text">
        Affordable, reliable, and secure healthcare insurance services
        designed to protect you and your family.
      </p>

      <Link
        to="/register"
        className="home-hero-button"
      >
        Get Started Today
      </Link>
    </div>
  </section>

  {/* SERVICES */}
  <section className="home-services">
    <div className="home-services-content">
      <h2 className="home-section-title">
        Our Core Services
      </h2>

      <div className="home-services-grid">
        {[
          ["Health Coverage", "Full medical support including emergency and hospital care."],
          ["Easy Registration", "Simple, fast, and secure online registration system."],
          ["Client Dashboard", "Manage your insurance profile in one place."]
        ].map(([title, desc]) => (
          <div
            key={title}
            className="home-service-card"
          >
            <h3 className="home-service-title">
              {title}
            </h3>
            <p className="home-service-text">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* FAQ */}
  <section className="home-faq">
    <div className="home-faq-content">
      <h2 className="home-section-title">
        Frequently Asked Questions
      </h2>

      <div className="home-faq-list">
        {[
          ["Who can register?", "Anyone who meets eligibility requirements can register."],
          ["Is my data secure?", "Yes, we use secure systems to protect your information."],
          ["How do I start?", "Click the Get Started button and complete the form."]
        ].map(([q, a]) => (
          <div
            key={q}
            className="home-faq-item"
          >
            <h4 className="home-faq-question">
              {q}
            </h4>
            <p className="home-faq-answer">{a}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

</div>
  );
};

export default Home;
