import { sleep, group, check, fail } from "k6";
import http from "k6/http";

import jsonpath from "https://jslib.k6.io/jsonpath/1.0.2/index.js";

export function navigateToCheckout() {
  let response;

  group("Navigate to Checkout", function () {
    response = http.get("http://ecommerce.test.k6.io/checkout/", {
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

    // dynamic value: update_order_review_nonce
    vars["securityToken"] = response
      .body
      .find('update_order_review_nonce":"', '"');

    // dynamic value: woocommerce-process-checkout-nonce
    vars["checkoutToken"] = response
      .body
      .find('woocommerce-process-checkout-nonce" value="', '"');

    if (isDebug) {
      console.log("Security token: " + vars["securityToken"]);
      console.log("Checkout token: " + vars["checkoutToken"]);
    }
  });
}