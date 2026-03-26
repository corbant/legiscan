import { z } from 'zod/v4';
import { StateId, Party, Role } from './constants';
import camelize from 'camelize-ts';
import { SessionSchema } from './session';

const LinksSchema = z.object({
  bluesky: z.string(),
  facebook: z.string(),
  instagram: z.string(),
  linkedin: z.string(),
  tiktok: z.string(),
  twitter: z.string(),
  website: z.string(),
  youtube: z.string(),
});

export const PersonSchema = z.object({
  people_id: z.number(),
  person_hash: z.string(),
  state_id: z.enum(StateId),
  party_id: z.union([z.string(), z.enum(Party)]),
  party: z.string(),
  role_id: z.enum(Role),
  role: z.string(),
  name: z.string(),
  first_name: z.string(),
  middle_name: z.string(),
  last_name: z.string(),
  suffix: z.string(),
  nickname: z.string(),
  district: z.string(),
  ftm_eid: z.union([z.number(), z.string()]),
  votesmart_id: z.number(),
  opensecrets_id: z.string(),
  knowwho_pid: z.number(),
  ballotpedia: z.string(),
  bioguide_id: z.string(),
  committee_sponsor: z.number(),
  committee_id: z.number(),
  state_federal: z.number(),
  bio: z.preprocess(
    (val) => (Array.isArray(val) && val.length === 0 ? undefined : val), // When there is no bio, API returns an empty array
    z
      .object({
        social: z.object({
          capitol_phone: z.string(),
          district_phone: z.string(),
          email: z.string(),
          webmail: z.string(),
          biography: z.string(),
          image: z.string(),
          ballotpedia: z.string(),
          votesmart: z.string(),
        }),
        capitol_address: z.object({
          address1: z.string(),
          address2: z.string(),
          city: z.string(),
          state: z.string(),
          zip: z.string(),
        }),
        links: z.object({
          official: LinksSchema,
          personal: LinksSchema,
        }),
      })
      .optional(),
  ),
});

export const SessionPeopleSchema = z.object({
  session: SessionSchema,
  people: z.array(PersonSchema),
});

export const PersonStandardizeSchema = PersonSchema.extend({
  committee_sponsor: z.preprocess((val) => val === 1, z.boolean()),
}).transform((data) => {
  return camelize(data);
});

export const SessionPeopleStandardizeSchema = SessionPeopleSchema.transform((data) => {
  return camelize(data);
});

export type Person = z.infer<typeof PersonSchema>;
export type SessionPeople = z.infer<typeof SessionPeopleSchema>;
export type PersonStandardize = z.infer<typeof PersonStandardizeSchema>;
export type SessionPeopleStandardize = z.infer<typeof SessionPeopleStandardizeSchema>;
