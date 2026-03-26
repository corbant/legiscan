import { z } from 'zod/v4';
import { SupplementType } from './constants';
import camelize from 'camelize-ts';

export const SupplementSchema = z.object({
  supplement_id: z.number(),
  bill_id: z.number(),
  date: z.string(),
  type_id: z.enum(SupplementType),
  type: z.string(),
  title: z.string(),
  description: z.string(),
  mime: z.string(),
  mime_id: z.number(),
  url: z.url(),
  state_link: z.url(),
  supplement_size: z.number(),
  supplement_hash: z.string(),
  doc: z.string(),
  alt_supplement: z.number(),
  alt_mime: z.string(),
  alt_mime_id: z.number(),
  alt_state_link: z.string(),
  alt_supplement_size: z.number(),
  alt_supplement_hash: z.string(),
  alt_doc: z.string(),
});

export const SupplementStandardizeSchema = SupplementSchema.transform((data) => {
  return camelize(data);
});

export type Supplement = z.infer<typeof SupplementSchema>;
export type SupplementStandardize = z.infer<typeof SupplementStandardizeSchema>;
