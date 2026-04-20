import { Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  CheckCircle,
  Eye,
  Star,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: EASE },
  }),
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: EASE },
  }),
};

// ─── Faculty Data ───────────────────────────────────────────────────────────────
const FACULTY = [
  {
    initials: "RK",
    name: "Rajesh Kumar",
    subject: "Quantitative Aptitude",
    experience: 12,
    highlights: ["IIT Alumnus", "SBI PO Expert"],
  },
  {
    initials: "PS",
    name: "Priya Sharma",
    subject: "English Language",
    experience: 9,
    highlights: ["MA English", "IBPS Mentor"],
  },
  {
    initials: "AV",
    name: "Arjun Verma",
    subject: "GK & Current Affairs",
    experience: 11,
    highlights: ["Ex-IAS Coach", "GK Specialist"],
  },
  {
    initials: "SM",
    name: "Sunita Mehta",
    subject: "Logical Reasoning",
    experience: 8,
    highlights: ["CAT Trainer", "Reasoning Expert"],
  },
  {
    initials: "DT",
    name: "Deepak Tripathi",
    subject: "Banking & Finance",
    experience: 14,
    highlights: ["Ex-Bank PO", "Finance Expert"],
  },
  {
    initials: "NR",
    name: "Neha Reddy",
    subject: "Computer & IT Awareness",
    experience: 7,
    highlights: ["MCA Gold Medalist", "IT Coach"],
  },
  {
    initials: "MG",
    name: "Manish Gupta",
    subject: "SSC & Railways Prep",
    experience: 10,
    highlights: ["SSC CGL Rank 1", "Railway Expert"],
  },
  {
    initials: "KP",
    name: "Kavitha Pillai",
    subject: "Defence Exam Preparation",
    experience: 13,
    highlights: ["Ex-Army Officer", "NDA Specialist"],
  },
];

// ─── Timeline Data ──────────────────────────────────────────────────────────────
const MILESTONES = [
  {
    year: "2014",
    title: "Foundation Year",
    description:
      "Sri Sri Institute was founded in Hyderabad with a vision to make quality government exam coaching accessible to every student.",
    icon: Star,
  },
  {
    year: "2016",
    title: "500 Students Milestone",
    description:
      "Crossed 500 enrolled students with our first batch of Banking and SSC achievers scoring top results across Telangana.",
    icon: Users,
  },
  {
    year: "2018",
    title: "SSC & Railways Expansion",
    description:
      "Expanded course offerings to include dedicated SSC and Railways preparation programs with specialized study material.",
    icon: BookOpen,
  },
  {
    year: "2020",
    title: "2000+ Students Strong",
    description:
      "Reached the 2000-student mark while maintaining an impressive 88% selection rate, earning recognition statewide.",
    icon: TrendingUp,
  },
  {
    year: "2022",
    title: "5000+ Students & 95% Success",
    description:
      "A landmark year — over 5000 students enrolled and our success rate soared to 95%, placing Sri Sri among the best in South India.",
    icon: Award,
  },
  {
    year: "2024",
    title: "National Recognition",
    description:
      "Awarded 'Best Coaching Institute for Government Exams' and expanded with Defence programs, completing our full exam portfolio.",
    icon: CheckCircle,
  },
];

const STATS = [
  { value: "5000+", label: "Students Trained", icon: Users },
  { value: "95%", label: "Success Rate", icon: TrendingUp },
  { value: "10+", label: "Years Experience", icon: Award },
  { value: "50+", label: "Expert Faculty", icon: BookOpen },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* ── Hero Banner ──────────────────────────────────────────────────────── */}
      <section className="hero-bg relative overflow-hidden py-24 md:py-32">
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 blur-2xl"
          style={{ background: "#f5a623" }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full opacity-10 blur-2xl"
          style={{ background: "#f5a623" }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={0}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{
                background: "rgba(245,166,35,0.15)",
                border: "1px solid rgba(245,166,35,0.35)",
                color: "#f5a623",
              }}
            >
              Our Story
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-4"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={1}
          >
            About <span className="text-gold">Sri Sri Institute</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.75)" }}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={2}
          >
            A decade of excellence in government exam coaching — empowering
            students to achieve their dreams of public service.
          </motion.p>
        </div>
      </section>

      {/* ── Institute Introduction ────────────────────────────────────────────── */}
      <section className="section-light py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
              custom={0}
            >
              <span className="text-gold font-semibold uppercase tracking-widest text-sm">
                Who We Are
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-5 text-foreground">
                Premier Coaching for{" "}
                <span className="text-gold">Government Exams</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2014,{" "}
                  <strong className="text-foreground">Sri Sri Institute</strong>{" "}
                  has grown into one of Telangana's most trusted names in
                  competitive exam coaching. We specialize in preparing
                  aspirants for Banking, SSC, Railways, State, and Defence
                  examinations — covering every major government recruitment
                  exam under one roof.
                </p>
                <p>
                  Our methodology combines structured classroom learning with
                  intensive mock test sessions, personalized doubt-clearing, and
                  up-to-date study material curated by former exam toppers and
                  experienced educators. With a{" "}
                  <strong className="text-foreground">95% success rate</strong>{" "}
                  and more than{" "}
                  <strong className="text-foreground">
                    5000 successful students
                  </strong>
                  , our track record speaks for itself.
                </p>
                <p>
                  We believe every student deserves a fair shot at a government
                  career. That's why we keep our batches small, our faculty
                  engaged, and our fees affordable — ensuring no talent goes
                  unnoticed for lack of opportunity. At Sri Sri Institute,
                  success isn't just a goal — it's a commitment we make to every
                  student who walks through our doors.
                </p>
              </div>
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map(({ value, label, icon: Icon }, i) => (
                <motion.div
                  key={label}
                  className="glass-card-light rounded-2xl p-6 text-center shadow-glass"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  custom={i * 0.1}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  data-ocid={`stat-card-${label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ background: "rgba(245,166,35,0.12)" }}
                  >
                    <Icon size={22} style={{ color: "#f5a623" }} />
                  </div>
                  <div className="font-display text-3xl font-bold text-gold">
                    {value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ──────────────────────────────────────────────────── */}
      <section className="hero-bg relative overflow-hidden py-20">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: "#f5a623" }}
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-10"
          style={{ background: "#f5a623" }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0}
          >
            <span className="text-gold font-semibold uppercase tracking-widest text-sm">
              Our Purpose
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2">
              Mission &amp; Vision
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission card */}
            <motion.div
              className="glass-card rounded-3xl p-8 md:p-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
              custom={0}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              data-ocid="mission-card"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{
                  background: "rgba(245,166,35,0.2)",
                  border: "1px solid rgba(245,166,35,0.3)",
                }}
              >
                <Target size={30} style={{ color: "#f5a623" }} />
              </div>
              <h3 className="font-display text-2xl font-bold text-gold mb-4">
                Our Mission
              </h3>
              <p
                className="leading-relaxed mb-5 text-sm"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                To empower every government exam aspirant with world-class
                coaching, comprehensive study resources, and the mentorship
                needed to crack competitive exams with confidence and skill.
              </p>
              <ul className="space-y-2.5">
                {[
                  "Affordable, high-quality coaching for all",
                  "Structured, exam-oriented curriculum",
                  "Personalized mentoring and doubt sessions",
                  "Regular mock tests and performance analysis",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "rgba(255,255,255,0.75)" }}
                  >
                    <CheckCircle
                      size={15}
                      className="mt-0.5 shrink-0"
                      style={{ color: "#f5a623" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Vision card */}
            <motion.div
              className="glass-card rounded-3xl p-8 md:p-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={1}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              data-ocid="vision-card"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{
                  background: "rgba(245,166,35,0.2)",
                  border: "1px solid rgba(245,166,35,0.3)",
                }}
              >
                <Eye size={30} style={{ color: "#f5a623" }} />
              </div>
              <h3 className="font-display text-2xl font-bold text-gold mb-4">
                Our Vision
              </h3>
              <p
                className="leading-relaxed mb-5 text-sm"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                To become India's most trusted coaching institute — a place
                where every aspirant's potential is recognized, nurtured, and
                transformed into a successful government career that serves the
                nation.
              </p>
              <ul className="space-y-2.5">
                {[
                  "Top coaching institute in South India by 2027",
                  "100% placement support for all students",
                  "Expand to 10 cities across Telangana & AP",
                  "Digital learning platform for remote students",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "rgba(255,255,255,0.75)" }}
                  >
                    <CheckCircle
                      size={15}
                      className="mt-0.5 shrink-0"
                      style={{ color: "#f5a623" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Faculty Section ───────────────────────────────────────────────────── */}
      <section className="section-muted py-20" data-ocid="faculty-section">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0}
          >
            <span className="text-gold font-semibold uppercase tracking-widest text-sm">
              Meet the Team
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">
              Our Expert Faculty
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Learn from the best — our faculty includes former exam toppers,
              ex-government officers, and seasoned educators with decades of
              combined experience.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FACULTY.map((member, i) => (
              <motion.div
                key={member.name}
                className="glass-card-light rounded-2xl p-6 text-center shadow-glass glass-hover"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={i * 0.08}
                data-ocid={`faculty-card-${i}`}
              >
                {/* Avatar */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold font-display"
                  style={{
                    background: "linear-gradient(135deg, #f5a623, #e8941a)",
                    color: "#1e3a5f",
                    boxShadow: "0 4px 16px rgba(245,166,35,0.35)",
                  }}
                >
                  {member.initials}
                </div>

                <h3 className="font-display font-bold text-foreground text-base leading-tight">
                  {member.name}
                </h3>
                <p
                  className="text-sm font-medium mt-1 mb-2"
                  style={{ color: "#f5a623" }}
                >
                  {member.subject}
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  {member.experience} yrs experience
                </p>

                <div className="flex flex-wrap gap-1 justify-center">
                  {member.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: "rgba(30,58,95,0.08)",
                        color: "#1e3a5f",
                        border: "1px solid rgba(30,58,95,0.15)",
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Milestones Timeline ───────────────────────────────────────────────── */}
      <section className="section-light py-20" data-ocid="timeline-section">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0}
          >
            <span className="text-gold font-semibold uppercase tracking-widest text-sm">
              Our Journey
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">
              Milestones &amp; Achievements
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              A decade of growth, commitment, and student success — each
              milestone a testament to our faculty and students' dedication.
            </p>
          </motion.div>

          <div className="relative">
            {/* Central timeline line */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5"
              style={{
                background:
                  "linear-gradient(to bottom, #f5a623 0%, #1e3a5f 100%)",
                transform: "translateX(-50%)",
              }}
            />

            <div className="space-y-10">
              {MILESTONES.map((milestone, i) => {
                const Icon = milestone.icon;
                const isLeft = i % 2 === 0;

                return (
                  <motion.div
                    key={milestone.year}
                    className={`relative flex items-start ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    } flex-row`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    custom={i * 0.1}
                    data-ocid={`milestone-${milestone.year}`}
                  >
                    {/* Content card */}
                    <div
                      className={`ml-16 md:ml-0 md:w-5/12 ${
                        isLeft ? "md:pr-10" : "md:pl-10 md:ml-auto"
                      }`}
                    >
                      <div
                        className="glass-card-light rounded-2xl p-6 shadow-glass"
                        style={{
                          borderLeft: isLeft
                            ? "none"
                            : "3px solid rgba(245,166,35,0.5)",
                          borderRight: isLeft
                            ? "3px solid rgba(245,166,35,0.5)"
                            : "none",
                        }}
                      >
                        <span
                          className="font-display text-lg font-bold"
                          style={{ color: "#f5a623" }}
                        >
                          {milestone.year}
                        </span>
                        <h3 className="font-display font-bold text-foreground text-base mt-1 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>

                    {/* Icon node on the line */}
                    <div
                      className="absolute left-6 md:left-1/2 top-5 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10 shrink-0"
                      style={{
                        background: "linear-gradient(135deg, #f5a623, #e8941a)",
                        boxShadow: "0 4px 16px rgba(245,166,35,0.4)",
                      }}
                    >
                      <Icon size={20} style={{ color: "#1e3a5f" }} />
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="hidden md:block md:w-5/12" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────────── */}
      <section className="hero-bg py-16">
        <motion.div
          className="max-w-3xl mx-auto px-4 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={0}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your{" "}
            <span className="text-gold">Government Exam Journey?</span>
          </h2>
          <p
            className="text-lg mb-8"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Join thousands of successful students who trusted Sri Sri Institute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/enquiry"
              className="inline-block gold-gradient text-center font-semibold px-8 py-3.5 rounded-xl transition-smooth hover:opacity-90 shadow-elevated"
              style={{ color: "#1e3a5f" }}
              data-ocid="about-cta-enquiry"
            >
              Enquire Now
            </Link>
            <Link
              to="/courses"
              className="inline-block btn-gold-outline text-center font-semibold px-8 py-3.5 rounded-xl"
              data-ocid="about-cta-courses"
            >
              Explore Courses
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
