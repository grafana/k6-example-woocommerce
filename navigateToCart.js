import { group } from "k6";
import http from "k6/http";

import { checkStatus } from "./utils.js";

export function navigateToCart() {
  group("Navigate to Cart", function () {
    let response = http.get("http://ecommerce.test.k6.io/cart/", {
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
  });
}