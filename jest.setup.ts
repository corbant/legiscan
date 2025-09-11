import nock from 'nock';
import path from 'path';

const fixturesDir = path.join(__dirname, 'fixtures');
const fixturePath = path.join(fixturesDir, 'nock.json');

beforeAll(() => {
  const nockDefs = nock.loadDefs(fixturePath);
  nock.define(nockDefs);
  nock.disableNetConnect();
});
