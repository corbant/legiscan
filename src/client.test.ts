import { LegiScanClient } from './client';
import {
  BillStandardizeSchema,
  BillTextStandardizeSchema,
  BillListStandardizeSchema,
} from './schemas/bill';
import { AmendmentStandardizeSchema } from './schemas/amendment';
import { SupplementStandardizeSchema } from './schemas/supplement';
import { RollCallStandardizeSchema } from './schemas/roll-call';
import {
  PersonStandardizeSchema,
  SessionPeopleStandardizeSchema,
} from './schemas/person';
import {
  SearchResultStandardizeSchema,
  SearchResultRawStandardizeSchema,
} from './schemas/search-result';
import {
  MonitorListStandardizeSchema,
  MonitorListRawStandardizeSchema,
} from './schemas/monitor';
import {
  SessionStandardizeSchema,
  SessionSummaryStandardizeSchema,
} from './schemas/session';
import { MasterListRawStandardizeSchema } from './schemas/master-list';
import { StateId } from './schemas/constants';
import { z } from 'zod/v4';

const API_KEY = process.env['LEGISCAN_API_KEY'] || 'TEST_KEY';

describe('LegiScanClient Tests', () => {
  let client: LegiScanClient;

  beforeAll(() => {
    client = new LegiScanClient({ apiKey: API_KEY });
  });

  describe('getSessionList', () => {
    it('should return sessions for a state', async () => {
      const sessions = await client.getSessionList(StateId.CA);
      expect(z.array(SessionSummaryStandardizeSchema).parse(sessions));
    });
  });

  describe('getMasterList', () => {
    it('should return master list of bills', async () => {
      const { session, masterList } = await client.getMasterList({
        state: StateId.CA,
        id: 1624,
      });
      expect(SessionStandardizeSchema.parse(session));
      expect(z.array(MasterListRawStandardizeSchema).parse(masterList));
    });
  });

  describe('getMasterListRaw', () => {
    it('should return raw master list', async () => {
      const { session, masterList } = await client.getMasterListRaw({
        state: StateId.CA,
        id: 1624,
      });
      expect(SessionStandardizeSchema.parse(session));
      expect(z.array(MasterListRawStandardizeSchema).parse(masterList));
    });
  });

  describe('getBill', () => {
    it('should return detailed bill information', async () => {
      const bill = await client.getBill(1132030);
      expect(BillStandardizeSchema.parse(bill));
    });
  });

  describe('getBillText', () => {
    it('should return bill text', async () => {
      const billText = await client.getBillText(647508);

      expect(BillTextStandardizeSchema.parse(billText));
    });
  });

  describe('getAmendment', () => {
    it('should return amendment details', async () => {
      const amendment = await client.getAmendment(37508);

      expect(AmendmentStandardizeSchema.parse(amendment));
    });
  });

  describe('getSupplement', () => {
    it('should return supplement details', async () => {
      const supplement = await client.getSupplement(47508);
      expect(SupplementStandardizeSchema.parse(supplement));
    });
  });

  describe('getRollCall', () => {
    it('should return roll call vote details', async () => {
      const rollCall = await client.getRollCall(234223);

      expect(RollCallStandardizeSchema.parse(rollCall));
    });
  });

  describe('getPerson', () => {
    it('should return person details', async () => {
      const person = await client.getPerson(16788);

      expect(PersonStandardizeSchema.parse(person));
    });
  });

  describe('getSessionPeople', () => {
    it('should return all people in a session', async () => {
      const sessionPeople = await client.getSessionPeople(1624);

      expect(SessionPeopleStandardizeSchema.parse(sessionPeople));
    });
  });

  describe('getSponsoredList', () => {
    it('should return bills sponsored by a person', async () => {
      const { sessions, bills, sponsor } = await client.getSponsoredList(1498);

      expect(PersonStandardizeSchema.parse(sponsor));
      expect(z.array(SessionStandardizeSchema).parse(sessions));
      expect(z.array(BillListStandardizeSchema).parse(bills));
    });
  });

  describe('getSearch', () => {
    it('should return search results', async () => {
      const searchResult = await client.getSearch('budget', { state: 'CA' });

      expect(SearchResultStandardizeSchema.parse(searchResult));
    });
  });

  describe('getSearchRaw', () => {
    it('should return raw search results', async () => {
      const searchResultRaw = await client.getSearchRaw('budget', { state: 'CA' });

      expect(SearchResultRawStandardizeSchema.parse(searchResultRaw));
    });
  });

  describe('getMonitorList', () => {
    it('should return monitor list', async () => {
      const monitorList = await client.getMonitorList();
      expect(z.array(MonitorListStandardizeSchema).parse(monitorList));
    });
  });

  describe('getMonitorListRaw', () => {
    it('should return raw monitor list', async () => {
      const monitorListRaw = await client.getMonitorListRaw();
      expect(z.array(MonitorListRawStandardizeSchema).parse(monitorListRaw));
    });
  });

  describe('setMonitor', () => {
    it('should set monitor for bills', async () => {
      const response = await client.setMonitor({
        list: 1132030,
        action: 'monitor' as const,
        stance: 'watch' as const,
      });

      expect(response).toBeDefined();
    });
  });
});
