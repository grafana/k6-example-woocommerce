import { sleep, group, check, fail } from "k6";
import http from "k6/http";
import { checkStatus } from "./utils.js";
import { randomIntBetween, findBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";

import jsonpath from "https://jslib.k6.io/jsonpath/1.0.2/index.js";

export function submitCheckout() {
  let response;

  group("Submit Checkout", function () {
    response = http.post(
      "http://ecommerce.test.k6.io/?wc-ajax=checkout",
      {
        billing_first_name: "k6",
        billing_last_name: "Test",
        billing_company: "",
        billing_country: "US",
        billing_address_1: "Street Address 1",
        billing_address_2: "",
        billing_city: "Frisco",
        billing_state: "CO",
        billing_postcode: "80443",
        billing_phone: "7201234567",
        billing_email: "anon@k6.io",
        order_comments: "",
        payment_method: "cod",
        "woocommerce-process-checkout-nonce": globalThis.vars["checkoutToken"],
        _wp_http_referer: "/?wc-ajax=update_order_review",
      },
      {
        headers: {
          accept: "application/json, text/javascript, */*; q=0.01",
          "accept-encoding": "gzip, deflate",
          "accept-language": "en-US,en;q=0.9",
          connection: "keep-alive",
          "content-type":
            "application/x-www-form-urlencoded;type=content-type;mimeType=application/x-www-form-urlencoded",
          host: "ecommerce.test.k6.io",
          origin: "http://ecommerce.test.k6.io",
          "x-requested-with": "XMLHttpRequest",
        },
      }
    );

    checkStatus({
      response: response,
      expectedStatus: 200,
      failOnError: true,
      printOnError: true
    });

    let result;

    try {
      result = jsonpath.query(
        response.json(),
        "$['result']"
      )[0];
    } catch (err) {
      // not JSON most likely, so print the response (if there was a response.body):
      if (response.body) {
        console.log(response.body);
      }
      fail(err); // ends the iteration
    }

    // another check to ensure the checkout response contained 'success' in the 'result' property
    check(result, {
      'checkout completed successfully': (r) => r === 'success'
    });

    globalThis.vars["redirectUrl"] = jsonpath.query(
      response.json(),
      "$['redirect']"
    )[0];

    if (!globalThis.vars["redirectUrl"]) {
      fail(`Checkout failed: no redirect URL in response:\n${response.body}`);
    }

    console.debug("Checkout redirect URL: " + globalThis.vars["redirectUrl"]);

    // the order ID is in the redirectUrl
    globalThis.vars["orderId"] = findBetween(globalThis.vars["redirectUrl"], 'order-received/', '/');
    globalThis.vars["key"] = globalThis.vars["redirectUrl"].substring(globalThis.vars["redirectUrl"].indexOf('key=') + 4);

    console.debug("orderId: " + globalThis.vars["orderId"]);
    console.debug("key: " + globalThis.vars["key"]);

    if (globalThis.vars["orderId"].length > 0) {
      console.log("Successfully placed order! ID: " + globalThis.vars["orderId"]);
    } else {
      if (response.body) {
        fail("Failed to place order: " + response.body);
      } else {
        fail("Failed to place order (no response.body).");
      }
    }

    response = http.get(
      globalThis.vars["redirectUrl"],
      {
        tags: {
          name: "http://ecommerce.test.k6.io/checkout/order-received/"
        },
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-encoding": "gzip, deflate",
          "accept-language": "en-US,en;q=0.9",
          connection: "keep-alive",
          host: "ecommerce.test.k6.io",
          "upgrade-insecure-requests": "1",
        },
      }
    );

    checkStatus({
      response: response,
      expectedStatus: 200,
      failOnError: true,
      printOnError: true,
      dynamicIds: [
        globalThis.vars["orderId"],
        globalThis.vars["key"]
      ]
    });

    response = http.post(
      "http://ecommerce.test.k6.io/?wc-ajax=get_refreshed_fragments",
      {
        time: "1613672584353",
      },
      {
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate",
          "accept-language": "en-US,en;q=0.9",
          connection: "keep-alive",
          "content-type":
            "application/x-www-form-urlencoded;type=content-type;mimeType=application/x-www-form-urlencoded",
          host: "ecommerce.test.k6.io",
          origin: "http://ecommerce.test.k6.io",
          "x-requested-with": "XMLHttpRequest",
        },
      }
    );

    checkStatus({
      response: response,
      expectedStatus: 200,
      failOnError: true,
      printOnError: true
    });
  });

  sleep(randomIntBetween(pauseMin, pauseMax));
}