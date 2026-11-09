import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
  { icon: MapPin, label: "Visit Us", value: "Cagayan de Oro City" },
  { icon: Phone, label: "Call Us", value: "+63 935 110 6411" },
  { icon: Mail, label: "Email Us", value: "hello@stepdancestudio.com" },
  { icon: Clock, label: "Hours", value: "Mon–Sat: 8:00 AM – 6:00 PM" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="home-contact home-section">
      <div className="home-container">
        <div className="home-contact-heading">
          <span className="home-eyebrow">
            Get in Touch
          </span>
          <h2 className="home-section-title">
            Contact Us
          </h2>
          <p className="home-body-copy">
            Have questions or want to know more? Reach out — we'd love to hear
            from you!
          </p>
        </div>

        <div className="home-contact-grid">
          {contactInfo.map((c) => (
            <div
              key={c.label}
              className="home-contact-card"
            >
              <div className="home-contact-icon">
                <c.icon className="size-5" />
              </div>
              <h3 className="home-contact-label">{c.label}</h3>
              <p className="home-contact-value">{c.value}</p>
            </div>
          ))}
        </div>

        {/* Static Map */}
        <div className="home-map">
          <iframe
            title="Map of Cagayan de Oro City"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252647.27982287708!2d124.4641228696208!3d8.341120662879112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32fff2d9810e9e81%3A0x2edcd5b84a6de2a2!2sCagayan%20De%20Oro%20City%2C%20Misamis%20Oriental!5e0!3m2!1sen!2sph!4v1775388138558!5m2!1sen!2sph"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
