"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";

import { sendContactMessage } from "@/app/actions/contact";
import { Icon } from "@/components/ui/Icons";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { useTranslations } from "@/i18n/provider";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const PHONE_PREFIX = "+998 ";

/** Formats any input into "+998 XX XXX XX XX" as the user types. */
function formatUzPhone(input: string): string {
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("998")) digits = digits.slice(3);
  digits = digits.slice(0, 9);
  const groups = [
    digits.slice(0, 2),
    digits.slice(2, 5),
    digits.slice(5, 7),
    digits.slice(7, 9),
  ].filter(Boolean);
  return "+998" + (groups.length ? " " + groups.join(" ") : " ");
}

/** True when the phone holds a complete Uzbek number (9 national digits). */
function isValidUzPhone(value: string): boolean {
  return /^998\d{9}$/.test(value.replace(/\D/g, ""));
}

export function Contact() {
  const t = useTranslations("contact");
  const root = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", phone: PHONE_PREFIX, message: "" });
  // honeypot — real users never see or fill this
  const [company, setCompany] = useState("");

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".contact-field", {
        y: 24,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    },
    { scope: root },
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim() || !isValidUzPhone(form.phone)) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const res = await sendContactMessage({ ...form, company });
    if (res.ok) {
      setStatus("sent");
      setForm({ name: "", phone: PHONE_PREFIX, message: "" });
    } else {
      setStatus("error");
    }
  }

  // text-base (16px) avoids iOS auto-zoom when focusing inputs on mobile.
  const field =
    "w-full rounded-xl border border-line bg-slate/40 px-4 py-3 text-base text-snow placeholder:text-ash/70 outline-none transition-colors focus:border-cobalt";

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div ref={root} className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="contact-field mb-3 font-mono text-xs uppercase tracking-[0.2em] text-electric">
            {t("eyebrow")}
          </p>
          <h2 className="contact-field text-fluid-title font-display font-bold tracking-tight">
            {t("title")}
          </h2>
          <p className="contact-field mt-4 max-w-md text-base text-ash sm:text-lg">
            {t("subtitle")}
          </p>

          <div className="contact-field mt-10">
            <p className="mb-2 text-sm text-ash">{t("or_email")}</p>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 font-display text-lg font-semibold text-snow transition-colors hover:text-electric"
            >
              <Icon name="arrow" size={18} />
              {site.email}
            </a>
          </div>

          <div className="contact-field mt-8">
            <SocialLinks links={site.social} size={20} />
          </div>
        </div>

        {status === "sent" ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-electric/30 bg-slate/40 p-10 text-center">
            <span className="mb-5 grid size-16 place-items-center rounded-full bg-electric/15 text-electric">
              <Icon name="check" size={32} />
            </span>
            <h3 className="font-display text-2xl font-semibold">{t("sent_title")}</h3>
            <p className="mt-2 max-w-xs text-sm text-ash">{t("sent")}</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-7 inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-medium text-snow transition-colors hover:border-electric/60 hover:text-electric"
            >
              <Icon name="arrow" size={16} />
              {t("send_again")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            {/* Honeypot: hidden from users, catches naive bots. */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />
          <div className="contact-field">
            <label className="mb-1.5 block text-sm text-ash">{t("name")}</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder={t("name_ph")}
              className={field}
            />
          </div>
          <div className="contact-field">
            <label className="mb-1.5 block text-sm text-ash">{t("phone")}</label>
            <input
              type="tel"
              inputMode="tel"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: formatUzPhone(e.target.value) })
              }
              placeholder={t("phone_ph")}
              maxLength={17}
              className={field}
            />
          </div>
          <div className="contact-field">
            <label className="mb-1.5 block text-sm text-ash">{t("message")}</label>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder={t("message_ph")}
              className={`${field} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="contact-field mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-cobalt px-6 py-3.5 font-medium text-snow shadow-lg shadow-cobalt/30 transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {status === "sending" ? t("sending") : t("send")}
            {status !== "sending" && <Icon name="arrow" size={18} />}
          </button>

            {status === "error" && (
              <p className="text-sm text-red-400">{t("error")}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
