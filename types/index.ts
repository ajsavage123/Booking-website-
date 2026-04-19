export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface Service {
  id: string;
  name: string;
  duration: number;
  description?: string;
  icon?: string;
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: BookingStatus;
  notes?: string;
  created_at: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingFormData {
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  notes: string;
}
