import { check, fail } from "k6";

export function checkStatus({ response, expectedStatus, expectedContent, failOnError, printOnError, dynamicIds }) {
  if (isEmpty(expectedStatus) && isEmpty(expectedContent)) {
    console.warn('No expected status or content specified in call to checkStatus for URL ' + response.url);
    return;
  }

  let contentCheckResult;
  let statusCheckResult;

  let url = response.url;

  if (dynamicIds) {
    dynamicIds.forEach((dynamicId) => {
      if (response.url.includes(dynamicId)) {
        url = url.replace(dynamicId, '[id]');
      }
    });
  }

  if (expectedContent) {
    contentCheckResult = check(response, {
      [`"${expectedContent}" in ${url} response`]: (r) => r.body.includes(expectedContent),
    });
  }

  if (expectedStatus) {
    const obj = {};
    obj[`${response.request.method} ${url} status ${expectedStatus}`] = (r) => r.status === expectedStatus;

    statusCheckResult = check(response, obj);
  }
  
  if (!statusCheckResult || !contentCheckResult && expectedContent) {
    if (printOnError && response.body) {
      console.log("Unexpected response: " + response.body);
    }
    if (failOnError) {
      if (!statusCheckResult && (!contentCheckResult && expectedContent)) {
        fail(`${response.request.method} ${url} status ${expectedStatus} and "${expectedContent}" not found in response`);
      } else {
        if (!statusCheckResult) {
          fail(`Received unexpected status code ${response.status} for URL: ${url}, expected ${expectedStatus}`);
        } else if (!contentCheckResult) {
          fail(`"${expectedContent}" not found in response for URL: ${url}`);
        }
      }
    }
  }
}

function isEmpty(str) {
  return (!str || str.length === 0);
}
