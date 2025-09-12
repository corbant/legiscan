import { LegiScanSdkError, LegiScanApiError } from './utils/error';
import type { Session } from './schemas/session';
import { StateId } from './schemas/constants';
import type { MasterList, MasterListRaw } from './schemas/master-list';
import type { Bill, BillText } from './schemas/bill';
import type { Amendment } from './schemas/amendment';
import type { Supplement } from './schemas/supplement';
import type { RollCall } from './schemas/roll-call';
import type { Person, SessionPeople } from './schemas/person';
import type { SearchResult, SearchResultRaw } from './schemas/search-result';
import type { MonitorList, MonitorListRaw, SetMonitorResponse } from './schemas/monitor';
import { indexedObjectToArray } from './utils';

export enum Operation {
  getSessionList = 'getSessionList',
  getMasterList = 'getMasterList',
  getMasterListRaw = 'getMasterListRaw',
  getBill = 'getBill',
  getBillText = 'getBillText',
  getAmendment = 'getAmendment',
  getSupplement = 'getSupplement',
  getRollCall = 'getRollCall',
  getPerson = 'getPerson',
  getSearch = 'getSearch',
  getSearchRaw = 'getSearchRaw',
  getDatasetList = 'getDatasetList',
  getDataset = 'getDataset',
  getDatasetRaw = 'getDatasetRaw',
  getSessionPeople = 'getSessionPeople',
  getSponsoredList = 'getSponsoredList',
  getMonitorList = 'getMonitorList',
  getMonitorListRaw = 'getMonitorListRaw',
  setMonitor = 'setMonitor',
}

export interface LegiScanClientConfig {
  apiKey?: string;
}

export interface Params {
  op: Operation;
}

export class LegiScanClient {
  private apiKey: string;
  private baseUrl: string;

  constructor({ apiKey = process.env['LEGISCAN_API_KEY'] }: LegiScanClientConfig) {
    if (!apiKey) {
      throw new LegiScanSdkError('API key is required');
    }

    this.apiKey = apiKey;
    this.baseUrl = `https://api.legiscan.com`;
  }

  async get<T>(params: Params & Record<string, unknown>): Promise<T> {
    const searchParams = new URLSearchParams({ ...params, key: this.apiKey });
    const url = new URL(this.baseUrl);
    url.search = searchParams.toString();
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.status === 'ERROR') {
      throw new LegiScanApiError(data.alert.message);
    }

    return data;
  }

  async getSessionList(state: StateId) {
    const { sessions } = await this.get<{ sessions: Session[] }>({
      op: Operation.getSessionList,
      state,
    });
    return sessions;
  }

  async getMasterList({ state, id }: { state: StateId; id: number }) {
    const {
      masterlist: { session, ...masterList },
    } = await this.get<{ masterlist: Record<string, MasterList> }>({
      op: Operation.getMasterList,
      state,
      id,
    });
    return { session, masterList: indexedObjectToArray(masterList) };
  }

  async getMasterListRaw({ state, id }: { state: StateId; id: number }) {
    const {
      masterlist: { session, ...masterList },
    } = await this.get<{ masterlist: Record<string, MasterListRaw> }>({
      op: Operation.getMasterListRaw,
      state,
      id,
    });
    return { session, masterList: indexedObjectToArray(masterList) };
  }

  async getBill(id: number) {
    const { bill } = await this.get<{ bill: Bill }>({ op: Operation.getBill, id });
    return bill;
  }

  async getBillText(id: number) {
    const { text } = await this.get<{ text: BillText }>({
      op: Operation.getBillText,
      id,
    });
    return text;
  }

  async getAmendment(id: number) {
    const { amendment } = await this.get<{ amendment: Amendment }>({
      op: Operation.getAmendment,
      id,
    });
    return amendment;
  }

  async getSupplement(id: number) {
    const { supplement } = await this.get<{ supplement: Supplement }>({
      op: Operation.getSupplement,
      id,
    });
    return supplement;
  }

  async getRollCall(id: number) {
    const { roll_call: rollCall } = await this.get<{ roll_call: RollCall }>({
      op: Operation.getRollCall,
      id,
    });
    return rollCall;
  }

  async getPerson(id: number) {
    const { person } = await this.get<{ person: Person }>({
      op: Operation.getPerson,
      id,
    });
    return person;
  }

  async getSessionPeople(id: number) {
    const { sessionpeople: sessionPeople } = await this.get<{
      sessionpeople: SessionPeople;
    }>({ op: Operation.getSessionPeople, id });
    return sessionPeople;
  }

  async getSponsoredList(id: number) {
    const {
      sponsoredbills: { sponsor, sessions, bills },
    } = await this.get<{
      sponsoredbills: { sponsor: Person; sessions: Session[]; bills: Bill[] };
    }>({ op: Operation.getSponsoredList, id });
    return { sponsor, sessions, bills };
  }

  async getSearch(query: string, params: Record<string, unknown> = {}) {
    const {
      searchresult: { summary, ...searchResult },
    } = await this.get<{ searchresult: SearchResult }>({
      op: Operation.getSearch,
      query,
      ...params,
    });
    return { summary: summary, results: indexedObjectToArray(searchResult) };
  }

  async getSearchRaw(query: string, params: Record<string, unknown> = {}) {
    const { searchresult: searchResult } = await this.get<{
      searchresult: SearchResultRaw;
    }>({ op: Operation.getSearchRaw, query, ...params });
    return {
      summary: searchResult.summary,
      results: searchResult.results,
    };
  }

  async getMonitorList() {
    const { monitorlist: monitorList } = await this.get<MonitorList>({
      op: Operation.getMonitorList,
    });
    return indexedObjectToArray(monitorList);
  }

  async getMonitorListRaw() {
    const { monitorlist: monitorList } = await this.get<MonitorListRaw>({
      op: Operation.getMonitorListRaw,
    });
    return indexedObjectToArray(monitorList);
  }

  async setMonitor({
    list,
    action,
    stance,
  }: {
    list: string | number;
    action: 'monitor' | 'remove' | 'set';
    stance: 'watch' | 'support' | 'oppose';
  }) {
    const response = await this.get<SetMonitorResponse>({
      op: Operation.setMonitor,
      list,
      action,
      stance,
    });
    return response;
  }
}
