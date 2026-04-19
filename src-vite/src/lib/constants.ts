export interface Service {
  id: string;
  name: string;
  duration: number;
  description?: string;
  icon?: string;
}

export const SERVICES: Service[] = [
  {
    id: "general-checkup",
    name: "General Checkup",
    duration: 30,
    description: "Comprehensive health assessment and routine physical examination",
    icon: "stethoscope",
  },
  {
    id: "consultation",
    name: "Consultation",
    duration: 20,
    description: "One-on-one consultation for specific health concerns or follow-ups",
    icon: "message-circle",
  },
  {
    id: "emergency",
    name: "Emergency Visit",
    duration: 45,
    description: "Urgent care for sudden illness or injury requiring immediate attention",
    icon: "activity",
  },
  {
    id: "dental",
    name: "Dental Care",
    duration: 45,
    description: "Routine dental examination, cleaning, and oral health assessment",
    icon: "smile",
  },
  {
    id: "vaccination",
    name: "Vaccination",
    duration: 15,
    description: "Scheduled immunizations and vaccine administration",
    icon: "shield",
  },
  {
    id: "lab-test",
    name: "Lab Test",
    duration: 20,
    description: "Blood work, urine analysis, and other diagnostic tests",
    icon: "flask-conical",
  },
];

export const ALL_TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00",
];

export function formatTime(time: string): string {
  if (!time) return "";
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}
