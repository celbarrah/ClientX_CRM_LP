// Phone numbers in one format for the CRM: E.164, e.g. "+212691357226" (plus sign, digits only, no spaces).
// Shared by the form (country selector + live clean-up) and the server (final validation).
// Relative imports only: also bundled into the Cloudflare Pages Functions.

export type PhoneCountry = {
  code: string; // ISO country code, as returned by the IP lookup
  name: string;
  dial: string; // country calling code, digits only
  min: number; // national number length (without the trunk 0)
  max: number;
  trunk0?: boolean; // a leading 0 dialled inside the country is not part of the international number
  starts?: string; // allowed first digits of the national number
  example: string;
};

/** Markets first, then the rest alphabetically. "Autre" lets anyone type a full international number. */
export const PHONE_COUNTRIES: PhoneCountry[] = [
  { code: "MA", name: "Maroc", dial: "212", min: 9, max: 9, trunk0: true, starts: "5678", example: "612345678" },
  { code: "FR", name: "France", dial: "33", min: 9, max: 9, trunk0: true, starts: "123456789", example: "612345678" },
  { code: "BE", name: "Belgique", dial: "32", min: 8, max: 9, trunk0: true, example: "470123456" },
  { code: "CH", name: "Suisse", dial: "41", min: 9, max: 9, trunk0: true, example: "781234567" },
  { code: "CA", name: "Canada / États-Unis", dial: "1", min: 10, max: 10, example: "5141234567" },
  { code: "DZ", name: "Algérie", dial: "213", min: 9, max: 9, trunk0: true, example: "551234567" },
  { code: "TN", name: "Tunisie", dial: "216", min: 8, max: 8, example: "20123456" },
  { code: "SN", name: "Sénégal", dial: "221", min: 9, max: 9, example: "701234567" },
  { code: "CI", name: "Côte d'Ivoire", dial: "225", min: 10, max: 10, example: "0712345678" },
  { code: "AE", name: "Émirats arabes unis", dial: "971", min: 8, max: 9, trunk0: true, example: "501234567" },
  { code: "SA", name: "Arabie saoudite", dial: "966", min: 9, max: 9, trunk0: true, example: "512345678" },
  { code: "DE", name: "Allemagne", dial: "49", min: 7, max: 12, trunk0: true, example: "15123456789" },
  { code: "BH", name: "Bahreïn", dial: "973", min: 8, max: 8, example: "36001234" },
  { code: "BF", name: "Burkina Faso", dial: "226", min: 8, max: 8, example: "70123456" },
  { code: "CM", name: "Cameroun", dial: "237", min: 9, max: 9, example: "671234567" },
  { code: "CD", name: "RD Congo", dial: "243", min: 9, max: 9, trunk0: true, example: "991234567" },
  { code: "EG", name: "Égypte", dial: "20", min: 9, max: 10, trunk0: true, example: "1001234567" },
  { code: "ES", name: "Espagne", dial: "34", min: 9, max: 9, starts: "6789", example: "612345678" },
  { code: "GA", name: "Gabon", dial: "241", min: 7, max: 8, example: "06031234" },
  { code: "GN", name: "Guinée", dial: "224", min: 9, max: 9, example: "601123456" },
  { code: "IE", name: "Irlande", dial: "353", min: 7, max: 9, trunk0: true, example: "851234567" },
  { code: "IT", name: "Italie", dial: "39", min: 6, max: 11, example: "3123456789" },
  { code: "KW", name: "Koweït", dial: "965", min: 8, max: 8, example: "50012345" },
  { code: "LU", name: "Luxembourg", dial: "352", min: 6, max: 11, example: "628123456" },
  { code: "ML", name: "Mali", dial: "223", min: 8, max: 8, example: "65012345" },
  { code: "MR", name: "Mauritanie", dial: "222", min: 8, max: 8, example: "22123456" },
  { code: "NL", name: "Pays-Bas", dial: "31", min: 9, max: 9, trunk0: true, example: "612345678" },
  { code: "OM", name: "Oman", dial: "968", min: 8, max: 8, example: "92123456" },
  { code: "PT", name: "Portugal", dial: "351", min: 9, max: 9, example: "912345678" },
  { code: "QA", name: "Qatar", dial: "974", min: 8, max: 8, example: "33123456" },
  { code: "GB", name: "Royaume-Uni", dial: "44", min: 9, max: 10, trunk0: true, example: "7400123456" },
  { code: "TR", name: "Turquie", dial: "90", min: 10, max: 10, trunk0: true, example: "5012345678" },
];

/** Free entry: the visitor types the full number with its country code. */
export const OTHER = "XX";
const ALIASES: Record<string, string> = { US: "CA" };

export const findCountry = (code?: string | null) =>
  PHONE_COUNTRIES.find((c) => c.code === (code && (ALIASES[code] ?? code)));

/** Longest calling code that starts the digits (+1 vs +12…, +212 vs +21…). */
function byDial(digits: string) {
  return [...PHONE_COUNTRIES].sort((a, b) => b.dial.length - a.dial.length).find((c) => digits.startsWith(c.dial));
}

/**
 * What the visitor typed or pasted, in any of the shapes the CRM used to receive
 * ("06 91…", "2126…", "+212 6…", "00212…", "212 0691…"), turned into E.164.
 * A pasted number with its own country code switches the country (returned as `country`).
 */
export function normalizePhone(raw: string, countryCode: string): { e164: string; national: string; country: string } {
  const intl = /^\s*(\+|00)/.test(raw);
  let digits = raw.replace(/\D/g, "");
  if (raw.trim().startsWith("00")) digits = digits.slice(2);

  let c = findCountry(countryCode);
  // "+33 6…" pasted while Maroc is selected: trust the number's own country code.
  if (intl || !c) {
    const own = byDial(digits);
    if (own) {
      c = own;
      digits = digits.slice(own.dial.length);
    } else if (!c) {
      return { e164: digits ? `+${digits}` : "", national: digits, country: OTHER };
    }
  } else if (digits.startsWith(c.dial) && digits.length > c.max) {
    // "2126…" typed without the plus sign.
    digits = digits.slice(c.dial.length);
  }
  if (c.trunk0 && digits.startsWith("0")) digits = digits.slice(1);
  digits = digits.slice(0, c.max);
  return { e164: digits ? `+${c.dial}${digits}` : "", national: digits, country: c.code };
}

/** Final check, also run by the server: "+", a known country code and the right number of digits. */
export function isValidPhone(e164: string): boolean {
  const m = /^\+([1-9]\d{6,14})$/.exec(e164);
  if (!m) return false;
  const c = byDial(m[1]);
  if (!c) return m[1].length >= 8; // country not in the list: any plausible international number
  const national = m[1].slice(c.dial.length);
  if (national.length < c.min || national.length > c.max) return false;
  return !c.starts || c.starts.includes(national[0]);
}

/** Help text under the field, e.g. "9 chiffres après +212". */
export function phoneHint(code: string) {
  const c = findCountry(code);
  if (!c) return "Numéro complet avec l'indicatif du pays";
  const n = c.min === c.max ? `${c.min}` : `${c.min} à ${c.max}`;
  return `${n} chiffres après +${c.dial}`;
}
