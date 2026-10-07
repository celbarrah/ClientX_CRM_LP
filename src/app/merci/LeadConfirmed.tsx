"use client";

import { useEffect, useState } from "react";
import { trackLead } from "@/components/Analytics";

/** Personal greeting + conversion event, only when the visitor arrives from a real submission. */
export function LeadConfirmed() {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    let lead: { firstName?: string; sector?: string; teamSize?: string } | null = null;
    try {
      lead = JSON.parse(sessionStorage.getItem("cx_lead") ?? "null");
      // One conversion per submission: a refresh of /merci must not count again.
      sessionStorage.removeItem("cx_lead");
    } catch {}
    if (!lead) return;
    setName(lead.firstName ?? null);
    trackLead({ sector: lead.sector, teamSize: lead.teamSize });
  }, []);

  return name ? <>, {name}</> : null;
}
