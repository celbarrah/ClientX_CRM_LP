"use client";

import { useEffect } from "react";
import Script from "next/script";
import { captureAttribution } from "@/lib/attribution";

// IDs are injected into inline scripts, so only allow their expected characters.
const clean = (v?: string) => v?.trim().replace(/[^A-Za-z0-9-]/g, "") || undefined;
const GOOGLE_TAG_ID = clean(process.env.NEXT_PUBLIC_GOOGLE_TAG_ID);
const META_PIXEL_ID = clean(process.env.NEXT_PUBLIC_META_PIXEL_ID);
const isGTM = GOOGLE_TAG_ID?.startsWith("GTM-");

/**
 * Loads Google Tag Manager (GTM-…) or the Google tag (G-… / AW-…) and the Meta Pixel,
 * only when their IDs are set in the environment. Also captures UTMs on every page.
 */
export function Analytics() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return (
    <>
      {GOOGLE_TAG_ID && isGTM && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GOOGLE_TAG_ID}');`}
        </Script>
      )}

      {GOOGLE_TAG_ID && !isGTM && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`} strategy="afterInteractive" />
          <Script id="gtag" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GOOGLE_TAG_ID}');`}
          </Script>
        </>
      )}

      {META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}

/** GTM <noscript> fallback, rendered right after <body>. */
export function GtmNoScript() {
  if (!GOOGLE_TAG_ID || !isGTM) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GOOGLE_TAG_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}

type Win = Window & {
  dataLayer?: unknown[];
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
};

/** Pixel scripts load after hydration: wait for them rather than dropping the event. */
function whenTagsReady(fire: (w: Win) => void) {
  const w = window as Win;
  let tries = 0;
  const attempt = () => {
    const metaReady = !META_PIXEL_ID || w.fbq;
    const gtagReady = !GOOGLE_TAG_ID || isGTM || w.gtag;
    if ((!metaReady || !gtagReady) && tries++ < 25) return void setTimeout(attempt, 200);
    fire(w);
  };
  attempt();
}

function pushDataLayer(data: Record<string, unknown>) {
  const w = window as Win;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(data);
}

/**
 * Fired each time a visitor completes a step of the demo form.
 * No personal data is sent, only the step and the funnel position.
 */
export function trackFormStep(step: number, stepName: string, totalSteps = 2) {
  const params = { form_name: "demo", form_step: step, form_step_name: stepName, form_total_steps: totalSteps };
  pushDataLayer({ event: "form_step_complete", ...params });
  whenTagsReady((w) => {
    w.fbq?.("trackCustom", "FormStepComplete", params);
    if (!isGTM) w.gtag?.("event", "form_step_complete", params);
  });
}

/** Conversion event, fired on the thank-you page after a real submission. */
export function trackLead(data: { sector?: string; teamSize?: string; market?: string }) {
  pushDataLayer({ event: "generate_lead", lead_sector: data.sector, lead_team_size: data.teamSize, lead_market: data.market });
  whenTagsReady((w) => {
    w.fbq?.("track", "Lead", { content_category: data.sector });
    if (!isGTM) w.gtag?.("event", "generate_lead", { lead_sector: data.sector });
  });
}
