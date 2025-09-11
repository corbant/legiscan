import { z } from 'zod/v4';
import { Status, Stance } from './constants';
import camelize from 'camelize-ts';

export const MonitorItemSchema = z.object({
  bill_id: z.number(),
  state: z.string(),
  number: z.string(),
  stance: z.enum(Stance),
  change_hash: z.string(),
  url: z.url(),
  status_date: z.iso.date(),
  status: z.enum(Status),
  last_action_date: z.iso.date(),
  last_action: z.string(),
  title: z.string(),
  description: z.string(),
});

export const MonitorListSchema = z.object({
  monitorlist: z.record(z.string(), MonitorItemSchema),
});

export const MonitorItemRawSchema = z.object({
  bill_id: z.number(),
  state: z.string(),
  number: z.string(),
  stance: z.enum(Stance),
  change_hash: z.string(),
  status: z.enum(Status),
});

export const MonitorListRawSchema = z.object({
  monitorlist: z.record(z.string(), MonitorItemRawSchema),
});

export const SetMonitorResponseSchema = z.object({
  return: z.record(z.string(), z.string()),
});

export const MonitorListStandardizeSchema = MonitorListSchema.transform((data) => {
  return camelize(data);
});

export const MonitorListRawStandardizeSchema = MonitorListRawSchema.transform((data) => {
  return camelize(data);
});

export const SetMonitorResponseStandardizeSchema = SetMonitorResponseSchema.transform(
  (data) => {
    return camelize(data);
  },
);

export type MonitorItem = z.infer<typeof MonitorItemSchema>;
export type MonitorList = z.infer<typeof MonitorListSchema>;
export type MonitorItemRaw = z.infer<typeof MonitorItemRawSchema>;
export type MonitorListRaw = z.infer<typeof MonitorListRawSchema>;
export type SetMonitorResponse = z.infer<typeof SetMonitorResponseSchema>;
export type MonitorListStandardize = z.infer<typeof MonitorListStandardizeSchema>;
export type MonitorListRawStandardize = z.infer<typeof MonitorListRawStandardizeSchema>;
export type SetMonitorResponseStandardize = z.infer<
  typeof SetMonitorResponseStandardizeSchema
>;
