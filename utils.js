import { check, fail } from "k6";

export function checkStatus({ response, expectedStatus, failOnError, printOnError, dynamicIds }) {
  let url = response.url;

  if (dynamicIds) {
    dynamicIds.forEach((dynamicId) => {
      if (response.url.includes(dynamicId)) {
        url = url.replace(dynamicId, '[id]');
      }
    });
  }

  const obj = {};
  obj[`${response.request.method} ${url} status ${expectedStatus}`] = (r) => r.status === expectedStatus;

  const checkResult = check(response, obj);

  if (!checkResult) {
    if (printOnError && response.body) {
      console.log("Unexpected response: " + response.body);
    }
    if (failOnError) {
      fail(`Received unexpected status code ${response.status} for URL: ${url}, expected ${expectedStatus}`)
    }
  }
}