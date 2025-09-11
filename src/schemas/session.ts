import { z } from 'zod/v4';
import { StateId, State } from './constants';
import camelize from 'camelize-ts';

export const SessionSummarySchema = z.strictObject({
  session_id: z.number(),
  state_id: z.enum(StateId),
  year_start: z.number(),
  year_end: z.number(),
  name: z.string(),
  dataset_hash: z.string().optional().nullable(),
  session_hash: z.string().optional().nullable(),
  state_abbr: z.enum(State),
  // Flag for session being in prefile (0 if false, 1 if true)
  prefile: z.number(),
  // Flag for session being adjourned sine die (0 if false, 1 if true)
  sine_die: z.number(),
  // Flag for session being archived out of production updates (0 if false, 1 if true)
  prior: z.number(),
  // Flag for being a special session (0 if false, 1 if true)
  special: z.number(),
  // Regular Session
  session_tag: z.string(),
  session_title: z.string(),
  session_name: z.string(),
});

export const SessionSummaryStandardizeSchema = SessionSummarySchema.transform((data) => {
  return camelize(data);
});

export const SessionSchema = SessionSummarySchema.extend({
  name: z.undefined(),
  state_abbr: z.undefined(),
});

export const SessionStandardizeSchema = SessionSchema.extend({
  prefile: z.preprocess((val) => val === 1, z.boolean()),
  sine_die: z.preprocess((val) => val === 1, z.boolean()),
  prior: z.preprocess((val) => val === 1, z.boolean()),
  special: z.preprocess((val) => val === 1, z.boolean()),
}).transform((data) => {
  return camelize(data);
});

export type SessionSummary = z.infer<typeof SessionSummarySchema>;
export type SessionSummaryStandardize = z.infer<typeof SessionSummaryStandardizeSchema>;
export type Session = z.infer<typeof SessionSchema>;
export type SessionStandardize = z.infer<typeof SessionStandardizeSchema>;
