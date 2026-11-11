import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT } from "@/lib/content";

export const metadata: Metadata = { title: "Mentions légales — ClientX AI" };

// TEMPLATE — every [À compléter] must be filled in and the text reviewed before going live.
export default function MentionsLegales() {
  return (
    <LegalPage title="Mentions légales">
      <section>
        <h2>Éditeur du site</h2>
        <p>
          {CONTACT.entities}
          <br />
          Forme juridique et capital : [À compléter]
          <br />
          Siège social : [À compléter]
          <br />
          Immatriculation (RCS / RC / Company number) : [À compléter]
          <br />
          E-mail : {CONTACT.email} · Téléphone : {CONTACT.phone}
        </p>
      </section>
      <section>
        <h2>Directeur de la publication</h2>
        <p>[À compléter]</p>
      </section>
      <section>
        <h2>Hébergement</h2>
        <p>[Nom, adresse et téléphone de l'hébergeur — à compléter]</p>
      </section>
      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus de ce site (textes, visuels, logos, marques) est protégé. Toute reproduction sans
          autorisation préalable est interdite.
        </p>
      </section>
    </LegalPage>
  );
}
