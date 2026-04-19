import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ChevronLeft, ChevronRight, HeartPulse, Calendar, Clock, User, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { format, isBefore, startOfDay } from "date-fns";
import { SERVICES, ALL_TIME_SLOTS, formatTime } from "../lib/constants";
import { validatePhone } from "../lib/utils";
import { getBookedSlots, createBooking } from "../store/bookings";
import { BookingFormData } from "../types";

type Step = 1 | 2 | 3 | 4;
const STEP_LABELS = [
  { n: 1, label: "Service", icon: HeartPulse },
  { n: 2, label: "Date", icon: Calendar },
  { n: 3, label: "Time", icon: Clock },
  { n: 4, label: "Details", icon: User },
];

const init: BookingFormData = { service: "", date: "", time: "", name: "", phone: "", notes: "" };

export default function BookPage() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<BookingFormData>(init);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});

  useEffect(() => {
    if (form.date && form.service) {
      setLoadingSlots(true);
      setTimeout(() => {
        setBookedSlots(getBookedSlots(form.date, form.service));
        setLoadingSlots(false);
      }, 300);
    }
  }, [form.date, form.service]);

  function validateStep4() {
    const e: Partial<BookingFormData> = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Please enter your full name";
    if (!validatePhone(form.phone)) e.phone = "Please enter a valid phone number";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (step === 4) { if (!validateStep4()) return; handleSubmit(); return; }
    setStep(s => (s + 1) as Step);
  }

  function handleBack() {
    if (step === 1) return;
    setStep(s => (s - 1) as Step);
    setError("");
  }

  function handleSubmit() {
    setSubmitting(true);
    setTimeout(() => {
      const booking = createBooking({ name: form.name, phone: form.phone, service: form.service, date: form.date, time: form.time, notes: form.notes });
      const p = new URLSearchParams({ name: form.name, service: form.service, date: form.date, time: form.time, phone: form.phone, id: booking.id });
      navigate(`/confirmation?${p.toString()}`);
    }, 600);
  }

  const canProceed = () => {
    if (step === 1) return !!form.service;
    if (step === 2) return !!form.date;
    if (step === 3) return !!form.time;
    if (step === 4) return !!form.name && !!form.phone;
    return false;
  };

  const selectedService = SERVICES.find(s => s.id === form.service);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50/50 via-white to-teal-50/30">
      <header className="bg-white border-b border-teal-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors">
            <ChevronLeft className="w-4 h-4" /><span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
              <HeartPulse className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display text-lg font-semibold text-slate-800">Book Appointment</span>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-10">
          {STEP_LABELS.map(({ n, label, icon: Icon }, i) => (
            <div key={n} className="flex items-center">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => n < step && setStep(n as Step)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${step === n ? "bg-teal-600 text-white shadow-md scale-110" : step > n ? "bg-teal-100 text-teal-600 cursor-pointer hover:bg-teal-200" : "bg-slate-100 text-slate-400"}`}
                >
                  {step > n ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                </button>
                <span className={`text-xs font-medium mt-1.5 hidden sm:block ${step === n ? "text-teal-600" : "text-slate-400"}`}>{label}</span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div className={`h-0.5 w-12 sm:w-16 mx-1 sm:mx-2 rounded transition-colors ${step > n ? "bg-teal-400" : "bg-slate-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-teal-100/60 overflow-hidden animate-scale-in">
          {/* Step 1 */}
          {step === 1 && (
            <div className="p-6 md:p-8">
              <h2 className="font-display text-2xl font-semibold text-slate-900 mb-1">Select a Service</h2>
              <p className="text-slate-500 text-sm mb-6">What type of appointment do you need?</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map(s => (
                  <button key={s.id} onClick={() => setForm(f => ({ ...f, service: s.id, time: "" }))}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${form.service === s.id ? "border-teal-500 bg-teal-50 shadow-sm" : "border-slate-200 hover:border-teal-200 hover:bg-slate-50"}`}>
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-semibold text-slate-800 text-sm">{s.name}</p>
                      {form.service === s.id && <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed mb-2">{s.description}</p>
                    <span className="text-xs text-teal-600 font-medium flex items-center gap-1"><Clock className="w-3 h-3" /> {s.duration} min</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="p-6 md:p-8">
              <h2 className="font-display text-2xl font-semibold text-slate-900 mb-1">Choose a Date</h2>
              <p className="text-slate-500 text-sm mb-6">Select your preferred appointment date</p>
              {selectedService && (
                <div className="flex items-center gap-2 bg-teal-50 text-teal-700 text-sm px-3 py-2 rounded-lg mb-6 border border-teal-200">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span><strong>{selectedService.name}</strong> — {selectedService.duration} minutes</span>
                </div>
              )}
              <div className="flex justify-center">
                <DayPicker
                  mode="single"
                  selected={selectedDay}
                  onSelect={(day) => {
                    setSelectedDay(day);
                    if (day) setForm(f => ({ ...f, date: format(day, "yyyy-MM-dd"), time: "" }));
                  }}
                  disabled={(date) => isBefore(date, startOfDay(new Date())) || date.getDay() === 0}
                  fromDate={new Date()}
                />
              </div>
              {form.date && (
                <div className="mt-4 p-3 bg-teal-50 rounded-xl border border-teal-200 text-center">
                  <p className="text-teal-700 text-sm font-medium">
                    Selected: {format(new Date(form.date + "T00:00:00"), "EEEE, MMMM d, yyyy")}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="p-6 md:p-8">
              <h2 className="font-display text-2xl font-semibold text-slate-900 mb-1">Pick a Time Slot</h2>
              <p className="text-slate-500 text-sm mb-6">
                Available slots for {form.date && format(new Date(form.date + "T00:00:00"), "EEEE, MMM d")}
              </p>
              {loadingSlots ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="w-6 h-6 text-teal-500 animate-spin" />
                  <span className="ml-2 text-slate-500 text-sm">Checking availability...</span>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                    {ALL_TIME_SLOTS.map(slot => {
                      const isBooked = bookedSlots.includes(slot);
                      const isSelected = form.time === slot;
                      return (
                        <button key={slot} onClick={() => !isBooked && setForm(f => ({ ...f, time: slot }))} disabled={isBooked}
                          className={`py-3 px-2 rounded-xl text-sm font-medium transition-all ${isSelected ? "bg-teal-600 text-white shadow-md scale-105" : isBooked ? "bg-slate-100 text-slate-400 cursor-not-allowed line-through" : "bg-slate-50 text-slate-700 border border-slate-200 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700"}`}>
                          {formatTime(slot)}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-teal-600 inline-block" /> Selected</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-50 border border-slate-200 inline-block" /> Available</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-100 inline-block" /> Booked</span>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div className="p-6 md:p-8">
              <h2 className="font-display text-2xl font-semibold text-slate-900 mb-1">Your Details</h2>
              <p className="text-slate-500 text-sm mb-6">Almost done! Please confirm your information.</p>
              <div className="bg-gradient-to-br from-teal-50 to-teal-100/30 border border-teal-200 rounded-xl p-4 mb-6">
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-3">Booking Summary</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Service", value: SERVICES.find(s => s.id === form.service)?.name || form.service },
                    { label: "Date", value: form.date ? format(new Date(form.date + "T00:00:00"), "MMM d, yyyy") : "" },
                    { label: "Time", value: formatTime(form.time) },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs text-teal-600 mb-0.5">{label}</p>
                      <p className="text-sm font-semibold text-slate-800">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name <span className="text-rose-500">*</span></label>
                  <input type="text" value={form.name} onChange={e => { setForm(f => ({ ...f, name: e.target.value })); if (errors.name) setErrors(e => ({ ...e, name: "" })); }}
                    placeholder="e.g. John Smith"
                    className={`input-ring w-full px-4 py-3 rounded-xl border text-sm bg-slate-50 focus:bg-white transition-colors ${errors.name ? "border-rose-400" : "border-slate-200"}`} />
                  {errors.name && <p className="text-rose-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number <span className="text-rose-500">*</span></label>
                  <input type="tel" value={form.phone} onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); if (errors.phone) setErrors(e => ({ ...e, phone: "" })); }}
                    placeholder="e.g. 0123456789"
                    className={`input-ring w-full px-4 py-3 rounded-xl border text-sm bg-slate-50 focus:bg-white transition-colors ${errors.phone ? "border-rose-400" : "border-slate-200"}`} />
                  {errors.phone && <p className="text-rose-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Notes <span className="text-slate-400 font-normal">(optional)</span></label>
                  <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                    placeholder="Any symptoms, concerns, or special requests..." rows={3}
                    className="input-ring w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:bg-white resize-none transition-colors" />
                </div>
              </div>
              {error && (
                <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  <p className="text-rose-700 text-sm">{error}</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="px-6 md:px-8 pb-6 md:pb-8 flex items-center justify-between border-t border-slate-100 pt-5">
            <button onClick={handleBack} disabled={step === 1}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <div className="flex items-center gap-2">
              {STEP_LABELS.map(({ n }) => (
                <div key={n} className={`h-1.5 rounded-full transition-all ${n === step ? "w-6 bg-teal-500" : n < step ? "w-3 bg-teal-300" : "w-3 bg-slate-200"}`} />
              ))}
            </div>
            <button onClick={handleNext} disabled={!canProceed() || submitting}
              className="btn-brand text-white text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none">
              {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Booking...</> : step === 4 ? <><CheckCircle2 className="w-4 h-4" /> Confirm</> : <>Continue <ChevronRight className="w-4 h-4" /></>}
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400">
          {["Secure booking", "Free cancellation", "No credit card needed"].map(t => (
            <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
