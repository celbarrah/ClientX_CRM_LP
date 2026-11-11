import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT } from "@/lib/content";

export const metadata: Metadata = { title: "Politique de confidentialité — ClientX AI" };

// TEMPLATE — must be reviewed (ideally by counsel) before going live.
export default function Confidentialite() {
  return (
    <LegalPage title="Politique de confidentialité">
      <section>
        <h2>Responsable du traitement</h2>
        <p>{CONTACT.entities} — [adresse à compléter] — {CONTACT.email}</p>
      </section>
      <section>
        <h2>Données collectées</h2>
        <p>
          Via le formulaire de demande de démo : prénom, nom, e-mail, téléphone, entreprise, secteur d'activité et
          taille d'équipe, ainsi que les paramètres de campagne (UTM) de la page visitée.
        </p>
      </section>
      <section>
        <h2>Finalités et base légale</h2>
        <p>
          Organiser votre démo, vous recontacter et vous présenter nos services, sur la base de votre demande
          (mesures précontractuelles) et de notre intérêt légitime.
        </p>
      </section>
      <section>
        <h2>Destinataires et durée de conservation</h2>
        <p>
          Les données sont traitées dans notre CRM et ne sont jamais revendues. Durée de conservation : [À compléter,
          par ex. 3 ans après le dernier contact].
        </p>
      </section>
      <section>
        <h2>Vos droits</h2>
        <p>
          Vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition, de limitation et de
          portabilité. Pour l'exercer : {CONTACT.email}. Vous pouvez également introduire une réclamation auprès de la
          CNIL (France) ou de la CNDP (Maroc).
        </p>
      </section>
    </LegalPage>
  );
}
