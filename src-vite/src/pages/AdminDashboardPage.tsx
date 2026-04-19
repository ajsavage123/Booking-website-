import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { HeartPulse, LogOut, Search, Filter, Trash2, CheckCircle, XCircle, Clock, Users, Calendar, RefreshCw } from "lucide-react";
import { getBookings, updateBookingStatus, deleteBooking } from "../store/bookings";
import { Booking, BookingStatus } from "../types";
import { SERVICES, formatTime } from "../lib/constants";
import { formatDate } from "../lib/utils";

export default function AdminDashboardPage() {
  const [, navigate] = useLocation();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | BookingStatus>("all");

  useEffect(() => {
    if (!sessionStorage.getItem("admin_auth")) { navigate("/admin"); return; }
    setBookings(getBookings());
  }, [navigate]);

  function refresh() { setBookings(getBookings()); }

  function handleStatus(id: string, status: BookingStatus) {
    updateBookingStatus(id, status);
    refresh();
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this booking?")) return;
    deleteBooking(id);
    refresh();
  }

  function handleLogout() {
    sessionStorage.removeItem("admin_auth");
    navigate("/admin");
  }

  const filtered = bookings.filter(b => {
    const matchSearch = !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.phone.includes(search);
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = { total: bookings.length, pending: bookings.filter(b => b.status === "pending").length, confirmed: bookings.filter(b => b.status === "confirmed").length, cancelled: bookings.filter(b => b.status === "cancelled").length };

  const serviceName = (id: string) => SERVICES.find(s => s.id === id)?.name || id;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
              <HeartPulse className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-lg font-semibold text-slate-800">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-slate-500 hover:text-teal-600 transition-colors hidden sm:block">View Site</Link>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Bookings", value: counts.total, icon: Calendar, color: "text-slate-600 bg-slate-100" },
            { label: "Pending", value: counts.pending, icon: Clock, color: "text-amber-600 bg-amber-50" },
            { label: "Confirmed", value: counts.confirmed, icon: CheckCircle, color: "text-green-600 bg-green-50" },
            { label: "Cancelled", value: counts.cancelled, icon: XCircle, color: "text-rose-600 bg-rose-50" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center mb-3`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-2xl font-bold text-slate-800">{value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or phone..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as typeof statusFilter)}
                className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-400 bg-white">
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button onClick={refresh} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-700">{filtered.length} booking{filtered.length !== 1 ? "s" : ""}</span>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">No bookings found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {["Patient", "Service", "Date & Time", "Status", "Actions"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map(b => (
                    <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3.5">
                        <p className="font-semibold text-slate-800">{b.name}</p>
                        <p className="text-slate-400 text-xs">{b.phone}</p>
                        {b.notes && <p className="text-slate-400 text-xs italic mt-0.5 truncate max-w-[150px]">{b.notes}</p>}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-slate-700">{serviceName(b.service)}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="text-slate-700">{formatDate(b.date)}</p>
                        <p className="text-slate-400 text-xs">{formatTime(b.time)}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${b.status === "pending" ? "badge-pending" : b.status === "confirmed" ? "badge-confirmed" : "badge-cancelled"}`}>
                          {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          {b.status !== "confirmed" && (
                            <button onClick={() => handleStatus(b.id, "confirmed")} title="Confirm"
                              className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                              <CheckCircle className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {b.status !== "cancelled" && (
                            <button onClick={() => handleStatus(b.id, "cancelled")} title="Cancel"
                              className="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors">
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button onClick={() => handleDelete(b.id)} title="Delete"
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
