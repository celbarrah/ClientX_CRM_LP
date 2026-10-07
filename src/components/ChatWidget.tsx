"use client";

import { useEffect } from "react";

/* LeadConnector chat bubble, chosen by visitor location: a dedicated widget for Morocco,
   the global one everywhere else. IDs come from the environment. */
const clean = (v?: string) => v?.trim().replace(/[^A-Za-z0-9]/g, "") || undefined;
const WIDGET_GLOBAL = clean(process.env.NEXT_PUBLIC_CHAT_WIDGET_ID);
const WIDGET_MA = clean(process.env.NEXT_PUBLIC_CHAT_WIDGET_ID_MA);

const LOADER = "https://widgets.leadconnectorhq.com/loader.js";
const RESOURCES = "https://widgets.leadconnectorhq.com/chat-widget/loader.js";
const SCRIPT_ID = "cx-global-chat-widget";

export const CHAT_ENABLED = Boolean(WIDGET_GLOBAL || WIDGET_MA);

/** Morocco detection from the browser's timezone/locale: instant, no IP lookup. */
function isMorocco() {
  try {
    if (Intl.DateTimeFormat().resolvedOptions().timeZone === "Africa/Casablanca") return true;
  } catch {}
  return navigator.languages?.some((l) => /-MA$/i.test(l)) ?? false;
}

export function ChatWidget() {
  useEffect(() => {
    const widgetId = (isMorocco() && WIDGET_MA) || WIDGET_GLOBAL || WIDGET_MA;
    if (!widgetId || document.getElementById(SCRIPT_ID)) return;

    const load = () => {
      if (document.getElementById(SCRIPT_ID)) return;
      const s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.src = LOADER;
      s.async = true;
      s.setAttribute("data-resources-url", RESOURCES);
      s.setAttribute("data-widget-id", widgetId);
      document.body.appendChild(s);
    };

    // Load after the page is interactive (first interaction or a few seconds),
    // so the widget never competes with the hero and the form.
    const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    const trigger = () => {
      events.forEach((e) => window.removeEventListener(e, trigger));
      clearTimeout(timer);
      load();
    };
    const timer = setTimeout(trigger, 3500);
    events.forEach((e) => window.addEventListener(e, trigger, { once: true, passive: true }));
    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, trigger));
    };
  }, []);

  return null;
}
