import { Booking } from "@/types";
import fs from "fs/promises";
import path from "path";

const DB_FILE = path.join(process.cwd(), "mock-db.json");

async function readDb(): Promise<Booking[]> {
  try {
    const data = await fs.readFile(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

async function writeDb(bookings: Booking[]): Promise<void> {
  await fs.writeFile(DB_FILE, JSON.stringify(bookings, null, 2));
}

export const mockDb = {
  async getBookings({ date, status }: { date?: string | null; status?: string | null } = {}) {
    let bookings = await readDb();
    if (date) bookings = bookings.filter(b => b.date === date);
    if (status) bookings = bookings.filter(b => b.status === status);
    return bookings;
  },

  async createBooking(data: any) {
    const bookings = await readDb();
    const newBooking: Booking = {
      id: Math.random().toString(36).substring(2, 11),
      created_at: new Date().toISOString(),
      status: "pending",
      ...data
    };
    bookings.push(newBooking);
    await writeDb(bookings);
    return newBooking;
  },

  async getBookedSlots(date: string, service: string) {
    const bookings = await readDb();
    return bookings
      .filter(b => b.date === date && b.status !== 'cancelled')
      .map(b => b.time);
  },

  async updateBookingStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled') {
    const bookings = await readDb();
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      bookings[index].status = status;
      await writeDb(bookings);
      return bookings[index];
    }
    return null;
  },

  async deleteBooking(id: string) {
    const bookings = await readDb();
    const newBookings = bookings.filter(b => b.id !== id);
    if (newBookings.length !== bookings.length) {
      await writeDb(newBookings);
      return true;
    }
    return false;
  }
};
