import { Booking, BookingStatus } from "../types";

let bookings: Booking[] = [
  {
    id: "demo-001",
    name: "Sarah Mitchell",
    phone: "0123456789",
    service: "general-checkup",
    date: "2026-04-22",
    time: "09:00",
    status: "confirmed",
    notes: "",
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-002",
    name: "Ahmad Rashid",
    phone: "0198765432",
    service: "consultation",
    date: "2026-04-22",
    time: "10:30",
    status: "pending",
    notes: "Follow up on medication",
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-003",
    name: "Priya Sharma",
    phone: "0112233445",
    service: "dental",
    date: "2026-04-23",
    time: "14:00",
    status: "pending",
    notes: "",
    created_at: new Date().toISOString(),
  },
];

export function getBookings(): Booking[] {
  return [...bookings];
}

export function getBookedSlots(date: string, service: string): string[] {
  return bookings
    .filter(
      (b) =>
        b.date === date &&
        b.service === service &&
        b.status !== "cancelled"
    )
    .map((b) => b.time);
}

export function createBooking(data: Omit<Booking, "id" | "status" | "created_at">): Booking {
  const booking: Booking = {
    ...data,
    id: Math.random().toString(36).substring(2, 10),
    status: "pending",
    created_at: new Date().toISOString(),
  };
  bookings.push(booking);
  return booking;
}

export function updateBookingStatus(id: string, status: BookingStatus): Booking | null {
  const idx = bookings.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  bookings[idx] = { ...bookings[idx], status };
  return bookings[idx];
}

export function deleteBooking(id: string): boolean {
  const idx = bookings.findIndex((b) => b.id === id);
  if (idx === -1) return false;
  bookings.splice(idx, 1);
  return true;
}
