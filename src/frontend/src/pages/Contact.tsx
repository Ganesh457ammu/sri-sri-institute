import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const contactItems = [
  {
    icon: MapPin,
    label: "Address",
    value: "123 Education Street, Hyderabad, Telangana 500001",
    href: "https://maps.google.com/?q=Hyderabad+Telangana",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@srisriinstitute.com",
    href: "mailto:info@srisriinstitute.com",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon-Sat: 8AM - 8PM",
    href: null,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  function validate() {
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email.";
    if (!form.message.trim()) errs.message = "Message is required.";
    return errs;
  }

  function handleBlur(field: keyof typeof form) {
    const errs = validate();
    setErrors((prev) => ({ ...prev, [field]: errs[field] }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-bg py-20 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(245,166,35,0.35) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Get In <span className="text-gold">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
            className="text-white/80 text-lg md:text-xl max-w-xl mx-auto"
          >
            We're here to help you take the first step toward your dream
            government job. Reach out anytime.
          </motion.p>

          {/* Quick contact pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 glass-card px-4 py-2 rounded-full text-white text-sm font-medium hover:border-yellow-400/50 transition-smooth"
            >
              <Phone className="w-4 h-4 text-gold" />
              +91 98765 43210
            </a>
            <a
              href="mailto:info@srisriinstitute.com"
              className="flex items-center gap-2 glass-card px-4 py-2 rounded-full text-white text-sm font-medium hover:border-yellow-400/50 transition-smooth"
            >
              <Mail className="w-4 h-4 text-gold" />
              info@srisriinstitute.com
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="section-light py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left — Contact Info */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
                className="font-display text-2xl font-bold text-foreground"
              >
                Contact Information
              </motion.h2>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(30,58,95,0.96)",
                  border: "1px solid rgba(245,166,35,0.2)",
                  boxShadow: "0 8px 40px rgba(30,58,95,0.2)",
                }}
              >
                <div className="p-6 flex flex-col gap-5">
                  {contactItems.map(
                    ({ icon: Icon, label, value, href }, idx) => (
                      <div key={label} className="flex items-start gap-4">
                        <div
                          className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: "rgba(245,166,35,0.15)" }}
                        >
                          <Icon className="w-5 h-5 text-gold" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-white/50 uppercase tracking-widest mb-0.5">
                            {label}
                          </p>
                          {href ? (
                            <a
                              href={href}
                              target={
                                href.startsWith("http") ? "_blank" : undefined
                              }
                              rel="noreferrer"
                              className="text-white text-sm font-medium break-words hover:text-yellow-400 transition-smooth"
                              data-ocid={`contact-item-${idx}`}
                            >
                              {value}
                            </a>
                          ) : (
                            <p className="text-white text-sm font-medium">
                              {value}
                            </p>
                          )}
                        </div>
                      </div>
                    ),
                  )}

                  {/* WhatsApp CTA */}
                  <div className="pt-2 border-t border-white/10">
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noreferrer"
                      data-ocid="whatsapp-contact-btn"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-smooth"
                      style={{
                        background: "rgba(37,211,102,0.15)",
                        border: "1px solid rgba(37,211,102,0.4)",
                        color: "#25d366",
                      }}
                      onMouseEnter={(e) => {
                        (
                          e.currentTarget as HTMLAnchorElement
                        ).style.background = "rgba(37,211,102,0.25)";
                      }}
                      onMouseLeave={(e) => {
                        (
                          e.currentTarget as HTMLAnchorElement
                        ).style.background = "rgba(37,211,102,0.15)";
                      }}
                    >
                      <MessageCircle className="w-5 h-5" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right — Contact Form */}
            <div className="lg:col-span-3">
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
                className="font-display text-2xl font-bold text-foreground mb-5"
              >
                Send Us a Message
              </motion.h2>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
                className="glass-card-light rounded-2xl p-8"
              >
                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center py-12 gap-4 text-center"
                    data-ocid="contact-success-state"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(30,58,95,0.1)" }}
                    >
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-xs">
                      Thank you for reaching out. Our team will get back to you
                      within 24 hours.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSuccess(false)}
                      className="mt-2"
                      data-ocid="contact-send-another-btn"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                    noValidate
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <Label
                          htmlFor="contact-name"
                          className="text-sm font-medium text-foreground"
                        >
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="contact-name"
                          data-ocid="contact-name-input"
                          placeholder="Rahul Sharma"
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          onBlur={() => handleBlur("name")}
                          aria-invalid={!!errors.name}
                          aria-describedby={
                            errors.name ? "contact-name-error" : undefined
                          }
                          className={errors.name ? "border-red-400" : ""}
                        />
                        {errors.name && (
                          <p
                            id="contact-name-error"
                            className="text-xs text-red-500"
                          >
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label
                          htmlFor="contact-email"
                          className="text-sm font-medium text-foreground"
                        >
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="contact-email"
                          type="email"
                          data-ocid="contact-email-input"
                          placeholder="rahul@example.com"
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          onBlur={() => handleBlur("email")}
                          aria-invalid={!!errors.email}
                          aria-describedby={
                            errors.email ? "contact-email-error" : undefined
                          }
                          className={errors.email ? "border-red-400" : ""}
                        />
                        {errors.email && (
                          <p
                            id="contact-email-error"
                            className="text-xs text-red-500"
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label
                        htmlFor="contact-message"
                        className="text-sm font-medium text-foreground"
                      >
                        Message <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="contact-message"
                        data-ocid="contact-message-input"
                        placeholder="Tell us how we can help you — course enquiries, batch timings, fees, etc."
                        rows={5}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        onBlur={() => handleBlur("message")}
                        aria-invalid={!!errors.message}
                        aria-describedby={
                          errors.message ? "contact-message-error" : undefined
                        }
                        className={errors.message ? "border-red-400" : ""}
                      />
                      {errors.message && (
                        <p
                          id="contact-message-error"
                          className="text-xs text-red-500"
                        >
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      data-ocid="contact-submit-btn"
                      disabled={loading}
                      className="self-start flex items-center gap-2 font-semibold px-8 py-3 rounded-xl"
                      style={{
                        background: loading ? "rgba(30,58,95,0.6)" : "#1e3a5f",
                        color: "#fff",
                      }}
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8H4z"
                            />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="section-muted py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Find Us on the Map
            </h2>
            <p className="text-muted-foreground">
              Conveniently located in the heart of Hyderabad
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            className="rounded-2xl overflow-hidden shadow-elevated"
            style={{ border: "1px solid rgba(30,58,95,0.12)" }}
            data-ocid="contact-map"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3428637655!2d78.24323445!3d17.4123487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1699000000000!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Map showing Sri Sri Institute location in Hyderabad, Telangana"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
