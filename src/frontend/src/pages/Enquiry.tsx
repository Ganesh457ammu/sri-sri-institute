import { useSubmitEnquiry } from "@/hooks/useQueries";
import { COURSES } from "@/types";
import type { EnquiryFormData } from "@/types";
import { AlertCircle, CheckCircle, Loader2, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const INITIAL_FORM: EnquiryFormData = {
  name: "",
  phone: "",
  email: "",
  course: "",
  city: "",
  message: "",
};

type FieldErrors = Partial<Record<keyof EnquiryFormData, string>>;

function validate(data: EnquiryFormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.name.trim()) errors.name = "Full name is required.";
  if (!data.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^[6-9]\d{9}$/.test(data.phone.replace(/\s|-/g, ""))) {
    errors.phone = "Enter a valid 10-digit Indian mobile number.";
  }
  if (!data.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!data.course) errors.course = "Please select a course.";
  if (!data.city.trim()) errors.city = "City / Location is required.";
  if (!data.message.trim()) errors.message = "Message is required.";
  return errors;
}

export default function Enquiry() {
  const submitEnquiry = useSubmitEnquiry();
  const [form, setForm] = useState<EnquiryFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof EnquiryFormData, boolean>>
  >({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof EnquiryFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validate({ ...form, [name]: value })[
          name as keyof EnquiryFormData
        ],
      }));
    }
  }

  function handleBlur(
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validate(form)[name as keyof EnquiryFormData],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allTouched: Partial<Record<keyof EnquiryFormData, boolean>> = {
      name: true,
      phone: true,
      email: true,
      course: true,
      city: true,
      message: true,
    };
    setTouched(allTouched);
    const fieldErrors = validate(form);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    try {
      await submitEnquiry.mutateAsync(form);
      setSubmitted(true);
      setForm(INITIAL_FORM);
      setTouched({});
      setErrors({});
    } catch {
      // error displayed via submitEnquiry.isError
    }
  }

  function handleReset() {
    setSubmitted(false);
    submitEnquiry.reset();
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-bg relative overflow-hidden py-20 md:py-28">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(245,166,35,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 40%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="mb-4 inline-block rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1 text-sm font-semibold text-yellow-300">
              Take the First Step
            </span>
            <h1 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Start Your <span className="text-gold">Journey</span>
            </h1>
            <p className="mt-4 text-lg text-white/70">
              Fill in your details and our counsellors will get back to you
              within 24 hours. No obligation, just guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative -mt-10 pb-20">
        <div className="mx-auto max-w-2xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="glass-card-light rounded-2xl p-8 shadow-elevated md:p-10"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="py-10 text-center"
                data-ocid="enquiry-success"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Enquiry Submitted!
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Thank you for reaching out. Our team will contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="gold-gradient mt-8 rounded-xl px-8 py-3 font-semibold text-white shadow-glass transition-smooth hover:scale-105 hover:shadow-elevated"
                  data-ocid="enquiry-submit-another"
                >
                  Submit Another Enquiry
                </button>
              </motion.div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Enquiry Form
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    All fields are required.
                  </p>
                </div>

                {submitEnquiry.isError && (
                  <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                    <p className="text-sm text-red-700">
                      Something went wrong. Please try again in a moment.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <FormField
                    label="Full Name"
                    id="enquiry-name"
                    error={touched.name ? errors.name : undefined}
                  >
                    <input
                      type="text"
                      id="enquiry-name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. Rahul Sharma"
                      data-ocid="enquiry-name"
                      className={inputCls(
                        touched.name ? errors.name : undefined,
                      )}
                    />
                  </FormField>

                  <FormField
                    label="Phone Number"
                    id="enquiry-phone"
                    error={touched.phone ? errors.phone : undefined}
                  >
                    <input
                      type="tel"
                      id="enquiry-phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="10-digit mobile number"
                      data-ocid="enquiry-phone"
                      className={inputCls(
                        touched.phone ? errors.phone : undefined,
                      )}
                    />
                  </FormField>

                  <FormField
                    label="Email Address"
                    id="enquiry-email"
                    error={touched.email ? errors.email : undefined}
                  >
                    <input
                      type="email"
                      id="enquiry-email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="you@example.com"
                      data-ocid="enquiry-email"
                      className={inputCls(
                        touched.email ? errors.email : undefined,
                      )}
                    />
                  </FormField>

                  <FormField
                    label="Course Interested In"
                    id="enquiry-course"
                    error={touched.course ? errors.course : undefined}
                  >
                    <select
                      id="enquiry-course"
                      name="course"
                      value={form.course}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      data-ocid="enquiry-course"
                      className={inputCls(
                        touched.course ? errors.course : undefined,
                      )}
                    >
                      <option value="">— Select a course —</option>
                      {COURSES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField
                    label="City / Location"
                    id="enquiry-city"
                    error={touched.city ? errors.city : undefined}
                  >
                    <input
                      type="text"
                      id="enquiry-city"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. Hyderabad"
                      data-ocid="enquiry-city"
                      className={inputCls(
                        touched.city ? errors.city : undefined,
                      )}
                    />
                  </FormField>

                  <FormField
                    label="Message"
                    id="enquiry-message"
                    error={touched.message ? errors.message : undefined}
                  >
                    <textarea
                      id="enquiry-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={4}
                      placeholder="Any specific queries, preferred batch timing, etc."
                      data-ocid="enquiry-message"
                      className={`${inputCls(touched.message ? errors.message : undefined)} resize-none`}
                    />
                  </FormField>

                  <button
                    type="submit"
                    disabled={submitEnquiry.isPending}
                    data-ocid="enquiry-submit"
                    className="gold-gradient mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-base font-bold text-white shadow-glass transition-smooth hover:scale-[1.02] hover:shadow-elevated disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitEnquiry.isPending ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Submit Enquiry
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>

          {/* Contact info cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: "📞", title: "Call Us", detail: "+91 98765 43210" },
              {
                icon: "✉️",
                title: "Email Us",
                detail: "info@srisriinstitute.com",
              },
              { icon: "🕐", title: "Response Time", detail: "Within 24 hours" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.35 + i * 0.07,
                  ease: "easeOut",
                }}
                className="glass-card-light rounded-xl p-4 text-center"
              >
                <div className="mb-2 text-2xl">{item.icon}</div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {item.title}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function inputCls(error?: string) {
  return [
    "w-full rounded-xl border bg-white/70 px-4 py-3 text-sm text-foreground",
    "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-0 transition-smooth",
    error
      ? "border-red-400 focus:ring-red-300"
      : "border-border focus:ring-yellow-400/50",
  ].join(" ");
}

function FormField({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-semibold text-foreground"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
}
