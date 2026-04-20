import { useEnquiries, useEnquiryCount } from "@/hooks/useQueries";
import type { Enquiry } from "@/types";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  LogOut,
  ShieldCheck,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const ADMIN_PASSWORD = "admin123";

// ── Admin Login ───────────────────────────────────────────────────────────────

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
    }
  }

  return (
    <div className="hero-bg flex min-h-screen items-center justify-center px-4 py-16">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 60%, rgba(245,166,35,0.35) 0%, transparent 50%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`relative z-10 w-full max-w-md ${shaking ? "animate-[shake_0.5s_ease-in-out]" : ""}`}
      >
        <div className="glass-card rounded-2xl p-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400/20">
            <Lock className="h-8 w-8 text-yellow-300" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">
            Admin Portal
          </h1>
          <p className="mt-1 text-sm text-white/60">
            Sri Sri Institute — Restricted Access
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
            <div>
              <label
                htmlFor="admin-password-input"
                className="mb-1.5 block text-sm font-semibold text-white/80"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password-input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder="Enter admin password"
                  data-ocid="admin-password"
                  className={[
                    "w-full rounded-xl border bg-white/10 px-4 py-3 pr-11 text-sm text-white placeholder:text-white/40",
                    "focus:outline-none focus:ring-2 focus:ring-offset-0 transition-smooth",
                    error
                      ? "border-red-400 focus:ring-red-400/50"
                      : "border-white/20 focus:ring-yellow-400/50",
                  ].join(" ")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 transition-smooth hover:text-white/80"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {error && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  Incorrect password. Please try again.
                </p>
              )}
            </div>

            <button
              type="submit"
              data-ocid="admin-login"
              className="gold-gradient mt-2 w-full rounded-xl py-3 font-bold text-white transition-smooth hover:scale-[1.02] hover:shadow-elevated"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </motion.div>

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%,60%  { transform: translateX(-8px); }
          40%,80%  { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
}

// ── Admin Dashboard ───────────────────────────────────────────────────────────

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { data: enquiries = [], isLoading } = useEnquiries();
  const { data: count = 0 } = useEnquiryCount();
  const [search, setSearch] = useState("");

  const filtered = enquiries.filter(
    (e) =>
      !search ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.course.toLowerCase().includes(search.toLowerCase()) ||
      e.city.toLowerCase().includes(search.toLowerCase()),
  );

  function formatDate(timestamp: bigint) {
    const ms = Number(timestamp) / 1_000_000; // nanoseconds → ms
    return new Date(ms).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-card shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-xs text-muted-foreground">Sri Sri Institute</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            data-ocid="admin-logout"
            className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:border-red-300 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              label: "Total Enquiries",
              value: count,
              icon: <Users className="h-6 w-6 text-primary" />,
              bg: "bg-primary/10",
            },
            {
              label: "Loaded Records",
              value: enquiries.length,
              icon: (
                <ShieldCheck className="h-6 w-6" style={{ color: "#f5a623" }} />
              ),
              bg: "bg-yellow-50",
            },
            {
              label: "Filtered Results",
              value: filtered.length,
              icon: <Eye className="h-6 w-6 text-green-600" />,
              bg: "bg-green-100",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
              className="glass-card-light rounded-2xl p-6"
              data-ocid={`admin-stat-${i}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 font-display text-4xl font-bold text-primary">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg}`}
                >
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search + Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="glass-card-light overflow-hidden rounded-2xl"
        >
          <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-lg font-bold text-foreground">
                Submitted Enquiries
              </h2>
              <p className="text-xs text-muted-foreground">
                All student enquiry records
              </p>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, course…"
              data-ocid="admin-search"
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50 sm:w-72"
            />
          </div>

          {isLoading ? (
            <div className="space-y-3 p-6">
              {["s1", "s2", "s3", "s4", "s5"].map((sk) => (
                <div
                  key={sk}
                  className="h-12 animate-pulse rounded-xl bg-muted"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center" data-ocid="admin-empty">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                <Users className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground">
                No enquiries found
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {search
                  ? "Try adjusting your search."
                  : "Submissions will appear here."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    {[
                      "ID",
                      "Name",
                      "Phone",
                      "Email",
                      "Course",
                      "City",
                      "Date",
                    ].map((h) => (
                      <th
                        key={h}
                        className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((enquiry: Enquiry, idx) => (
                    <motion.tr
                      key={enquiry.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: idx * 0.03,
                        ease: "easeOut",
                      }}
                      data-ocid={`admin-row-${enquiry.id}`}
                      className="border-b border-border/60 transition-smooth hover:bg-muted/30"
                    >
                      <td className="px-4 py-3.5 font-mono text-xs text-muted-foreground">
                        #{enquiry.id}
                      </td>
                      <td className="px-4 py-3.5 font-medium text-foreground">
                        {enquiry.name}
                      </td>
                      <td className="px-4 py-3.5 text-muted-foreground">
                        {enquiry.phone}
                      </td>
                      <td className="max-w-[180px] truncate px-4 py-3.5 text-muted-foreground">
                        {enquiry.email}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          {enquiry.course.split("–")[0].trim()}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-muted-foreground">
                        {enquiry.city}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-muted-foreground">
                        {formatDate(enquiry.timestamp)}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}

// ── Admin Page (route component) ──────────────────────────────────────────────

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />;
}
