import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { BookingStatus } from "@/types";
import { mockDb } from "@/lib/mock-db";

// PATCH /api/bookings/[id] — update booking status
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookieStore = cookies();
  const adminSession = cookieStore.get("admin_session");

  if (!adminSession || adminSession.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const body = await req.json();
  const { status } = body as { status: BookingStatus };

  const validStatuses: BookingStatus[] = ["pending", "confirmed", "cancelled"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    const updated = await mockDb.updateBookingStatus(id, status);
    if (!updated) {
        return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

// DELETE /api/bookings/[id] — delete a booking
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookieStore = cookies();
  const adminSession = cookieStore.get("admin_session");

  if (!adminSession || adminSession.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const success = await mockDb.deleteBooking(params.id);
    if (!success) {
        return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}
