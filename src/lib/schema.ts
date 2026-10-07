import { z } from "zod";

export const SECTORS = [
  "Assurance & Banque",
  "Automobile",
  "Écoles & Formation",
  "E-commerce",
  "Énergies renouvelables & Traitement de l'eau",
  "Immobilier",
  "Restauration",
  "Fitness, Beauté & Bien-être",
  "Autre",
] as const;

export const TEAM_SIZES = ["1–5", "6–20", "21–50", "51–200", "200+"] as const;

export const stepOneSchema = z.object({
  firstName: z.string().trim().min(2, "Prénom requis"),
  lastName: z.string().trim().min(2, "Nom requis"),
  email: z.email("E-mail invalide"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9 ().-]{8,20}$/, "Numéro invalide"),
});

export const stepTwoSchema = z.object({
  company: z.string().trim().min(2, "Entreprise requise"),
  sector: z.enum(SECTORS, { error: "Choisissez un secteur" }),
  teamSize: z.enum(TEAM_SIZES, { error: "Choisissez une taille d'équipe" }),
});


const meta = {
  website: z.string().max(0).optional(),
  utm: z.record(z.string().max(40), z.string().max(600)).optional(),
  page: z.string().optional(),
};

/** Full lead, sent once on final submission. */
export const payloadSchema = stepOneSchema.extend(stepTwoSchema.shape).extend(meta);

export type LeadPayload = z.infer<typeof payloadSchema>;
