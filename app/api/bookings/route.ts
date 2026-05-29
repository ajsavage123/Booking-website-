import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { mockDb } from "@/lib/mock-db";

// GET /api/bookings — list bookings (admin only)
export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const adminSession = cookieStore.get("admin_session");

  if (!adminSession || adminSession.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const status = searchParams.get("status");

  try {
    const data = await mockDb.getBookings({ date, status });
    // Sort by date and time
    data.sort((a, b) => {
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        return a.time.localeCompare(b.time);
    });
    return NextResponse.json({ bookings: data || [] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/bookings — create a new booking
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { service, date, time, name, phone, notes } = body;

    // Validation
    if (!service || !date || !time || !name || !phone) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate phone
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 9 || cleanPhone.length > 15) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    // Validate date is not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookingDate = new Date(date + "T00:00:00");
    if (bookingDate < today) {
      return NextResponse.json(
        { error: "Cannot book appointments in the past" },
        { status: 400 }
      );
    }

    // Check for double booking — same date + time slot already booked (not cancelled)
    const existingSlots = await mockDb.getBookedSlots(date, service);
    if (existingSlots.includes(time)) {
      return NextResponse.json(
        {
          error:
            "This time slot is already booked. Please choose a different time.",
        },
        { status: 409 }
      );
    }

    // Insert booking
    const data = await mockDb.createBooking({
        name: name.trim(),
        phone: cleanPhone,
        service,
        date,
        time,
        notes: notes?.trim() || null,
    });

    return NextResponse.json({ success: true, id: data.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
