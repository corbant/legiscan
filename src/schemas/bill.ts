import { z } from 'zod/v4';
import camelize from 'camelize-ts';
import {
  BillType,
  State,
  StateId,
  Status,
  SponsorType,
  Party,
  Role,
  TextType,
} from './constants';

export const BillSchema = z.strictObject({
  bill_id: z.number(),
  change_hash: z.string(),
  session_id: z.number(),
  session: z.object({
    session_id: z.number(),
    state_id: z.enum(StateId),
    year_start: z.number(),
    year_end: z.number(),
    prefile: z.number(),
    sine_die: z.number(),
    prior: z.number(),
    special: z.number(),
    session_tag: z.string(),
    session_title: z.string(),
    session_name: z.string(),
  }),
  url: z.url(),
  state_link: z.url(),
  completed: z.number(),
  status: z.enum(Status),
  status_date: z.iso.date(),
  progress: z.array(
    z.object({
      date: z.iso.date(),
      event: z.number(),
    }),
  ),
  state: z.enum(State),
  state_id: z.enum(StateId),
  bill_number: z.string(),
  bill_type: z.string(),
  bill_type_id: z.preprocess((val: string) => +val, z.enum(BillType)),
  body: z.string(),
  body_id: z.number(),
  current_body: z.string(),
  current_body_id: z.number(),
  title: z.string(),
  description: z.string(),
  pending_committee_id: z.number(),
  committee: z.array(
    z.object({
      committeeId: z.number(),
      chamber: z.string(),
      chamber_id: z.number(),
      name: z.string(),
    }),
  ),
  referrals: z.array(
    z.object({
      date: z.iso.date(),
      committee_id: z.number(),
      chamber: z.string(),
      chamber_id: z.number(),
      name: z.string(),
    }),
  ),
  history: z.array(
    z.object({
      date: z.iso.date(),
      action: z.string(),
      chamber: z.string(),
      chamber_id: z.number(),
      importance: z.number(),
    }),
  ),
  sponsors: z.array(
    z.object({
      people_id: z.number(),
      person_hash: z.string(),
      party_id: z.preprocess((val: string) => +val, z.enum(Party)),
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
      ftm_eid: z.number(),
      votesmart_id: z.number(),
      opensecrets_id: z.string(),
      knowwho_pid: z.number(),
      ballotpedia: z.string(),
      sponsor_type_id: z.enum(SponsorType),
      sponsor_order: z.number(),
      committee_sponsor: z.number(),
      committee_id: z.union([z.string(), z.number()]),
    }),
  ),
  sasts: z.array(
    z.object({
      type_id: z.number(),
      type: z.string(),
      sast_bill_number: z.string(),
      sast_bill_id: z.number(),
    }),
  ),
  subjects: z.array(
    z.object({
      subject_id: z.number(),
      subject_name: z.string(),
    }),
  ),
  texts: z.array(
    z.object({
      doc_id: z.number(),
      date: z.iso.date(),
      type: z.string(),
      type_id: z.enum(TextType),
      mime: z.string(),
      mime_id: z.number(),
      url: z.url(),
      state_link: z.url(),
      text_size: z.number(),
      text_hash: z.string(),
    }),
  ),
  votes: z.array(
    z.object({
      roll_call_id: z.number(),
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
      url: z.url(),
      state_link: z.url(),
    }),
  ),
  amendments: z.array(
    z.object({
      amendment_id: z.number(),
      adopted: z.number(),
      chamber: z.string(),
      chamber_id: z.number(),
      date: z.iso.date(),
      title: z.string(),
      description: z.string(),
      mime: z.string(),
      mime_id: z.number(),
      url: z.url(),
      state_link: z.url(),
      amendment_size: z.number(),
      amendment_hash: z.string(),
    }),
  ),
  supplements: z.array(
    z.object({
      supplement_id: z.number(),
      date: z.iso.date(),
      type: z.string(),
      type_id: z.number(),
      title: z.string(),
      description: z.string(),
      mime: z.string(),
      mime_id: z.number(),
      url: z.url(),
      stateLink: z.url(),
      supplement_size: z.number(),
      supplement_hash: z.string(),
    }),
  ),
  calendar: z.array(
    z.object({
      type_id: z.number(),
      type: z.string(),
      date: z.iso.date(),
      time: z.string(),
      location: z.string(),
      description: z.string(),
    }),
  ),
});

export const BillTextSchema = z.object({
  doc_id: z.number(),
  bill_id: z.number(),
  date: z.iso.date(),
  type: z.string(),
  type_id: z.enum(TextType),
  mime: z.string(),
  mime_id: z.number(),
  text_size: z.number(),
  text_hash: z.string(),
  doc: z.string(),
});

export const SponsoredBillsSchema = z.object({
  sponsoredbills: z.object({
    sponsor: z.object({
      people_id: z.number(),
      person_hash: z.string(),
      state_id: z.enum(StateId),
      party_id: z.preprocess((val: string) => +val, z.enum(Party)),
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
      ftm_eid: z.union([z.string(), z.number()]),
      votesmart_id: z.number(),
      opensecrets_id: z.string(),
      knowwho_pid: z.number(),
      ballotpedia: z.string(),
      committee_sponsor: z.number(),
      committee_id: z.number(),
    }),
    sessions: z.array(
      z.object({
        session_id: z.number(),
        session_name: z.string(),
      }),
    ),
    bills: z.array(
      z.object({
        session_id: z.number(),
        bill_id: z.number(),
        number: z.string(),
      }),
    ),
  }),
});

export const BillStandardizeSchema = BillSchema.extend({
  completed: z.preprocess((val) => val === 1, z.boolean()),
}).transform((data) => {
  return camelize(data);
});

export const BillTextStandardizeSchema = BillTextSchema.transform((data) => {
  return camelize(data);
});

export const SponsoredBillsStandardizeSchema = SponsoredBillsSchema.transform((data) => {
  return camelize(data);
});

export const BillListSchema = z.object({
  bill_id: z.number(),
  session_id: z.number(),
  number: z.string(),
});

export const BillListStandardizeSchema = BillListSchema.transform((data) => {
  return camelize(data);
});

export type Bill = z.infer<typeof BillSchema>;
export type BillText = z.infer<typeof BillTextSchema>;
export type SponsoredBills = z.infer<typeof SponsoredBillsSchema>;
export type BillStandardize = z.infer<typeof BillStandardizeSchema>;
export type BillTextStandardize = z.infer<typeof BillTextStandardizeSchema>;
export type SponsoredBillsStandardize = z.infer<typeof SponsoredBillsStandardizeSchema>;
export type BillList = z.infer<typeof BillListSchema>;
export type BillListStandardize = z.infer<typeof BillListStandardizeSchema>;
