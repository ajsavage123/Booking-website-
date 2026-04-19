import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateWhatsAppLink(
  _phone: string,
  name: string,
  service: string,
  date: string,
  time: string
): string {
  const clinicPhone = "601234567890";
  const message = encodeURIComponent(
    `Hello, I just booked an appointment!\n\n` +
      `📋 *Booking Details*\n` +
      `• Name: ${name}\n` +
      `• Service: ${service}\n` +
      `• Date: ${date}\n` +
      `• Time: ${time}\n\n` +
      `Please confirm my appointment. Thank you!`
  );
  return `https://wa.me/${clinicPhone}?text=${message}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length >= 9 && cleaned.length <= 15;
}

export const CLINIC_NAME = "MediCare Clinic";
