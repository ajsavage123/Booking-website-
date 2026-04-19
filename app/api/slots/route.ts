import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";

// GET /api/slots?date=YYYY-MM-DD&service=service-id
// Returns list of already-booked time slots for a given date
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "Date is required" }, { status: 400 });
  }

  // Validate date format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("bookings")
    .select("time")
    .eq("date", date)
    .neq("status", "cancelled"); // Cancelled slots become available again

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch slots" },
      { status: 500 }
    );
  }

  const bookedTimes = (data || []).map((b) => b.time);

  return NextResponse.json({ booked: bookedTimes });
}
