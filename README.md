# ClientX AI — Landing page démo

Next.js 16 · Tailwind CSS 4 · React Hook Form + Zod · Cloudflare Pages. Une seule LP pour le Maroc et le reste du monde.

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
   - au webhook `LEAD_WEBHOOK_URL` : lead + UTM (dans le JSON **et** en paramètres d'URL) + `private_integration_key`, `subaccount_id`, `workflow_id` du marché (JSON uniquement) pour que le workflow appelle le bon compte GHL ;
   - optionnel : `GHL_SEND_DIRECT=true` fait aussi créer le contact dans GHL par le site (tags, note d'attribution, inscription au workflow) — à éviter si le workflow le fait déjà.
   - **Notification Google Chat** envoyée par le site après le webhook, dans le space du marché (`GOOGLE_CHAT_WEBHOOK_URL_MA` au Maroc, sinon `GOOGLE_CHAT_WEBHOOK_URL`) : toutes les infos du lead + UTM + lien `https://crm.clientx.ai/v2/location/{subaccount}/contacts/detail/{contact}`. L'ID du contact vient de la **réponse du webhook n8n** (nœud *Respond to Webhook* renvoyant `{"contact_id": "…"}`, ou la sortie du nœud GHL) ou de GHL en cas de filet de sécurité.
   - **filet de sécurité** : si le webhook est absent ou refuse le lead (ex. URL n8n `/webhook-test/`), le contact est créé directement dans GHL avec les identifiants du marché. Toujours utiliser l'URL de **production** `/webhook/…`.
3. Redirection vers `/merci` (global) ou `/merci-maroc` (IP au Maroc) — textes dans `THANK_YOU` (`content.ts`) — qui déclenche la conversion (`generate_lead` dans le dataLayer avec `lead_market` = `MA` / `global`, `Lead` Meta) — une seule fois par envoi.

**Téléphone** : sélecteur de pays (pré-rempli selon l'IP du visiteur) + chiffres uniquement ; toujours envoyé au format international sans espace (`+212691357226`). Les saisies `06…`, `2126…`, `+2126…`, `00212…` sont corrigées automatiquement ; liste des pays et règles dans `src/lib/phone.ts`.

**Attribution** : `utm_source, utm_medium, utm_campaign, utm_term, utm_content, utm_id, gclid, gbraid, wbraid, fbclid, msclkid, ttclid` + `landing_page`, `referrer`, `fbp`/`fbc`. Conservés pour la session (le visiteur peut naviguer avant de convertir).

**Événements formulaire** : `form_step_complete` (dataLayer / Google) et `FormStepComplete` (Meta, événement personnalisé) à chaque étape validée — paramètres `form_name`, `form_step` (1 ou 2), `form_step_name` (`coordonnees`, `entreprise`), `form_total_steps`. Une seule fois par étape, aucune donnée personnelle. Puis `generate_lead` / `Lead` sur `/merci`.

**Chat** : bulle LeadConnector via `NEXT_PUBLIC_CHAT_WIDGET_ID` (global) et `NEXT_PUBLIC_CHAT_WIDGET_ID_MA` (visiteurs au Maroc, détectés par IP). Chargée à la première interaction ou après 3,5 s pour ne pas ralentir l'affichage. Laisser vide pour désactiver.

**Tracking** : `NEXT_PUBLIC_GOOGLE_TAG_ID` accepte un ID GTM (`GTM-…`) ou un Google tag (`G-…` / `AW-…`). `NEXT_PUBLIC_META_PIXEL_ID` charge le Pixel (PageView + Lead). Les variables `NEXT_PUBLIC_*` sont lues au build : relancer `npm run build` après modification. Quand le Pixel vient de GTM (`NEXT_PUBLIC_META_PIXEL_ID` vide), le site n'appelle jamais `fbq` lui-même : GTM gère seul les événements Meta à partir du dataLayer (sinon chaque Lead est compté deux fois).

**Tarifs** : prix en € pour tous ; les visiteurs détectés au Maroc (IP via `/api/geo` : en-tête Netlify `x-nf-geo`, Vercel `x-vercel-ip-country` ou Cloudflare `cf-ipcountry`) voient les prix MAD par défaut et un sélecteur €/MAD. Prix dans `PRICING` (`content.ts`). Test : ajouter `?pays=MA` ou `?pays=FR` à l'URL.

**Marché Maroc / global** (`src/lib/market.ts`) : le serveur lit le pays de l'IP à chaque envoi. Maroc → `GHL_PRIVATE_INTEGRATION_KEY_MA`, `GHL_SUBACCOUNT_ID_MA`, `GHL_WORKFLOW_ID_MA` (+ widget `NEXT_PUBLIC_CHAT_WIDGET_ID_MA`) ; ailleurs → les variables sans suffixe. Si la clé `_MA` est vide, le compte global est utilisé en entier (jamais un mélange des deux). Le pays envoyé par le navigateur (et `?pays=MA`) ne sert qu'en local, quand l'hébergeur ne fournit pas d'en-tête IP.

**Performance** : aucune animation d'entrée ni défilement JS (pas de Lenis / Motion) — défilement natif, sections affichées immédiatement. Seuls restent les survols, la bande de logos et la barre de progression des modules (CSS).

## Candidatures partenaires

- Formulaire de `/partenaires` et `/en/partners` → `/api/partner` (`src/lib/partner.ts`) : contact GoHighLevel (compte Maroc ou global selon l'IP), tags « ClientX Partner Program » + formule + Maroc/Global, et une note.
- **Notification Google Chat** dans le space partenaires `GOOGLE_CHAT_WEBHOOK_URL_PARTNERS` (un seul space pour tous les marchés) : formule, nom, e-mail, téléphone, société, site, audience, pays (IP), langue du site, UTM, date et lien du contact. Envoyée aussi si le CRM échoue, avec un avertissement, pour ne perdre aucune candidature. Variable vide = pas de notification.

## Version anglaise

- **Qui la voit** : les visiteurs hors France et Maroc (pays de l'IP), règle dans `src/lib/lang.ts`. En production : Pages Functions `functions/index.ts`, `functions/en/*.ts`… (une par page) ; en local : `src/proxy.ts`.
- **Pages** : `/en`, `/en/partners`, `/en/legal-notice`, `/en/privacy-policy`, `/en/thank-you`, `/en/thank-you-morocco`.
- **Textes** : `src/lib/content.en.ts` (même structure que `content.ts` ; prix, liens de paiement, logos et contacts sont repris du fichier français). Les textes d'interface des composants sont dans `UI` des deux fichiers.
- **Tests** : `?lang=en` / `?lang=fr` force la langue (mémorisée dans le cookie `cx_lang`, comme le sélecteur FR/EN) ; `?pays=US` simule un visiteur hors France/Maroc, `?pays=FR` / `?pays=MA` restent en français. Le choix mémorisé passe avant `?pays=` : utiliser `?lang=fr` pour revenir.
- Les valeurs envoyées au CRM (secteur, formule partenaire) restent en français dans les deux versions.

## Avant la mise en ligne

- [ ] Bannière de consentement cookies (RGPD/CNIL) avant d'activer GTM et le Pixel Meta.
- [ ] `LEAD_WEBHOOK_URL` dans les variables d'environnement (Vercel) — utiliser l'URL de production `/webhook/…` et non `/webhook-test/…`.
- [ ] Remplacer les **témoignages** (marqués PLACEHOLDER dans `content.ts`).
- [ ] Remplacer les maquettes par les **captures produit**. (Logos clients : `public/clients/`, liste dans `CLIENTS` de `content.ts`.)
- [ ] Logos SVG ClientX (actuellement PNG dérivés du fichier fourni : `public/logo-dark.png`, `public/logo-white.png`).
- [ ] Compléter les `[À compléter]` des pages **Mentions légales** et **Politique de confidentialité**, et les faire relire.

## Déploiement Cloudflare Pages

Le site est exporté en fichiers statiques (`out/`) et les deux routes serveur tournent en **Pages Functions** (`functions/api/lead.ts`, `functions/api/geo.ts`), qui partagent la logique de `src/lib/lead.ts` et `src/lib/market.ts` avec les routes Next.js (`src/app/api/*`, utilisées seulement sur un hébergeur Node avec `next start`).

- **Build command** : `npm run build` · **Build output directory** : `out` (Pages définit `CF_PAGES=1`, ce qui active l'export statique dans `next.config.ts`).
- **Variables** (Settings > Variables and Secrets, pour Production) : `LEAD_WEBHOOK_URL`, `GHL_*`, `GHL_*_MA`, `GHL_SEND_DIRECT` (type *Secret* pour les clés) + toutes les `NEXT_PUBLIC_*` (lues au build). Redéployer après modification.
- **Pays** : `request.cf.country`, calculé par Cloudflare depuis l'IP — un visiteur ne peut pas le falsifier avec un en-tête.
- **Sous-domaine** : Custom domains > `platform.clientx.ai`, puis chez GoDaddy un enregistrement `CNAME` `platform` → `<projet>.pages.dev`. Aucun autre changement DNS.
- **Test local** : `STATIC_EXPORT=1 npm run build` puis `npm run pages:dev` (variables dans `.dev.vars`, non commité).
