import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { cookies } from "next/headers";

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

  const supabase = createAdminClient();
  let query = supabase
    .from("bookings")
    .select("*")
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  if (date) query = query.eq("date", date);
  if (status) query = query.eq("status", status);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ bookings: data || [] });
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

    const supabase = createAdminClient();

    // Check for double booking — same date + time slot already booked (not cancelled)
    const { data: existing, error: checkError } = await supabase
      .from("bookings")
      .select("id")
      .eq("date", date)
      .eq("time", time)
      .neq("status", "cancelled")
      .maybeSingle();

    if (checkError) {
      return NextResponse.json(
        { error: "Failed to check availability" },
        { status: 500 }
      );
    }

    if (existing) {
      return NextResponse.json(
        {
          error:
            "This time slot is already booked. Please choose a different time.",
        },
        { status: 409 }
      );
    }

    // Insert booking
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          name: name.trim(),
          phone: cleanPhone,
          service,
          date,
          time,
          notes: notes?.trim() || null,
          status: "pending",
        },
      ])
      .select("id")
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to create booking" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
