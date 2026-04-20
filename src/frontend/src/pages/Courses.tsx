import { Link } from "@tanstack/react-router";
import {
  Banknote,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Clock,
  MapPin,
  Shield,
  Train,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface CourseProgram {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  colorFrom: string;
  colorTo: string;
  duration: string;
  batchTiming: string;
  exams: string[];
  topics: string[];
  badge: string;
}

const COURSE_PROGRAMS: CourseProgram[] = [
  {
    id: "banking",
    category: "Banking",
    title: "Banking Sector",
    subtitle: "Public & Private Sector Banks",
    icon: <Banknote className="w-7 h-7" />,
    colorFrom: "#1a4080",
    colorTo: "#0f2340",
    duration: "6 Months",
    batchTiming: "Morning: 7–9 AM | Evening: 5–7 PM",
    exams: [
      "IBPS PO",
      "SBI PO",
      "IBPS Clerk",
      "SBI Clerk",
      "RBI Grade B",
      "RBI Assistant",
    ],
    topics: [
      "Quantitative Aptitude & Data Interpretation",
      "Reasoning Ability & Puzzles",
      "English Language & Comprehension",
      "General Awareness & Banking Awareness",
    ],
    badge: "Most Popular",
  },
  {
    id: "ssc",
    category: "SSC",
    title: "Staff Selection Commission",
    subtitle: "Central Government Positions",
    icon: <Briefcase className="w-7 h-7" />,
    colorFrom: "#2d3080",
    colorTo: "#1a1d55",
    duration: "5 Months",
    batchTiming: "Morning: 8–10 AM | Evening: 6–8 PM",
    exams: ["SSC CGL", "SSC CHSL", "SSC MTS", "SSC CPO", "SSC GD Constable"],
    topics: [
      "General Intelligence & Reasoning",
      "General Awareness & Current Affairs",
      "Quantitative Aptitude",
      "English Language & Comprehension",
    ],
    badge: "High Demand",
  },
  {
    id: "railways",
    category: "Railways",
    title: "Indian Railways",
    subtitle: "Railway Recruitment Board",
    icon: <Train className="w-7 h-7" />,
    colorFrom: "#0f5070",
    colorTo: "#092d40",
    duration: "4 Months",
    batchTiming: "Morning: 7–9 AM | Afternoon: 2–4 PM",
    exams: ["RRB NTPC", "RRB Group D", "RRB ALP", "RRB JE", "RRB MI"],
    topics: [
      "Mathematics & Arithmetic",
      "General Intelligence & Reasoning",
      "General Science & Technology",
      "Current Affairs & General Awareness",
    ],
    badge: "Mega Vacancies",
  },
  {
    id: "state",
    category: "State Exams",
    title: "State Government Exams",
    subtitle: "State Public Service Commissions",
    icon: <MapPin className="w-7 h-7" />,
    colorFrom: "#3a1f7a",
    colorTo: "#221250",
    duration: "8 Months",
    batchTiming: "Morning: 6–9 AM | Evening: 5–8 PM",
    exams: [
      "State PSC",
      "State Police SI",
      "State SSC",
      "Revenue Inspector",
      "State TET",
    ],
    topics: [
      "State History, Geography & Culture",
      "Polity, Constitution & Governance",
      "General Science & Environment",
      "Reasoning, Aptitude & English",
    ],
    badge: "Comprehensive",
  },
  {
    id: "defence",
    category: "Defence",
    title: "Defence Services",
    subtitle: "Armed Forces & Paramilitary",
    icon: <Shield className="w-7 h-7" />,
    colorFrom: "#0f5540",
    colorTo: "#083325",
    duration: "6 Months",
    batchTiming: "Morning: 5:30–8 AM | Evening: 4–6 PM",
    exams: ["NDA", "CDS", "AFCAT", "CAPF AC", "SSB Interview Prep"],
    topics: [
      "Mathematics & Physics (NDA/CDS)",
      "English Language & Essay Writing",
      "General Knowledge & Current Affairs",
      "Physical Fitness & SSB Preparation",
    ],
    badge: "Elite Track",
  },
];

const CATEGORIES = [
  "All",
  "Banking",
  "SSC",
  "Railways",
  "State Exams",
  "Defence",
];

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? COURSE_PROGRAMS
      : COURSE_PROGRAMS.filter((c) => c.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="hero-bg relative overflow-hidden py-20 md:py-28">
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(245,166,35,0.15), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 -left-20 w-60 h-60 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(245,166,35,0.1), transparent 70%)",
          }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-5 font-body"
              style={{
                background: "rgba(245,166,35,0.18)",
                color: "#f5a623",
                border: "1px solid rgba(245,166,35,0.35)",
              }}
            >
              5 Specialized Programs
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
              Our <span className="text-gold">Courses</span>
            </h1>
            <p
              className="text-lg md:text-xl font-body max-w-2xl mx-auto leading-relaxed"
              style={{ color: "rgba(255,255,255,0.78)" }}
            >
              Comprehensive exam preparation programs crafted by India's top
              educators — structured curriculum, expert guidance, and proven
              results across every major competitive exam.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            {[
              { label: "Programs", value: "5+" },
              { label: "Subjects Covered", value: "20+" },
              { label: "Daily Batches", value: "10+" },
              { label: "Selections / Year", value: "500+" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-xl px-5 py-3 text-center min-w-[100px]"
              >
                <div className="text-gold text-2xl font-bold font-display">
                  {stat.value}
                </div>
                <div
                  className="text-sm font-body mt-0.5"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <div
        className="sticky top-[64px] z-30 py-4 border-b"
        style={{
          background: "rgba(30,58,95,0.97)",
          backdropFilter: "blur(12px)",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                data-ocid={`filter-tab-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setActiveCategory(cat)}
                type="button"
                className="px-4 py-2 rounded-full text-sm font-semibold font-body transition-smooth"
                style={
                  activeCategory === cat
                    ? { background: "#f5a623", color: "#1e3a5f" }
                    : {
                        background: "rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.75)",
                        border: "1px solid rgba(255,255,255,0.15)",
                      }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Cards Grid */}
      <section
        className="py-14 md:py-20"
        style={{ background: "rgba(30,58,95,0.04)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {filtered.map((course, index) => (
              <motion.div
                key={course.id}
                data-ocid={`course-card-${course.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="hero-bg py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Not Sure Which Course to Choose?
            </h2>
            <p
              className="font-body text-lg mb-8"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              Our expert counsellors will guide you to the right program based
              on your goals, background, and aspirations — completely free.
            </p>
            <Link
              to="/enquiry"
              data-ocid="cta-get-counselling"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-display font-bold text-base transition-smooth hover:scale-105 hover:shadow-elevated"
              style={{ background: "#f5a623", color: "#1e3a5f" }}
            >
              Get Free Counselling <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function CourseCard({ course }: { course: CourseProgram }) {
  return (
    <div
      className="rounded-2xl overflow-hidden h-full flex flex-col transition-smooth hover:-translate-y-1 hover:shadow-elevated"
      style={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.13)",
        boxShadow: "0 8px 32px rgba(30,58,95,0.2)",
      }}
    >
      {/* Card Header */}
      <div
        className="p-6 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${course.colorFrom}, ${course.colorTo})`,
        }}
      >
        <div
          className="absolute -right-6 -top-6 w-28 h-28 rounded-full pointer-events-none"
          style={{ background: "rgba(245,166,35,0.18)" }}
        />

        <div className="flex items-start justify-between relative z-10">
          <div>
            <div
              className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3"
              style={{ background: "rgba(245,166,35,0.2)", color: "#f5a623" }}
            >
              {course.icon}
            </div>
            <h3 className="font-display text-xl font-bold text-white leading-tight">
              {course.title}
            </h3>
            <p
              className="font-body text-sm mt-0.5"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              {course.subtitle}
            </p>
          </div>
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full font-body whitespace-nowrap flex-shrink-0 ml-3"
            style={{
              background: "rgba(245,166,35,0.22)",
              color: "#f5a623",
              border: "1px solid rgba(245,166,35,0.3)",
            }}
          >
            {course.badge}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 mt-4 relative z-10">
          <div
            className="flex items-center gap-1.5 text-sm font-body"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            <Clock
              className="w-4 h-4 flex-shrink-0"
              style={{ color: "#f5a623" }}
            />
            <span>{course.duration}</span>
          </div>
          <div
            className="flex items-center gap-1.5 text-sm font-body"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            <BookOpen
              className="w-4 h-4 flex-shrink-0"
              style={{ color: "#f5a623" }}
            />
            <span>{course.batchTiming}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div
        className="p-6 flex flex-col flex-1"
        style={{ background: "rgba(30,58,95,0.72)" }}
      >
        {/* Exams */}
        <div className="mb-5">
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-2.5 font-body"
            style={{ color: "#f5a623" }}
          >
            Exams Covered
          </p>
          <div className="flex flex-wrap gap-2">
            {course.exams.map((exam) => (
              <span
                key={exam}
                className="text-xs px-2.5 py-1 rounded-full font-body"
                style={{
                  background: "rgba(245,166,35,0.1)",
                  color: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(245,166,35,0.22)",
                }}
              >
                {exam}
              </span>
            ))}
          </div>
        </div>

        {/* Topics */}
        <div className="mb-6 flex-1">
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-2.5 font-body"
            style={{ color: "#f5a623" }}
          >
            Syllabus Highlights
          </p>
          <ul className="space-y-2">
            {course.topics.map((topic) => (
              <li
                key={topic}
                className="flex items-start gap-2.5 text-sm font-body"
                style={{ color: "rgba(255,255,255,0.78)" }}
              >
                <CheckCircle2
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: "#f5a623" }}
                />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Enroll CTA */}
        <Link
          to="/enquiry"
          data-ocid={`enroll-${course.id}`}
          className="group/btn flex items-center justify-center gap-2 w-full py-3 rounded-xl font-display font-bold text-sm transition-smooth hover:opacity-90 hover:shadow-elevated"
          style={{ background: "#f5a623", color: "#1e3a5f" }}
        >
          Enroll Now
          <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
