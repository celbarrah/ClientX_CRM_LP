import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT } from "@/lib/content";
import { copy } from "@/lib/i18n";

export const metadata: Metadata = { title: copy("en").UI.legal.privacyTitle };

// TEMPLATE (translation of /politique-de-confidentialite) — must be reviewed (ideally by counsel) before going live.
export default function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy policy" lang="en">
      <section>
        <h2>Data controller</h2>
        <p>{CONTACT.entities} — [address to be completed] — {CONTACT.email}</p>
      </section>
      <section>
        <h2>Data collected</h2>
        <p>
          Through the demo request form: first name, last name, email, phone, company, industry and team size, as well
          as the campaign parameters (UTM) of the page visited.
        </p>
      </section>
      <section>
        <h2>Purposes and legal basis</h2>
        <p>
          Organizing your demo, getting back to you and presenting our services, on the basis of your request
          (pre-contractual measures) and our legitimate interest.
        </p>
      </section>
      <section>
        <h2>Recipients and retention period</h2>
        <p>
          The data is processed in our CRM and is never sold. Retention period: [To be completed, e.g. 3 years after the
          last contact].
        </p>
      </section>
      <section>
        <h2>Your rights</h2>
        <p>
          You have the right to access, rectify, erase, object to, restrict and port your data. To exercise these
          rights: {CONTACT.email}. You can also lodge a complaint with the CNIL (France) or the CNDP (Morocco).
        </p>
      </section>
    </LegalPage>
  );
}
