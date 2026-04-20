import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  initials: string;
  exam: string;
  rankScore: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    initials: "PS",
    exam: "IBPS PO 2023",
    rankScore: "AIR 47",
    quote:
      "Sri Sri Institute transformed my preparation. The mock tests and personalized mentoring gave me the confidence to crack IBPS PO on my very first attempt. Forever grateful!",
  },
  {
    id: 2,
    name: "Rahul Verma",
    initials: "RV",
    exam: "SSC CGL 2022",
    rankScore: "Score: 189/200",
    quote:
      "The faculty here genuinely cares about each student's progress. The study material is comprehensive and the regular doubt sessions helped me clear all my concepts.",
  },
  {
    id: 3,
    name: "Anita Nair",
    initials: "AN",
    exam: "RRB NTPC 2023",
    rankScore: "AIR 112",
    quote:
      "I had failed twice before joining Sri Sri Institute. Their structured approach and weekly assessments completely changed my strategy — and I finally made it!",
  },
  {
    id: 4,
    name: "Suresh Kumar",
    initials: "SK",
    exam: "SBI PO 2023",
    rankScore: "Merit List",
    quote:
      "The interview preparation workshops are exceptional. The mock GDs and panel interviews polished my communication skills and gave me the edge in the selection process.",
  },
  {
    id: 5,
    name: "Meena Patel",
    initials: "MP",
    exam: "State PSC 2022",
    rankScore: "AIR 23",
    quote:
      "Joining this institute was the best decision of my life. The faculty's dedication and the peer learning environment pushed me to achieve beyond my expectations.",
  },
  {
    id: 6,
    name: "Vikram Singh",
    initials: "VS",
    exam: "NDA 2023",
    rankScore: "Written Cleared",
    quote:
      "The Defence coaching at Sri Sri is world-class. From physical fitness guidance to written exam prep, they cover everything. Proud to serve my nation now!",
  },
  {
    id: 7,
    name: "Divya Reddy",
    initials: "DR",
    exam: "SSC CHSL 2023",
    rankScore: "Score: 176/200",
    quote:
      "The online study portal and 24/7 doubt resolution service made it easy to prepare even during odd hours. The test series was incredibly close to the actual exam.",
  },
  {
    id: 8,
    name: "Arjun Mishra",
    initials: "AM",
    exam: "IBPS Clerk 2022",
    rankScore: "AIR 89",
    quote:
      "Sri Sri Institute's current affairs sessions and reasoning classes are truly outstanding. I cleared my exam in just 6 months of dedicated preparation here!",
  },
];

const ACHIEVEMENTS = [
  { icon: Users, number: "500+", label: "Students Cleared IBPS PO" },
  { icon: Trophy, number: "300+", label: "SSC CGL Selections" },
  { icon: Star, number: "200+", label: "Railways Selections" },
  { icon: Award, number: "AIR Top 100", label: "UPSC & State PSC Achievers" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Manual autoplay via interval
  useEffect(() => {
    if (!emblaApi || isHovered) return;
    const id = setInterval(() => emblaApi.scrollNext(), 4500);
    return () => clearInterval(id);
  }, [emblaApi, isHovered]);

  return (
    <div className="min-h-screen">
      {/* ── HERO ───────────────────────────────────────────── */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1e3a5f 0%, #0f2340 55%, #1a3357 100%)",
        }}
      >
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(245,166,35,0.35) 0%, transparent 70%)",
            transform: "translate(-30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(245,166,35,0.25) 0%, transparent 70%)",
            transform: "translate(25%, 25%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <Badge
              className="mb-5 text-xs font-semibold uppercase tracking-widest px-4 py-1"
              style={{
                background: "rgba(245,166,35,0.18)",
                color: "#f5a623",
                border: "1px solid rgba(245,166,35,0.35)",
              }}
            >
              Real Results · Real Students
            </Badge>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            Student <span style={{ color: "#f5a623" }}>Success</span> Stories
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            Thousands of students have transformed their lives through Sri Sri
            Institute. Here's what they have to say about their journey to
            success.
          </motion.p>
        </div>
      </section>

      {/* ── CAROUSEL ───────────────────────────────────────── */}
      <section
        className="py-16 md:py-20"
        style={{
          background: "linear-gradient(180deg, #0f2340 0%, #1a3357 100%)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            className="overflow-hidden rounded-2xl"
            ref={emblaRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <div className="flex gap-4 md:gap-6">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.id}
                  className="flex-none w-[85vw] sm:w-[480px] md:w-[540px]"
                >
                  <CarouselCard testimonial={t} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Dots + arrows */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => emblaApi?.scrollPrev()}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-smooth focus-visible:outline-none focus-visible:ring-2"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(245,166,35,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.1)";
              }}
              data-ocid="carousel-prev"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2 items-center">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className="rounded-full transition-smooth focus-visible:outline-none"
                  style={{
                    width: i === selectedIndex ? "24px" : "8px",
                    height: "8px",
                    background:
                      i === selectedIndex ? "#f5a623" : "rgba(255,255,255,0.3)",
                  }}
                  data-ocid={`carousel-dot-${i}`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => emblaApi?.scrollNext()}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-smooth focus-visible:outline-none focus-visible:ring-2"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(245,166,35,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.1)";
              }}
              data-ocid="carousel-next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ───────────────────────────────────── */}
      <section className="py-16 md:py-20 section-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.55 }}
          >
            <h2
              className="font-display text-3xl sm:text-4xl font-bold mb-3"
              style={{ color: "#1e3a5f" }}
            >
              Our <span style={{ color: "#f5a623" }}>Achievements</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Numbers that speak for our commitment to excellence and our
              students' success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACHIEVEMENTS.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div
                  key={a.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className="rounded-2xl p-6 text-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(30,58,95,0.92) 0%, rgba(15,35,64,0.96) 100%)",
                    border: "1px solid rgba(245,166,35,0.25)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                  }}
                  data-ocid={`achievement-card-${i}`}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: "rgba(245,166,35,0.15)",
                      border: "1px solid rgba(245,166,35,0.3)",
                    }}
                  >
                    <Icon size={26} style={{ color: "#f5a623" }} />
                  </div>
                  <p className="font-display text-3xl font-bold text-white mb-1">
                    {a.number}
                  </p>
                  <p
                    className="text-sm leading-snug"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {a.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ALL TESTIMONIALS GRID ──────────────────────────── */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.55 }}
          >
            <h2
              className="font-display text-3xl sm:text-4xl font-bold mb-3"
              style={{ color: "#1e3a5f" }}
            >
              All <span style={{ color: "#f5a623" }}>Testimonials</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Hear from students across every exam category — their journeys,
              their struggles, their victories.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.55, delay: (i % 3) * 0.1 }}
                className="rounded-2xl p-6 flex flex-col gap-4 glass-hover"
                style={{
                  background: "rgba(255,255,255,0.84)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(30,58,95,0.1)",
                  boxShadow: "0 4px 24px rgba(30,58,95,0.07)",
                }}
                data-ocid={`testimonial-grid-${t.id}`}
              >
                <Quote size={20} style={{ color: "#f5a623", opacity: 0.7 }} />

                <p className="text-sm leading-relaxed text-foreground/80 flex-1 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div
                  className="flex items-center gap-3 pt-3"
                  style={{ borderTop: "1px solid rgba(30,58,95,0.1)" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-sm"
                    style={{
                      background: "linear-gradient(135deg, #f5a623, #e8941a)",
                      color: "#1e3a5f",
                    }}
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className="font-semibold text-sm truncate"
                      style={{ color: "#1e3a5f" }}
                    >
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {t.exam}
                    </p>
                  </div>
                  <Badge
                    className="ml-auto flex-shrink-0 text-xs font-semibold"
                    style={{
                      background: "rgba(245,166,35,0.12)",
                      color: "#b8720a",
                      border: "1px solid rgba(245,166,35,0.3)",
                    }}
                  >
                    {t.rankScore}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ──────────────────────────────────────── */}
      <section
        className="py-14 text-center"
        style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #0f2340 100%)",
        }}
      >
        <motion.div
          className="max-w-2xl mx-auto px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.55 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Write Your <span style={{ color: "#f5a623" }}>Own</span> Success
            Story
          </h2>
          <p
            className="mb-8 text-lg"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Join the thousands of students who trusted Sri Sri Institute and
            secured their dream government jobs.
          </p>
          <Link
            to="/enquiry"
            className="inline-block px-8 py-3.5 rounded-xl font-semibold text-sm transition-smooth"
            style={{
              background: "linear-gradient(135deg, #f5a623, #e8941a)",
              color: "#1e3a5f",
              boxShadow: "0 4px 20px rgba(245,166,35,0.4)",
            }}
            data-ocid="cta-enquire"
          >
            Enquire Now — It&apos;s Free
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

// ── CarouselCard sub-component ──────────────────────────
function CarouselCard({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <div
      className="rounded-2xl p-7 md:p-8 flex flex-col gap-5 h-full"
      style={{
        background: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.14)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
      }}
    >
      <Quote size={32} style={{ color: "#f5a623", opacity: 0.6 }} />

      <p
        className="text-base md:text-lg leading-relaxed italic flex-1"
        style={{ color: "rgba(255,255,255,0.85)" }}
      >
        &ldquo;{t.quote}&rdquo;
      </p>

      <div
        className="flex items-center gap-4 pt-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-base flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #f5a623, #e8941a)",
            color: "#1e3a5f",
          }}
          aria-hidden="true"
        >
          {t.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-white truncate">{t.name}</p>
          <p
            className="text-sm truncate"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {t.exam}
          </p>
        </div>
        <span
          className="inline-block text-xs font-bold px-3 py-1 rounded-full flex-shrink-0"
          style={{
            background: "rgba(245,166,35,0.18)",
            color: "#f5a623",
            border: "1px solid rgba(245,166,35,0.35)",
          }}
        >
          {t.rankScore}
        </span>
      </div>
    </div>
  );
}
