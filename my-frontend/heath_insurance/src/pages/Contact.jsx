import '../style/contact.css'
const Contact = () => {
  return (
    <div className="contact-page">
  <div className="contact-container">
    <h1 className="contact-title">Contact Us</h1>

    <div className="contact-card">
      <p className="contact-text">
        We’re here to help. Reach out to us anytime.
      </p>

      <div className="contact-info">
        <p>📞 <span className="contact-info-detail">+251 911 234 567</span></p>
        <p>📧 <span className="contact-info-detail">support@healthcareinsurance.com</span></p>
        <p>📍 <span className="contact-info-detail">Debre Markos, Ethiopia</span></p>
      </div>
    </div>
  </div>
</div>

  );
};

export default Contact;
