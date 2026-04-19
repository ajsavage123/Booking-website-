"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  HeartPulse,
  LogOut,
  RefreshCw,
  Search,
  Calendar,
  Clock,
  User,
  Phone,
  ChevronDown,
  LayoutDashboard,
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  FileText,
} from "lucide-react";
import { Booking, BookingStatus } from "@/types";
import { format } from "date-fns";
import { SERVICES, formatTime } from "@/lib/constants";

const STATUS_OPTIONS: BookingStatus[] = ["pending", "confirmed", "cancelled"];

function StatusBadge({ status }: { status: BookingStatus }) {
  const config = {
    pending: {
      cls: "badge-pending",
      icon: AlertCircle,
      label: "Pending",
    },
    confirmed: {
      cls: "badge-confirmed",
      icon: CheckCircle2,
      label: "Confirmed",
    },
    cancelled: {
      cls: "badge-cancelled",
      icon: XCircle,
      label: "Cancelled",
    },
  };
  const { cls, icon: Icon, label } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${cls}`}
    >
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBookings = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const params = new URLSearchParams();
      if (filterDate) params.set("date", filterDate);
      if (filterStatus !== "all") params.set("status", filterStatus);

      const res = await fetch(`/api/bookings?${params.toString()}`);
      if (res.status === 401) {
        router.push("/admin");
        return;
      }
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch {
      console.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [filterDate, filterStatus, router]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  async function updateStatus(id: string, status: BookingStatus) {
    setUpdatingId(id);
    try {
      await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } catch {
      console.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  const filtered = bookings.filter((b) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.phone.includes(q) ||
      b.service.toLowerCase().includes(q)
    );
  });

  // Stats
  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    pending: bookings.filter((b) => b.status === "pending").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  const today = format(new Date(), "yyyy-MM-dd");
  const todayCount = bookings.filter((b) => b.date === today).length;

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      {/* Sidebar + Main layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-60 min-h-screen bg-slate-900 text-white fixed left-0 top-0">
          <div className="p-5 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
                <HeartPulse className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold">MediCare</p>
                <p className="text-slate-400 text-xs">Admin Panel</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <div className="flex items-center gap-2.5 px-3 py-2.5 bg-teal-600/20 text-teal-400 rounded-lg text-sm font-medium">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-sm font-medium cursor-pointer transition-colors">
              <Calendar className="w-4 h-4" />
              Appointments
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-sm font-medium cursor-pointer transition-colors">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-sm font-medium cursor-pointer transition-colors">
              <FileText className="w-4 h-4" />
              Reports
            </div>
          </nav>

          <div className="p-4 border-t border-slate-800">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-3 py-2.5 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 lg:ml-60">
          {/* Top bar */}
          <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="font-display text-xl font-semibold text-slate-900">
                Appointments
              </h1>
              <p className="text-slate-400 text-xs mt-0.5">
                Manage all clinic bookings
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchBookings(true)}
                className={`p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors ${
                  refreshing ? "animate-spin" : ""
                }`}
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={handleLogout}
                className="lg:hidden flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-500 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
          </header>

          <div className="p-4 sm:p-6">
            {/* Stats cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                {
                  label: "Total Bookings",
                  value: stats.total,
                  color: "bg-slate-900 text-white",
                  sub: "All time",
                },
                {
                  label: "Today",
                  value: todayCount,
                  color: "bg-teal-600 text-white",
                  sub: format(new Date(), "MMM d"),
                },
                {
                  label: "Confirmed",
                  value: stats.confirmed,
                  color: "bg-white text-emerald-700 border border-emerald-200",
                  sub: "Appointments",
                },
                {
                  label: "Pending",
                  value: stats.pending,
                  color: "bg-white text-amber-700 border border-amber-200",
                  sub: "Awaiting confirm",
                },
              ].map(({ label, value, color, sub }) => (
                <div
                  key={label}
                  className={`rounded-xl p-4 shadow-sm ${color}`}
                >
                  <p
                    className={`text-xs font-medium opacity-70 mb-1 ${
                      color.includes("text-white") ? "" : ""
                    }`}
                  >
                    {label}
                  </p>
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="text-xs opacity-60 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, phone, service..."
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                />
                <div className="relative">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 bg-white cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-6 h-6 text-teal-500 animate-spin mr-2" />
                  <span className="text-slate-500 text-sm">
                    Loading bookings...
                  </span>
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <Calendar className="w-10 h-10 mb-3 opacity-40" />
                  <p className="font-medium text-sm">No bookings found</p>
                  <p className="text-xs mt-1">
                    {searchQuery || filterDate || filterStatus !== "all"
                      ? "Try adjusting your filters"
                      : "Bookings will appear here once patients book appointments"}
                  </p>
                </div>
              ) : (
                <>
                  {/* Desktop table */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          {[
                            "Patient",
                            "Service",
                            "Date & Time",
                            "Phone",
                            "Status",
                            "Actions",
                          ].map((h) => (
                            <th
                              key={h}
                              className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filtered.map((booking) => (
                          <tr
                            key={booking.id}
                            className="table-row-hover transition-colors"
                          >
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0">
                                  <span className="text-white text-xs font-bold">
                                    {booking.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-slate-800">
                                    {booking.name}
                                  </p>
                                  <p className="text-xs text-slate-400">
                                    #{booking.id.slice(0, 8).toUpperCase()}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="text-sm text-slate-700 font-medium">
                                {SERVICES.find(
                                  (s) => s.id === booking.service
                                )?.name || booking.service}
                              </span>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-1 text-sm text-slate-600">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                {format(
                                  new Date(booking.date + "T00:00:00"),
                                  "MMM d, yyyy"
                                )}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                                <Clock className="w-3 h-3" />
                                {formatTime(booking.time)}
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <a
                                href={`tel:${booking.phone}`}
                                className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-800 transition-colors"
                              >
                                <Phone className="w-3.5 h-3.5" />
                                {booking.phone}
                              </a>
                            </td>
                            <td className="px-4 py-3.5">
                              <StatusBadge status={booking.status} />
                            </td>
                            <td className="px-4 py-3.5">
                              {updatingId === booking.id ? (
                                <Loader2 className="w-4 h-4 text-teal-500 animate-spin" />
                              ) : (
                                <div className="flex items-center gap-1.5">
                                  {booking.status !== "confirmed" && (
                                    <button
                                      onClick={() =>
                                        updateStatus(
                                          booking.id,
                                          "confirmed"
                                        )
                                      }
                                      className="text-xs px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium transition-colors border border-emerald-200"
                                    >
                                      Confirm
                                    </button>
                                  )}
                                  {booking.status !== "cancelled" && (
                                    <button
                                      onClick={() =>
                                        updateStatus(
                                          booking.id,
                                          "cancelled"
                                        )
                                      }
                                      className="text-xs px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-medium transition-colors border border-rose-200"
                                    >
                                      Cancel
                                    </button>
                                  )}
                                  {booking.status !== "pending" && (
                                    <button
                                      onClick={() =>
                                        updateStatus(booking.id, "pending")
                                      }
                                      className="text-xs px-2.5 py-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 font-medium transition-colors border border-amber-200"
                                    >
                                      Pending
                                    </button>
                                  )}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile cards */}
                  <div className="md:hidden divide-y divide-slate-100">
                    {filtered.map((booking) => (
                      <div key={booking.id} className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                              <span className="text-white text-sm font-bold">
                                {booking.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-slate-800 text-sm">
                                {booking.name}
                              </p>
                              <p className="text-xs text-slate-400">
                                #{booking.id.slice(0, 8).toUpperCase()}
                              </p>
                            </div>
                          </div>
                          <StatusBadge status={booking.status} />
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-3 text-xs text-slate-600">
                          <div className="flex items-center gap-1.5">
                            <HeartPulse className="w-3 h-3 text-teal-500" />
                            {SERVICES.find((s) => s.id === booking.service)
                              ?.name || booking.service}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3 h-3 text-slate-400" />
                            {booking.phone}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {format(
                              new Date(booking.date + "T00:00:00"),
                              "MMM d, yyyy"
                            )}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {formatTime(booking.time)}
                          </div>
                        </div>

                        {updatingId === booking.id ? (
                          <div className="flex justify-center py-2">
                            <Loader2 className="w-4 h-4 text-teal-500 animate-spin" />
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            {booking.status !== "confirmed" && (
                              <button
                                onClick={() =>
                                  updateStatus(booking.id, "confirmed")
                                }
                                className="flex-1 text-xs py-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium border border-emerald-200 transition-colors"
                              >
                                Confirm
                              </button>
                            )}
                            {booking.status !== "cancelled" && (
                              <button
                                onClick={() =>
                                  updateStatus(booking.id, "cancelled")
                                }
                                className="flex-1 text-xs py-2 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-medium border border-rose-200 transition-colors"
                              >
                                Cancel
                              </button>
                            )}
                            {booking.status !== "pending" && (
                              <button
                                onClick={() =>
                                  updateStatus(booking.id, "pending")
                                }
                                className="flex-1 text-xs py-2 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 font-medium border border-amber-200 transition-colors"
                              >
                                Pending
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 text-xs text-slate-400">
                    Showing {filtered.length} of {bookings.length} bookings
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
