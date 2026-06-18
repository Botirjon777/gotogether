"use server";

export type ContactInput = {
  name: string;
  phone: string;
  message: string;
  /** honeypot — must stay empty; bots tend to fill it */
  company?: string;
};

export type ContactResult = { ok: boolean; error?: "invalid" | "server" };

/** Uzbek numbers: 998 + 9 national digits (e.g. +998 90 123 45 67). */
function normalizeUzPhone(raw: string): string | null {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("998")) digits = digits.slice(3);
  if (!/^\d{9}$/.test(digits)) return null;
  return `+998 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)}`;
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
  const phone = normalizeUzPhone(input.phone ?? "");

  if (!name || !message || !phone) {
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
    `📞 Phone: ${phone}\n\n` +
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
