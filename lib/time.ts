import { format, isValid, parse } from "date-fns";

/**
 * Convert ANY backend value → "HH:mm"
 */
export function toTimeString(value: string): string {
  if (!value) return "09:00";

  // ISO
  const iso = new Date(value);
  if (isValid(iso)) {
    return format(iso, "HH:mm");
  }

  // already HH:mm
  const parsed = parse(value, "HH:mm", new Date());
  if (isValid(parsed)) {
    return format(parsed, "HH:mm");
  }

  return "09:00";
}

/**
 * Convert "HH:mm" → ISO (for DB)
 */
export function toISOTime(date: string, time: string): string {
  return new Date(`${date}T${time}:00`).toISOString();
}