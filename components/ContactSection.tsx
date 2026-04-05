import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
  { icon: MapPin, label: "Visit Us", value: "123 Dance Street, Fitness City" },
  { icon: Phone, label: "Call Us", value: "+63 912 345 6789" },
  { icon: Mail, label: "Email Us", value: "hello@stepdancestudio.com" },
  { icon: Clock, label: "Hours", value: "Mon–Sat: 8:00 AM – 6:00 PM" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-slate-800/90">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">Get in Touch</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Contact Us</h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            Have questions or want to know more? Reach out — we'd love to hear from you!
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {contactInfo.map((c) => (
            <div key={c.label} className="bg-slate-900 rounded-xl p-6 border border-slate-700 text-center wrap-break-word hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-orange-600/10 flex items-center justify-center mx-auto mb-4">
                <c.icon className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-bold text-white text-sm mb-1">{c.label}</h3>
              <p className="text-sm text-muted-foreground">{c.value}</p>
            </div>
          ))}
        </div>

        {/* Static Map */}
        <div className="mt-12 rounded-xl overflow-hidden border border-border shadow-lg max-w-4xl mx-auto">
          <iframe
            title="Step Dance Studio Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.802!2d120.9842!3d14.5995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDM1JzU4LjIiTiAxMjDCsDU5JzAzLjEiRQ!5e0!3m2!1sen!2sph!4v1700000000000"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
