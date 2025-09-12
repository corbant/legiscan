import nock from 'nock';
import fs from 'fs';
import path from 'path';
import { LegiScanClient } from '../src/client';
import { StateId } from '../src/schemas/constants';

const fixturesDir = path.join(__dirname, '..', 'fixtures');
const fixturePath = path.join(fixturesDir, 'nock.json');

const API_KEY = process.env['LEGISCAN_API_KEY'];

const main = async () => {
  if (!API_KEY) {
    console.error('LEGISCAN_API_KEY environment variable is required');
    process.exit(1);
  }

  // Ensure fixtures directory exists
  if (!fs.existsSync(fixturesDir)) {
    fs.mkdirSync(fixturesDir, { recursive: true });
  }

  nock.recorder.rec({
    output_objects: true,
    dont_print: true,
  });

  const client = new LegiScanClient({ apiKey: API_KEY });

  try {
    await Promise.allSettled([
      client.getSessionList(StateId.CA),

      client.getMasterList({ state: StateId.CA, id: 1624 }),
      client.getMasterListRaw({ state: StateId.CA, id: 1624 }),

      client.getBill(1132030),
      client.getBillText(647508),

      client.getAmendment(37508),

      client.getSupplement(47508),

      client.getRollCall(234223),

      client.getPerson(16788),
      client.getSessionPeople(1624),
      client.getSponsoredList(1498),

      client.getSearch('budget', { state: 'CA' }),
      client.getSearchRaw('budget', { state: 'CA' }),

      client.getMonitorList(),
      client.getMonitorListRaw(),
      client.setMonitor({ list: 1132030, action: 'monitor', stance: 'watch' }),
    ]);
  } catch (error) {
    console.error('Error during API calls:', error);
  }

  const nockCallObjects = nock.recorder.play();
  fs.writeFileSync(fixturePath, JSON.stringify(nockCallObjects, null, 2));
  console.log(`Nocks updated: ${nockCallObjects.length} HTTP calls recorded`);
  console.log(`Fixtures saved to: ${fixturePath}`);
};

void main().catch(console.error);
