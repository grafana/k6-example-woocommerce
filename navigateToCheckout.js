import { group } from "k6";
import http from "k6/http";

import { checkStatus } from "./utils.js";

import { findBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";

export function navigateToCheckout() {
  group("Navigate to Checkout", function () {
    let response = http.get("http://ecommerce.test.k6.io/checkout/", {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-encoding": "gzip, deflate",
        "accept-language": "en-US,en;q=0.9",
        connection: "keep-alive",
        host: "ecommerce.test.k6.io",
        "upgrade-insecure-requests": "1",
      },
    });

    checkStatus({
      response: response,
      expectedStatus: 200,
      printOnError: true,
      failOnError: true
    });

    // dynamic value: update_order_review_nonce
    vars["securityToken"] = findBetween(response.body, 'update_order_review_nonce":"', '"');

    // dynamic value: woocommerce-process-checkout-nonce
    vars["checkoutToken"] = response
      .html("#woocommerce-process-checkout-nonce")
      .val();

    if (isDebug) {
      console.log("Security token: " + vars["securityToken"]);
      console.log("Checkout token: " + vars["checkoutToken"]);
    }
  });
}