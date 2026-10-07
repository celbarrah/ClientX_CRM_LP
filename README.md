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
2. **Étape 2** → envoi unique, en parallèle :
   - au webhook `LEAD_WEBHOOK_URL` : lead + UTM (dans le JSON **et** en paramètres d'URL) + `private_integration_key`, `subaccount_id`, `workflow_id` (JSON uniquement) pour que le workflow appelle GHL ;
   - optionnel : `GHL_SEND_DIRECT=true` fait aussi créer le contact dans GHL par le site (tags, note d'attribution, inscription au workflow) — à éviter si le workflow le fait déjà.
3. Redirection vers `/merci`, qui déclenche la conversion (`generate_lead` dans le dataLayer, `Lead` Meta) — une seule fois par envoi.

**Attribution** : `utm_source, utm_medium, utm_campaign, utm_term, utm_content, utm_id, gclid, gbraid, wbraid, fbclid, msclkid, ttclid` + `landing_page`, `referrer`, `fbp`/`fbc`. Conservés pour la session (le visiteur peut naviguer avant de convertir).

**Événements formulaire** : `form_step_complete` (dataLayer / Google) et `FormStepComplete` (Meta, événement personnalisé) à chaque étape validée — paramètres `form_name`, `form_step` (1 ou 2), `form_step_name` (`coordonnees`, `entreprise`), `form_total_steps`. Une seule fois par étape, aucune donnée personnelle. Puis `generate_lead` / `Lead` sur `/merci`.

**Chat** : bulle LeadConnector via `NEXT_PUBLIC_CHAT_WIDGET_ID` (global) et `NEXT_PUBLIC_CHAT_WIDGET_ID_MA` (visiteurs dont le fuseau horaire est `Africa/Casablanca`). Chargée à la première interaction ou après 3,5 s pour ne pas ralentir l'affichage. Laisser vide pour désactiver.

**Tracking** : `NEXT_PUBLIC_GOOGLE_TAG_ID` accepte un ID GTM (`GTM-…`) ou un Google tag (`G-…` / `AW-…`). `NEXT_PUBLIC_META_PIXEL_ID` charge le Pixel (PageView + Lead). Les variables `NEXT_PUBLIC_*` sont lues au build : relancer `npm run build` après modification.

**Tarifs** : prix en € pour tous ; les visiteurs détectés au Maroc (IP via `/api/geo`, en-tête Vercel `x-vercel-ip-country` ou Cloudflare `cf-ipcountry`) voient les prix MAD par défaut et un sélecteur €/MAD. Prix dans `PRICING` (`content.ts`). Test : ajouter `?pays=MA` ou `?pays=FR` à l'URL.

## Avant la mise en ligne

- [ ] Bannière de consentement cookies (RGPD/CNIL) avant d'activer GTM et le Pixel Meta.
- [ ] `LEAD_WEBHOOK_URL` dans les variables d'environnement (Vercel) — utiliser l'URL de production `/webhook/…` et non `/webhook-test/…`.
- [ ] Remplacer les **témoignages** (marqués PLACEHOLDER dans `content.ts`).
- [ ] Remplacer les maquettes par les **captures produit**. (Logos clients : `public/clients/`, liste dans `CLIENTS` de `content.ts`.)
- [ ] Logos SVG ClientX (actuellement PNG dérivés du fichier fourni : `public/logo-dark.png`, `public/logo-white.png`).
- [ ] Compléter les `[À compléter]` des pages **Mentions légales** et **Politique de confidentialité**, et les faire relire.
