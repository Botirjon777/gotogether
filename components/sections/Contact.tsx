"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { toast } from "sonner";

import { sendContactMessage } from "@/app/actions/contact";
import { Icon } from "@/components/ui/Icons";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { useTranslations } from "@/i18n/provider";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/lib/site";
import { isValidEmail, isValidPhone } from "@/lib/validation";

type Status = "idle" | "sending" | "sent";
type Field = "name" | "phone" | "email" | "message";
type FieldErrors = Partial<Record<Field, string>>;

export function Contact() {
  const t = useTranslations("contact");
  const root = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  // honeypot — real users never see or fill this
  const [company, setCompany] = useState("");

  /** Per-field validation — returns one message per offending field. */
  function validate(values: typeof form): FieldErrors {
    const next: FieldErrors = {};
    if (!values.name.trim()) next.name = t("err_name");
    if (!isValidPhone(values.phone)) next.phone = t("err_phone");
    if (!isValidEmail(values.email)) next.email = t("err_email");
    if (!values.message.trim()) next.message = t("err_message");
    return next;
  }

  /** Update a field and clear its error so the danger state lifts as they type. */
  function update(field: Field, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

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
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      toast.error(t("toast_invalid"));
      return;
    }
    setErrors({});
    setStatus("sending");
    const res = await sendContactMessage({ ...form, company });
    if (res.ok) {
      setStatus("sent");
      setForm({ name: "", phone: "", email: "", message: "" });
      toast.success(t("toast_sent"));
    } else {
      setStatus("idle");
      toast.error(t("toast_error"));
    }
  }

  // text-base (16px) avoids iOS auto-zoom when focusing inputs on mobile.
  const fieldBase =
    "w-full rounded-xl border bg-slate/40 px-4 py-3 text-base text-snow placeholder:text-ash/70 outline-none transition-colors";
  // Danger border + ring when a field has an error, cobalt focus otherwise.
  const fieldClass = (hasError: boolean) =>
    `${fieldBase} ${
      hasError
        ? "border-red-500 focus:border-red-500"
        : "border-line focus:border-cobalt"
    }`;

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
            <label htmlFor="contact-name" className="mb-1.5 block text-sm text-ash">
              {t("name")}
            </label>
            <input
              id="contact-name"
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder={t("name_ph")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              className={fieldClass(Boolean(errors.name))}
            />
            {errors.name && (
              <p id="contact-name-error" className="mt-1.5 text-sm text-red-400">
                {errors.name}
              </p>
            )}
          </div>
          <div className="contact-field">
            <label htmlFor="contact-phone" className="mb-1.5 block text-sm text-ash">
              {t("phone")}
            </label>
            <input
              id="contact-phone"
              type="tel"
              inputMode="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder={t("phone_ph")}
              maxLength={20}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "contact-phone-error" : undefined}
              className={fieldClass(Boolean(errors.phone))}
            />
            {errors.phone && (
              <p id="contact-phone-error" className="mt-1.5 text-sm text-red-400">
                {errors.phone}
              </p>
            )}
          </div>
          <div className="contact-field">
            <label htmlFor="contact-email" className="mb-1.5 block text-sm text-ash">
              {t("email")}
            </label>
            <input
              id="contact-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder={t("email_ph")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              className={fieldClass(Boolean(errors.email))}
            />
            {errors.email && (
              <p id="contact-email-error" className="mt-1.5 text-sm text-red-400">
                {errors.email}
              </p>
            )}
          </div>
          <div className="contact-field">
            <label htmlFor="contact-message" className="mb-1.5 block text-sm text-ash">
              {t("message")}
            </label>
            <textarea
              id="contact-message"
              rows={5}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder={t("message_ph")}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              className={`${fieldClass(Boolean(errors.message))} resize-none`}
            />
            {errors.message && (
              <p id="contact-message-error" className="mt-1.5 text-sm text-red-400">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="contact-field mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-cobalt px-6 py-3.5 font-medium text-on-accent shadow-lg shadow-cobalt/30 transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {status === "sending" ? t("sending") : t("send")}
            {status !== "sending" && <Icon name="arrow" size={18} />}
          </button>
          </form>
        )}
      </div>
    </section>
  );
}
