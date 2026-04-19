import { Link, useSearch } from "wouter";
import { CheckCircle2, HeartPulse, Calendar, Clock, User, Phone, MessageCircle, ArrowLeft, Share2 } from "lucide-react";
import { generateWhatsAppLink, formatDate } from "../lib/utils";
import { SERVICES, formatTime } from "../lib/constants";

export default function ConfirmationPage() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const name = params.get("name") || "";
  const service = params.get("service") || "";
  const date = params.get("date") || "";
  const time = params.get("time") || "";
  const phone = params.get("phone") || "";
  const id = params.get("id") || "";

  const serviceName = SERVICES.find(s => s.id === service)?.name || service;
  const whatsappLink = generateWhatsAppLink(phone, name, serviceName, date ? formatDate(date) : date, formatTime(time));
  const bookingRef = id ? id.slice(0, 8).toUpperCase() : Math.random().toString(36).substring(2, 10).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50/50 flex flex-col">
      <header className="bg-white border-b border-teal-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
              <HeartPulse className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display text-lg font-semibold text-slate-800">MediCare Clinic</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md animate-scale-in">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-700 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-200">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-display text-3xl font-semibold text-slate-900 mb-1">Booking Confirmed!</h1>
            <p className="text-slate-500 text-sm">Your appointment has been successfully scheduled</p>
          </div>

          <div className="bg-teal-600 rounded-2xl p-4 text-center mb-4">
            <p className="text-teal-200 text-xs font-semibold uppercase tracking-wider mb-1">Booking Reference</p>
            <p className="text-white font-mono text-2xl font-bold tracking-wider">#{bookingRef}</p>
            <p className="text-teal-200 text-xs mt-1">Save this for your records</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-teal-100 p-5 mb-4">
            <h3 className="font-semibold text-slate-700 text-sm mb-4 flex items-center gap-2">
              <span className="w-4 h-4 bg-teal-100 rounded flex items-center justify-center">
                <CheckCircle2 className="w-2.5 h-2.5 text-teal-600" />
              </span>
              Appointment Details
            </h3>
            <div className="space-y-3">
              {[
                { icon: HeartPulse, label: "Service", value: serviceName, color: "text-teal-600 bg-teal-50" },
                { icon: Calendar, label: "Date", value: date ? formatDate(date) : "—", color: "text-blue-600 bg-blue-50" },
                { icon: Clock, label: "Time", value: formatTime(time), color: "text-violet-600 bg-violet-50" },
                { icon: User, label: "Patient", value: name, color: "text-slate-600 bg-slate-50" },
                { icon: Phone, label: "Phone", value: phone, color: "text-emerald-600 bg-emerald-50" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 leading-none mb-0.5">{label}</p>
                    <p className="text-sm font-semibold text-slate-800">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <p className="text-amber-700 text-sm font-medium">Status: Pending Confirmation</p>
          </div>

          <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1fb956] text-white font-semibold py-4 rounded-xl transition-colors shadow-md mb-3">
            <MessageCircle className="w-5 h-5" /> Confirm via WhatsApp
          </a>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <button onClick={() => navigator.share?.({ title: "My Appointment", text: `I've booked a ${serviceName} at MediCare Clinic` })}
              className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 rounded-xl text-sm transition-colors">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <Link href="/book" className="flex items-center justify-center gap-2 bg-teal-50 hover:bg-teal-100 text-teal-700 font-medium py-3 rounded-xl text-sm transition-colors">
              Book Another
            </Link>
          </div>

          <Link href="/" className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-slate-700 text-sm font-medium py-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <p className="text-center text-xs text-slate-400 mt-5 leading-relaxed">
            Please send us a WhatsApp message to confirm your appointment.<br />
            We'll contact you if any changes are needed.
          </p>
        </div>
      </div>
    </div>
  );
}
