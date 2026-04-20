export interface Enquiry {
  id: number;
  name: string;
  phone: string;
  email: string;
  course: string;
  city: string;
  message: string;
  timestamp: bigint;
}

export interface EnquiryFormData {
  name: string;
  phone: string;
  email: string;
  course: string;
  city: string;
  message: string;
}

export const COURSES = [
  "Banking – IBPS PO / SBI PO / Clerk / RBI",
  "SSC – CGL / CHSL / MTS / CPO",
  "Railways – RRB NTPC / Group D / ALP",
  "State Exams – PSC / State Police / State SSC",
  "Defence – NDA / CDS / AFCAT",
] as const;

export type CourseType = (typeof COURSES)[number];

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];
