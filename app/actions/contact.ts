"use server";

export type ContactInput = {
  name: string;
  phone: string;
  email: string;
  message: string;
  /** honeypot — must stay empty; bots tend to fill it */
  company?: string;
};

export type ContactResult = { ok: boolean; error?: "invalid" | "server" };

/** Accepts any international number: optional leading +, 7–15 digits. */
function normalizePhone(raw: string): string | null {
  const trimmed = raw.trim();
  const digits = trimmed.replace(/[\s()-]/g, "");
  if (!/^\+?\d{7,15}$/.test(digits)) return null;
  return trimmed;
}

/** Light email check — just enough to catch obvious typos. */
function normalizeEmail(raw: string): string | null {
  const email = raw.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

/**
 * Validates a contact submission and forwards it to the GoTogether Telegram
 * group via the bot. Runs only on the server — the bot token never reaches the
 * client. Sent as plain text (no parse_mode) so user input can't inject markup.
 */
export async function sendContactMessage(
  input: ContactInput,
): Promise<ContactResult> {
  // Silently accept (and drop) anything that trips the honeypot.
  if (input.company && input.company.trim() !== "") return { ok: true };

  const name = input.name?.trim() ?? "";
  const message = input.message?.trim() ?? "";
  const phone = normalizePhone(input.phone ?? "");
  const email = normalizeEmail(input.email ?? "");

  if (!name || !message || !phone || !email) {
    return { ok: false, error: "invalid" };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("Telegram env vars missing (TELEGRAM_BOT_TOKEN/CHAT_ID).");
    return { ok: false, error: "server" };
  }

  const text =
    `🟢 New contact request — GoTogether\n\n` +
    `👤 Name: ${name}\n` +
    `📞 Phone: ${phone}\n` +
    `📧 Email: ${email}\n\n` +
    `💬 Message:\n${message}`;

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          disable_web_page_preview: true,
        }),
        cache: "no-store",
      },
    );

    if (!res.ok) {
      console.error("Telegram sendMessage failed:", res.status, await res.text());
      return { ok: false, error: "server" };
    }
    return { ok: true };
  } catch (err) {
    console.error("Telegram sendMessage error:", err);
    return { ok: false, error: "server" };
  }
}
