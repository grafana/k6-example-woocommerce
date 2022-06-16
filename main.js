export { browse } from './scenarios/browse.js';
export { checkout } from './scenarios/checkout.js';

const configFile = __ENV.CONFIG_FILE || './config/test.json';
const testConfig = JSON.parse(open(configFile));

export const options = Object.assign({}, testConfig);

// used to store global variables
const VARS = [];

// global min/max sleep durations (in seconds):
const PAUSE_MIN = 5;
const PAUSE_MAX = 15;

export default function() {
  console.log("No scenarios found in config/test.json. Executing default function...");
}