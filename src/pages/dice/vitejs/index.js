import provider from 'WSprovider';
import { client } from '@vite/vitejs';
import Ledger from './ledger';

const goViteServer = {
  production: "wss://production.ws.url/ws",
  test: "wss://test.ws.url/test/ws",
  dev: "wss://dev.ws.url/test/ws"
};

let WS_RPC = new provider(goViteServer.production);
let _client = new client(WS_RPC);

let ledger = new Ledger(_client);

export { ledger };