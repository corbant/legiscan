import { z } from 'zod/v4';
import camelize from 'camelize-ts';
import { Chamber } from './constants';

export const AmendmentSchema = z.object({
  amendment_id: z.number(),
  chamber: z.enum(Chamber),
  chamber_id: z.number(),
  bill_id: z.number(),
  adopted: z.number(),
  date: z.iso.date(),
  title: z.string(),
  description: z.string(),
  mime: z.string(),
  mime_id: z.number(),
  amendment_size: z.number(),
  amendment_hash: z.string(),
  doc: z.string(),
});

export const AmendmentStandardizeSchema = AmendmentSchema.extend({
  adopted: z.preprocess((val) => val === 1, z.boolean()),
}).transform((data) => {
  return camelize(data);
});

export type Amendment = z.infer<typeof AmendmentSchema>;
export type AmendmentStandardize = z.infer<typeof AmendmentStandardizeSchema>;
