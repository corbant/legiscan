import { z } from 'zod/v4';
import camelize from 'camelize-ts';

export const SearchSummarySchema = z.object({
  page: z.string(),
  range: z.string(),
  relevancy: z.string(),
  count: z.number(),
  page_current: z.number(),
  page_total: z.number(),
  query: z.string(),
});

export const SearchResultItemSchema = z.object({
  relevance: z.number(),
  state: z.string(),
  bill_number: z.string(),
  bill_id: z.number(),
  change_hash: z.string(),
  url: z.url(),
  text_url: z.url(),
  research_url: z.url(),
  last_action_date: z.iso.date(),
  last_action: z.string(),
  title: z.string(),
});

export const SearchResultSchema = z.object({
  summary: SearchSummarySchema,
});

export const SearchResultItemRawSchema = z.object({
  relevance: z.number(),
  bill_id: z.number(),
  change_hash: z.string(),
});

export const SearchResultRawSchema = z.object({
  summary: SearchSummarySchema,
  results: z.array(SearchResultItemRawSchema),
});

export const SearchResultStandardizeSchema = SearchResultSchema.extend({
  results: z.array(SearchResultItemSchema),
}).transform((data) => {
  return camelize(data);
});

export const SearchResultRawStandardizeSchema = SearchResultRawSchema.transform(
  (data) => {
    return camelize(data);
  },
);

export type SearchSummary = z.infer<typeof SearchSummarySchema>;
export type SearchResultItem = z.infer<typeof SearchResultItemSchema>;
export type SearchResult = z.infer<typeof SearchResultSchema>;
export type SearchResultItemRaw = z.infer<typeof SearchResultItemRawSchema>;
export type SearchResultRaw = z.infer<typeof SearchResultRawSchema>;
export type SearchResultStandardize = z.infer<typeof SearchResultStandardizeSchema>;
export type SearchResultRawStandardize = z.infer<typeof SearchResultRawStandardizeSchema>;
