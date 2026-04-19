import Link from "next/link";
import {
  HeartPulse,
  Stethoscope,
  MessageCircle,
  Activity,
  Smile,
  Shield,
  FlaskConical,
  Phone,
  MapPin,
  Clock,
  ChevronRight,
  CheckCircle2,
  Star,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { CLINIC_NAME } from "@/lib/utils";

const services = [
  {
    icon: Stethoscope,
    name: "General Checkup",
    desc: "Comprehensive health assessment and routine physical examination",
    duration: "30 min",
    color: "from-teal-50 to-teal-100/50",
    iconColor: "text-teal-600",
    iconBg: "bg-teal-100",
  },
  {
    icon: MessageCircle,
    name: "Consultation",
    desc: "One-on-one consultation for specific health concerns and follow-ups",
    duration: "20 min",
    color: "from-sky-50 to-sky-100/50",
    iconColor: "text-sky-600",
    iconBg: "bg-sky-100",
  },
  {
    icon: Activity,
    name: "Emergency Visit",
    desc: "Urgent care for sudden illness or injury requiring immediate attention",
    duration: "45 min",
    color: "from-rose-50 to-rose-100/50",
    iconColor: "text-rose-600",
    iconBg: "bg-rose-100",
  },
  {
    icon: Smile,
    name: "Dental Care",
    desc: "Dental examinations, cleaning, and oral health assessments",
    duration: "45 min",
    color: "from-amber-50 to-amber-100/50",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100",
  },
  {
    icon: Shield,
    name: "Vaccination",
    desc: "Scheduled immunizations and vaccine administration for all ages",
    duration: "15 min",
    color: "from-violet-50 to-violet-100/50",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100",
  },
  {
    icon: FlaskConical,
    name: "Lab Tests",
    desc: "Blood work, urine analysis, and other diagnostic testing services",
    duration: "20 min",
    color: "from-emerald-50 to-emerald-100/50",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
  },
];

const features = [
  "Book appointments 24/7 online",
  "Instant confirmation via WhatsApp",
  "No waiting on the phone",
  "Easy rescheduling",
  "Qualified, experienced doctors",
  "Private & confidential",
];

const testimonials = [
  {
    name: "Sarah M.",
    text: "Booked my appointment in under a minute! The process was so smooth.",
    rating: 5,
  },
  {
    name: "Ahmad R.",
    text: "Finally a clinic with online booking. Saved me so much time.",
    rating: 5,
  },
  {
    name: "Priya K.",
    text: "Very professional service. Will definitely book again.",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-mesh-light" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-teal-200 rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-10 right-40 w-64 h-64 bg-teal-300 rounded-full blur-3xl opacity-30" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle, #0d9488 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 animate-fade-up">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" />
                Now accepting online bookings
              </div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] text-slate-900 mb-6 animate-fade-up stagger-1">
                Your Health,
                <br />
                <span className="gradient-text italic">Our Priority</span>
              </h1>

              <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-md animate-fade-up stagger-2">
                Book your appointment at {CLINIC_NAME} in under 60 seconds.
                Expert care, zero waiting on the phone.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 animate-fade-up stagger-3">
                <Link
                  href="/book"
                  className="btn-brand text-white font-semibold px-7 py-4 rounded-xl text-center flex items-center justify-center gap-2 group"
                >
                  Book Appointment
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <a
                  href="#services"
                  className="bg-white border-2 border-teal-100 text-teal-700 font-semibold px-7 py-4 rounded-xl text-center hover:border-teal-300 hover:bg-teal-50 transition-all"
                >
                  View Services
                </a>
              </div>

              {/* Feature pills */}
              <div className="mt-8 flex flex-wrap gap-2 animate-fade-up stagger-4">
                {["Available 24/7", "Free Parking", "Certified Doctors"].map(
                  (f) => (
                    <span
                      key={f}
                      className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full"
                    >
                      <CheckCircle2 className="w-3 h-3 text-teal-500" />
                      {f}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Hero Card */}
            <div className="hidden lg:flex justify-end animate-fade-up stagger-2">
              <div className="relative">
                {/* Main card */}
                <div className="bg-white rounded-3xl shadow-2xl border border-teal-100/50 p-8 w-80">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
                      <HeartPulse className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">
                        {CLINIC_NAME}
                      </p>
                      <p className="text-xs text-teal-600">
                        Next slot available
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {["General Checkup", "Consultation", "Emergency"].map(
                      (s, i) => (
                        <div
                          key={s}
                          className={`flex items-center justify-between p-3 rounded-xl ${
                            i === 0
                              ? "bg-teal-500 text-white"
                              : "bg-slate-50 text-slate-700"
                          }`}
                        >
                          <span className="text-sm font-medium">{s}</span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              i === 0
                                ? "bg-white/20 text-white"
                                : "bg-white text-teal-600 border border-teal-100"
                            }`}
                          >
                            Available
                          </span>
                        </div>
                      )
                    )}
                  </div>

                  <div className="bg-teal-50 rounded-xl p-3">
                    <p className="text-xs font-medium text-teal-800 mb-1">
                      Today's first slot
                    </p>
                    <p className="text-lg font-bold text-teal-700">
                      08:00 AM
                    </p>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg border border-teal-100 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700">
                      Confirmed!
                    </span>
                  </div>
                </div>

                {/* Stats badge */}
                <div className="absolute -bottom-4 -left-8 bg-white rounded-2xl shadow-lg border border-teal-100 px-4 py-3">
                  <p className="text-2xl font-bold text-teal-600">500+</p>
                  <p className="text-xs text-slate-500">Happy Patients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
            {[
              { n: "500+", l: "Patients Served" },
              { n: "6", l: "Services Available" },
              { n: "5★", l: "Average Rating" },
              { n: "24/7", l: "Online Booking" },
            ].map(({ n, l }) => (
              <div key={l}>
                <p className="font-display text-3xl md:text-4xl font-semibold">
                  {n}
                </p>
                <p className="text-teal-200 text-sm mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-teal-600 text-sm font-semibold uppercase tracking-widest">
              What We Offer
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-slate-900 mt-2 mb-4">
              Our Services
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              From routine checkups to urgent care, we provide comprehensive
              healthcare services for you and your family.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div
                key={s.name}
                className={`bg-gradient-to-br ${s.color} border border-white rounded-2xl p-6 card-hover cursor-pointer group`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div
                  className={`w-11 h-11 ${s.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <s.icon className={`w-5 h-5 ${s.iconColor}`} />
                </div>
                <h3 className="font-semibold text-slate-800 mb-1.5">
                  {s.name}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  {s.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {s.duration}
                  </span>
                  <Link
                    href="/book"
                    className={`text-xs font-semibold ${s.iconColor} flex items-center gap-1 hover:gap-1.5 transition-all`}
                  >
                    Book now <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/book"
              className="btn-brand text-white font-semibold px-8 py-4 rounded-xl inline-flex items-center gap-2"
            >
              Book Any Service <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About + Features Section */}
      <section
        id="about"
        className="py-20 md:py-28 bg-gradient-to-br from-slate-50 to-teal-50/30"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-teal-600 text-sm font-semibold uppercase tracking-widest">
                Why Choose Us
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-slate-900 mt-2 mb-5">
                Healthcare Made
                <br />
                <span className="gradient-text italic">Simple</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                We believe getting medical care should be easy. Our online
                booking system lets you schedule appointments from anywhere, at
                any time — no calls, no queues.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((f, i) => (
                  <div
                    key={f}
                    className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-teal-100/60 shadow-sm"
                  >
                    <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-teal-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Steps */}
            <div className="bg-white rounded-3xl shadow-xl border border-teal-100/50 p-8">
              <h3 className="font-display text-2xl font-semibold text-slate-800 mb-6">
                Book in 4 Easy Steps
              </h3>
              <div className="space-y-5">
                {[
                  {
                    step: "1",
                    title: "Choose a Service",
                    desc: "Select the type of care you need",
                  },
                  {
                    step: "2",
                    title: "Pick a Date",
                    desc: "Choose a date that works for you",
                  },
                  {
                    step: "3",
                    title: "Select a Time Slot",
                    desc: "See real-time available slots",
                  },
                  {
                    step: "4",
                    title: "Confirm Booking",
                    desc: "Enter your details and confirm",
                  },
                ].map(({ step, title, desc }) => (
                  <div key={step} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-white text-sm font-bold">
                        {step}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">
                        {title}
                      </p>
                      <p className="text-sm text-slate-500">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/book"
                className="btn-brand text-white font-semibold px-6 py-3.5 rounded-xl w-full flex items-center justify-center gap-2 mt-7"
              >
                Start Booking <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-teal-600 text-sm font-semibold uppercase tracking-widest">
              Testimonials
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-slate-900 mt-2">
              What Patients Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-teal-50 to-white border border-teal-100 rounded-2xl p-6 card-hover"
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="font-semibold text-slate-800 text-sm">
                  — {t.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">
            Ready to Book Your Visit?
          </h2>
          <p className="text-teal-100 text-lg mb-8">
            Don&apos;t wait. Book your appointment now in under 60 seconds.
          </p>
          <Link
            href="/book"
            className="bg-white text-teal-700 font-bold px-8 py-4 rounded-xl inline-flex items-center gap-2 hover:bg-teal-50 transition-colors shadow-lg"
          >
            Book Appointment Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className="bg-slate-900 text-white py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
                  <HeartPulse className="w-4 h-4 text-white" />
                </div>
                <span className="font-display text-xl font-semibold">
                  {CLINIC_NAME}
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Providing quality healthcare with compassion and expertise.
                Your health is our priority.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-4">
                Quick Links
              </h4>
              <div className="space-y-2">
                {[
                  { label: "Book Appointment", href: "/book" },
                  { label: "Services", href: "/#services" },
                  { label: "About Us", href: "/#about" },
                  { label: "Admin Login", href: "/admin" },
                ].map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="block text-sm text-slate-400 hover:text-teal-400 transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-4">
                Contact
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-400">
                    +60 12-345 6789
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-400">
                    123 Healthcare Ave, Kuala Lumpur, Malaysia
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-400">
                    Mon–Sat: 8:00 AM – 5:00 PM
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-slate-500 text-xs">
              © 2025 {CLINIC_NAME}. All rights reserved.
            </p>
            <Link
              href="/admin"
              className="text-slate-500 text-xs hover:text-teal-400 transition-colors"
            >
              Staff Login →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
