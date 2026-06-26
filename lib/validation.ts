// Shared contact-field validation, used by both the client form
// (components/sections/Contact.tsx) and the server action (app/actions/contact.ts)
// so the two can never drift out of sync.

/** Accepts any international number: optional leading +, 7–15 digits. */
export function isValidPhone(value: string): boolean {
  return /^\+?\d{7,15}$/.test(value.replace(/[\s()-]/g, ""));
}

/** Light email check — just enough to catch obvious typos. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
