import { z } from 'zod/v4';
import { Status } from './constants';
import camelize from 'camelize-ts';

export const MasterListSchema = z.object({
  masterlist: z.record(
    z.number(),
    z.object({
      bill_id: z.number(),
      number: z.string(),
      change_hash: z.string(),
      url: z.url(),
      status_date: z.iso.date(),
      status: z.enum(Status),
      last_action_date: z.iso.date(),
      last_action: z.string(),
      title: z.string(),
      description: z.string(),
    }),
  ),
});

export const MasterListStandardizeSchema = MasterListSchema.extend({
  status: z.preprocess((val) => val === 1, z.enum(Status)),
}).transform((data) => {
  return camelize(data);
});

export const MasterListRawSchema = z.object({
  bill_id: z.number(),
  number: z.string(),
  change_hash: z.string(),
});

export const MasterListRawStandardizeSchema = MasterListRawSchema.transform((data) => {
  return camelize(data);
});

export type MasterList = z.infer<typeof MasterListSchema>;
export type MasterListStandardize = z.infer<typeof MasterListStandardizeSchema>;
export type MasterListRaw = z.infer<typeof MasterListRawSchema>;
export type MasterListRawStandardize = z.infer<typeof MasterListRawStandardizeSchema>;
