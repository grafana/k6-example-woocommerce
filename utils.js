import { check, fail } from "k6";

export function checkStatus({ response, expectedStatus, failOnError, printOnError }) {
  const obj = {};
  obj[`${response.url} status ${expectedStatus}`] = (r) => r.status === expectedStatus;

  const checkResult = check(response, obj);

  if (!checkResult) {
    if (printOnError && response.body) {
      console.log("Response: " + response.body);
    }
    if (failOnError) {
      fail(`Received unexpected status code ${response.status} for URL: ${response.url}, expected ${expectedStatus}`)
    }
  }
}