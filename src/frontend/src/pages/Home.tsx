import { COURSES } from "@/types";
import { Canvas, useFrame } from "@react-three/fiber";
import { Link } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import {
  BookMarked,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Heart,
  Landmark,
  MapPin,
  Star,
  Train,
  Users,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { Mesh, Points } from "three";

// ─── 3D Scene ─────────────────────────────────────────────────────────────────

function FloatingShape({
  position,
  geometry,
  color,
  speed,
  rotAxis,
}: {
  position: [number, number, number];
  geometry: "icosahedron" | "torus" | "octahedron";
  color: string;
  speed: number;
  rotAxis: [number, number, number];
}) {
  const meshRef = useRef<Mesh>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x += rotAxis[0] * speed * 0.01;
    meshRef.current.rotation.y += rotAxis[1] * speed * 0.01;
    meshRef.current.rotation.z += rotAxis[2] * speed * 0.005;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.5 + offset) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position}>
      {geometry === "icosahedron" && <icosahedronGeometry args={[0.6, 0]} />}
      {geometry === "torus" && <torusGeometry args={[0.5, 0.18, 12, 32]} />}
      {geometry === "octahedron" && <octahedronGeometry args={[0.55, 0]} />}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.55}
        wireframe={geometry !== "torus"}
        metalness={0.6}
        roughness={0.3}
      />
    </mesh>
  );
}

function ParticleCloud() {
  const pointsRef = useRef<Points>(null);
  const count = 200;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#f5a623"
        size={0.04}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

const SHAPES: Array<{
  id: string;
  position: [number, number, number];
  geometry: "icosahedron" | "torus" | "octahedron";
  color: string;
  speed: number;
  rotAxis: [number, number, number];
}> = [
  {
    id: "sh1",
    position: [3.5, 1.2, -2],
    geometry: "icosahedron",
    color: "#f5a623",
    speed: 0.8,
    rotAxis: [1, 1, 0],
  },
  {
    id: "sh2",
    position: [-3.8, 0.5, -3],
    geometry: "torus",
    color: "#4a7fbd",
    speed: 0.6,
    rotAxis: [0.5, 1, 0.3],
  },
  {
    id: "sh3",
    position: [4.5, -1.5, -2.5],
    geometry: "octahedron",
    color: "#ffffff",
    speed: 1.0,
    rotAxis: [1, 0, 1],
  },
  {
    id: "sh4",
    position: [-2.5, 1.8, -2],
    geometry: "icosahedron",
    color: "#6b9fd4",
    speed: 0.7,
    rotAxis: [0, 1, 0.5],
  },
  {
    id: "sh5",
    position: [1.5, -2.0, -3],
    geometry: "torus",
    color: "#f5a623",
    speed: 0.9,
    rotAxis: [1, 0.5, 0],
  },
  {
    id: "sh6",
    position: [-4.5, -1.2, -3],
    geometry: "octahedron",
    color: "#e8941a",
    speed: 0.5,
    rotAxis: [0.3, 1, 0.7],
  },
  {
    id: "sh7",
    position: [2.5, 2.2, -3.5],
    geometry: "icosahedron",
    color: "#3d6da0",
    speed: 0.6,
    rotAxis: [1, 1, 1],
  },
];

function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#f5a623" />
      <directionalLight
        position={[-5, -5, 3]}
        intensity={0.4}
        color="#4a7fbd"
      />
      <ParticleCloud />
      {SHAPES.map((s) => (
        <FloatingShape key={s.id} {...s} />
      ))}
    </>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "5000+", label: "Students", id: "students" },
  { value: "95%", label: "Success Rate", id: "success" },
  { value: "10+", label: "Years Experience", id: "experience" },
  { value: "50+", label: "Expert Faculty", id: "faculty" },
];

const COURSE_CARDS = [
  {
    id: "banking",
    icon: Landmark,
    title: "Banking",
    description:
      "Comprehensive coaching for IBPS PO, SBI PO, Clerk, and RBI Grade B examinations.",
    colorRgb: "245,166,35",
  },
  {
    id: "ssc",
    icon: BookOpen,
    title: "SSC",
    description:
      "Expert preparation for CGL, CHSL, MTS, and CPO exams with updated study material.",
    colorRgb: "74,127,189",
  },
  {
    id: "railways",
    icon: Train,
    title: "Railways",
    description:
      "Specialized coaching for RRB NTPC, Group D, and ALP with technical subject support.",
    colorRgb: "245,166,35",
  },
  {
    id: "state",
    icon: MapPin,
    title: "State Exams",
    description:
      "Focused preparation for PSC, State Police, and State SSC examinations.",
    colorRgb: "74,127,189",
  },
];

const WHY_CARDS = [
  {
    id: "faculty",
    icon: Users,
    title: "Experienced Faculty",
    description:
      "Seasoned professors with deep expertise in exam patterns and current affairs.",
  },
  {
    id: "material",
    icon: BookMarked,
    title: "Comprehensive Study Material",
    description:
      "Completely updated notes and textbooks aligned with the latest syllabi.",
  },
  {
    id: "tests",
    icon: ClipboardCheck,
    title: "Regular Mock Tests",
    description:
      "Timed assessments that simulate real exam conditions to boost confidence.",
  },
  {
    id: "mentoring",
    icon: Heart,
    title: "Personal Mentoring",
    description:
      "One-on-one mentorship to track your progress and overcome challenges.",
  },
];

const TESTIMONIALS = [
  {
    id: "priya",
    name: "Priya Sharma",
    exam: "IBPS PO 2023",
    rank: "All India Rank 142",
    quote:
      "Sri Sri Institute transformed my preparation strategy. The faculty's dedication and mock test series gave me the confidence to crack IBPS PO on my first attempt.",
    initials: "PS",
  },
  {
    id: "arjun",
    name: "Arjun Reddy",
    exam: "SSC CGL 2023",
    rank: "Score: 178/200",
    quote:
      "The study material and personal mentoring at Sri Sri Institute is truly world-class. I improved my score by 40 points after joining their SSC CGL program.",
    initials: "AR",
  },
  {
    id: "sneha",
    name: "Sneha Patel",
    exam: "SBI PO 2023",
    rank: "Final Selection",
    quote:
      "I had failed twice before joining Sri Sri. Their personalized approach identified my weak areas and helped me overcome them systematically. Finally cleared SBI PO!",
    initials: "SP",
  },
  {
    id: "rahul",
    name: "Rahul Nair",
    exam: "RRB NTPC 2023",
    rank: "All India Rank 89",
    quote:
      "The Railways-specific modules at Sri Sri Institute are incredibly detailed. The technical knowledge I gained here was the key difference in my selection.",
    initials: "RN",
  },
  {
    id: "kavya",
    name: "Kavya Menon",
    exam: "State PSC 2023",
    rank: "Rank 14 – Telangana PSC",
    quote:
      "From interview prep to current affairs updates, Sri Sri Institute covers everything. Grateful for the support throughout my PSC journey.",
    initials: "KM",
  },
];

// ─── Animation helpers ────────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const initial = {
    opacity: 0,
    y: direction === "up" ? 30 : 0,
    x: direction === "left" ? -30 : direction === "right" ? 30 : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  title,
  subtitle,
}: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
          {subtitle}
        </p>
      )}
      <div className="mt-4 mx-auto w-16 h-1 rounded-full gold-gradient" />
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-bg overflow-hidden">
      {/* 3D Canvas — absolutely positioned behind text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(30,58,95,0.85) 0%, rgba(15,35,64,0.75) 50%, rgba(26,51,87,0.82) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6 font-body"
            style={{
              background: "rgba(245,166,35,0.18)",
              color: "#f5a623",
              border: "1px solid rgba(245,166,35,0.4)",
            }}
          >
            India's Premier Competitive Exam Coaching
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6"
        >
          Shape Your Future with{" "}
          <span style={{ color: "#f5a623" }}>Sri Sri</span>{" "}
          <span className="text-white">Institute</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg sm:text-xl md:text-2xl text-white/80 font-body max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Expert coaching for government competitive exams including Banking,
          SSC, Railways, and State Exams. Proven methodologies, experienced
          faculty, and a track record of 5000+ successful students.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/enquiry"
            data-ocid="hero-join-now"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg font-body transition-smooth"
            style={{ background: "#f5a623", color: "#1e3a5f" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "#e8941a";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "#f5a623";
              el.style.transform = "translateY(0)";
            }}
          >
            Join Now
          </Link>
          <Link
            to="/enquiry"
            data-ocid="hero-enquire-today"
            className="btn-gold-outline inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg font-body"
          >
            Enquire Today
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <span className="text-white/50 text-xs font-body tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.5,
            ease: "easeInOut",
          }}
          className="w-px h-8 rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, rgba(245,166,35,0.6), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}

function StatsBar() {
  return (
    <section style={{ background: "#1e3a5f" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card-dark py-6 px-4 grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <FadeIn key={stat.id} delay={i * 0.1} direction="up">
              <div
                className="flex flex-col items-center justify-center py-4 px-2 relative"
                data-ocid={`stat-${stat.id}`}
              >
                {i < STATS.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 stat-divider" />
                )}
                <span
                  className="text-3xl sm:text-4xl font-display font-bold leading-none mb-1"
                  style={{ color: "#f5a623" }}
                >
                  {stat.value}
                </span>
                <span className="text-white/80 font-body text-sm text-center">
                  {stat.label}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoursesOverview() {
  return (
    <section
      className="section-light py-20 px-4 sm:px-6 lg:px-8"
      id="courses-overview"
    >
      <div className="container mx-auto">
        <FadeIn>
          <SectionHeading
            title="Course Overview"
            subtitle="Specialized coaching programs designed for every government exam aspirant"
          />
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURSE_CARDS.map((course, i) => {
            const Icon = course.icon;
            return (
              <FadeIn key={course.id} delay={i * 0.1} direction="up">
                <div
                  className="glass-card-light glass-hover rounded-2xl p-6 h-full flex flex-col"
                  data-ocid={`course-card-${course.id}`}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
                    style={{ background: `rgba(${course.colorRgb},0.15)` }}
                  >
                    <Icon
                      size={26}
                      style={{ color: `rgb(${course.colorRgb})` }}
                    />
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed flex-1">
                    {course.description}
                  </p>
                  <Link
                    to="/courses"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold font-body transition-smooth"
                    style={{ color: "#1e3a5f" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "#f5a623";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "#1e3a5f";
                    }}
                    data-ocid={`learn-more-${course.id}`}
                  >
                    Learn More →
                  </Link>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{
        background: "linear-gradient(135deg, #1e3a5f 0%, #0f2340 100%)",
      }}
      id="why-us"
    >
      <div className="container mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
              Why Choose Us
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto font-body">
              Everything you need to succeed in competitive government
              examinations
            </p>
            <div className="mt-4 mx-auto w-16 h-1 rounded-full gold-gradient" />
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CARDS.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.id} delay={i * 0.12} direction="up">
                <div
                  className="glass-card glass-hover rounded-2xl p-6 text-center"
                  data-ocid={`why-card-${item.id}`}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(245,166,35,0.18)" }}
                  >
                    <Icon size={26} style={{ color: "#f5a623" }} />
                  </div>
                  <h3 className="text-lg font-display font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/65 font-body text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    const timer = setInterval(() => emblaApi.scrollNext(), 4500);
    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(timer);
    };
  }, [emblaApi]);

  return (
    <section
      className="section-muted py-20 px-4 sm:px-6 lg:px-8"
      id="testimonials-home"
    >
      <div className="container mx-auto">
        <FadeIn>
          <SectionHeading
            title="Student Success Stories"
            subtitle="Hear from our students who cracked the toughest competitive exams"
          />
        </FadeIn>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.id}
                  className="flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  data-ocid={`testimonial-card-${t.id}`}
                >
                  <div className="glass-card-light rounded-2xl p-6 h-full flex flex-col">
                    <div className="flex gap-0.5 mb-3">
                      {["s1", "s2", "s3", "s4", "s5"].map((sk) => (
                        <Star
                          key={sk}
                          size={14}
                          fill="#f5a623"
                          color="#f5a623"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed flex-1 mb-5 italic">
                      "{t.quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 font-display"
                        style={{ background: "#1e3a5f", color: "#f5a623" }}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm font-body">
                          {t.name}
                        </p>
                        <p
                          className="text-xs font-body"
                          style={{ color: "#f5a623" }}
                        >
                          {t.exam} · {t.rank}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((t, i) => (
              <button
                type="button"
                key={t.id}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="transition-smooth rounded-full"
                style={{
                  width: i === selectedIndex ? "24px" : "8px",
                  height: "8px",
                  background:
                    i === selectedIndex ? "#f5a623" : "rgba(30,58,95,0.25)",
                }}
              />
            ))}
          </div>

          {/* Prev/Next buttons */}
          <div className="flex justify-center gap-3 mt-4">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous testimonial"
              data-ocid="testimonial-prev"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-smooth"
              style={{
                background: "rgba(30,58,95,0.1)",
                border: "1px solid rgba(30,58,95,0.2)",
                color: "#1e3a5f",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "#1e3a5f";
                el.style.color = "#f5a623";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "rgba(30,58,95,0.1)";
                el.style.color = "#1e3a5f";
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next testimonial"
              data-ocid="testimonial-next"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-smooth"
              style={{
                background: "rgba(30,58,95,0.1)",
                border: "1px solid rgba(30,58,95,0.2)",
                color: "#1e3a5f",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "#1e3a5f";
                el.style.color = "#f5a623";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "rgba(30,58,95,0.1)";
                el.style.color = "#1e3a5f";
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <FadeIn direction="up" delay={0.2}>
          <div className="text-center mt-10">
            <Link
              to="/testimonials"
              data-ocid="view-all-testimonials"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold font-body transition-smooth"
              style={{
                background: "rgba(30,58,95,0.08)",
                border: "1.5px solid rgba(30,58,95,0.25)",
                color: "#1e3a5f",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#1e3a5f";
                el.style.color = "#f5a623";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(30,58,95,0.08)";
                el.style.color = "#1e3a5f";
              }}
            >
              View All Success Stories →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function EnquiryCTA() {
  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{
        background: "linear-gradient(135deg, #f5a623 0%, #e8941a 100%)",
      }}
    >
      <div className="container mx-auto text-center">
        <FadeIn>
          <h2
            className="text-3xl md:text-4xl font-display font-bold mb-4"
            style={{ color: "#1e3a5f" }}
          >
            Ready to Start Your Journey?
          </h2>
          <p
            className="text-lg font-body mb-8 max-w-xl mx-auto"
            style={{ color: "rgba(30,58,95,0.8)" }}
          >
            Take the first step toward your dream government job. Enroll today
            and join 5000+ successful students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/enquiry"
              data-ocid="cta-enroll-now"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg font-body transition-smooth"
              style={{ background: "#1e3a5f", color: "#ffffff" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#0f2340";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#1e3a5f";
                el.style.transform = "translateY(0)";
              }}
            >
              Enroll Now
            </Link>
            <Link
              to="/courses"
              data-ocid="cta-explore-courses"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg font-body transition-smooth"
              style={{
                background: "transparent",
                border: "2px solid #1e3a5f",
                color: "#1e3a5f",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#1e3a5f";
                el.style.color = "#f5a623";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "transparent";
                el.style.color = "#1e3a5f";
              }}
            >
              Explore Courses
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Page export ──────────────────────────────────────────────────────────────

export default function Home() {
  // COURSES from types.ts — used in Enquiry page dropdown; imported here to verify contract availability
  void COURSES;

  return (
    <div className="min-w-0">
      <HeroSection />
      <StatsBar />
      <CoursesOverview />
      <WhyChooseUs />
      <TestimonialsCarousel />
      <EnquiryCTA />
    </div>
  );
}
