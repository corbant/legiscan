import { z } from 'zod/v4';
import { Vote } from './constants';
import camelize from 'camelize-ts';

export const VoteItemSchema = z.object({
  people_id: z.number(),
  vote_id: z.enum(Vote),
  vote_text: z.string(),
});

export const RollCallSchema = z.object({
  roll_call_id: z.number(),
  bill_id: z.number(),
  date: z.iso.date(),
  desc: z.string(),
  yea: z.number(),
  nay: z.number(),
  nv: z.number(),
  absent: z.number(),
  total: z.number(),
  passed: z.number(),
  chamber: z.string(),
  chamber_id: z.number(),
  votes: z.array(VoteItemSchema),
});

export const RollCallStandardizeSchema = RollCallSchema.extend({
  passed: z.preprocess((val) => val === 1, z.boolean()),
}).transform((data) => {
  return camelize(data);
});

export type VoteItem = z.infer<typeof VoteItemSchema>;
export type RollCall = z.infer<typeof RollCallSchema>;
export type RollCallStandardize = z.infer<typeof RollCallStandardizeSchema>;
