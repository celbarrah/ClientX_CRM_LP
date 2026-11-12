import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT } from "@/lib/content";
import { copy } from "@/lib/i18n";

export const metadata: Metadata = { title: copy("en").UI.legal.title };

// TEMPLATE (translation of /mentions-legales) — every [To be completed] must be filled in before going live.
export default function LegalNotice() {
  return (
    <LegalPage title="Legal notice" lang="en">
      <section>
        <h2>Website publisher</h2>
        <p>
          {CONTACT.entities}
          <br />
          Legal form and share capital: [To be completed]
          <br />
          Registered office: [To be completed]
          <br />
          Registration (RCS / RC / Company number): [To be completed]
          <br />
          Email: {CONTACT.email} · Phone: {CONTACT.phone}
        </p>
      </section>
      <section>
        <h2>Publication director</h2>
        <p>[To be completed]</p>
      </section>
      <section>
        <h2>Hosting</h2>
        <p>[Name, address and phone number of the host — to be completed]</p>
      </section>
      <section>
        <h2>Intellectual property</h2>
        <p>
          All content on this website (texts, visuals, logos, trademarks) is protected. Any reproduction without prior
          permission is prohibited.
        </p>
      </section>
    </LegalPage>
  );
}
