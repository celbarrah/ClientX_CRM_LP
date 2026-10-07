# ClientX AI — Landing page démo

Next.js 16 · Tailwind CSS 4 · Lenis · Motion · React Hook Form + Zod.

```bash
npm install
cp .env.example .env.local   # puis renseigner LEAD_WEBHOOK_URL
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Où modifier quoi

| Quoi | Fichier |
| --- | --- |
| Tous les textes, tarifs, FAQ, logos clients, témoignages | `src/lib/content.ts` |
| Couleurs, polices, ombres | `src/app/globals.css` (`@theme`) |
| Champs du formulaire, secteurs, tailles d'équipe | `src/lib/schema.ts` |
| Envoi vers le webhook | `src/app/api/lead/route.ts` |
| Maquettes UI des modules (à remplacer par des captures) | `src/components/mocks.tsx` |
| Archives cas d'usage (dossiers par secteur) | `USE_CASES` dans `src/lib/content.ts`, rendu `src/components/Archive.tsx` |

## Parcours de conversion

1. **Étape 1** (coordonnées) → validation uniquement, rien n'est envoyé.
2. **Étape 2** (entreprise, secteur, équipe) → envoi unique au webhook `LEAD_WEBHOOK_URL`.
3. Message de confirmation affiché dans le formulaire (pas de redirection).

Champs envoyés : `first_name, last_name, email, phone, company_name, sector, team_size, source, page, utm_*, gclid, fbclid, submitted_at`.

## Avant la mise en ligne

- [ ] `LEAD_WEBHOOK_URL` dans les variables d'environnement (Vercel) — utiliser l'URL de production `/webhook/…` et non `/webhook-test/…`.
- [ ] Remplacer les **témoignages** (marqués PLACEHOLDER dans `content.ts`).
- [ ] Remplacer les maquettes par les **captures produit**. (Logos clients : `public/clients/`, liste dans `CLIENTS` de `content.ts`.)
- [ ] Logos SVG ClientX (actuellement PNG dérivés du fichier fourni : `public/logo-dark.png`, `public/logo-white.png`).
- [ ] Compléter les `[À compléter]` des pages **Mentions légales** et **Politique de confidentialité**, et les faire relire.
- [ ] Pixels / GA4 / GTM si besoin.
